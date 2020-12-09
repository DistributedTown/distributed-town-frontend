import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useMagic } from '../../../components/Store';
import ProjectCard from '../../../components/project/ProjectCard';
import SkillsDisplay from '../../../components/SkillsDisplay';

import Layout from '../../../components/Layout';
import { getProjects } from '../../../api';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';

function Projects() {
  const { data: userInfo } = useGetUserInfo();
  const [projects, setProjects] = useState();
  const magic = useMagic();

  useEffect(() => {
    (async () => {
      const didToken = await magic.user.getIdToken();
      const projectsResponse = await getProjects(didToken);
      setProjects(projectsResponse);
    })();
  }, []);

  // TODO: Loading
  if (!userInfo) return null;

  return (
    <Layout>
      <div className="flex">
        <div className="m-20">
          <h1 className="underline text-black text-4xl">Open Projects</h1>
          <div className="mt-5 grid grid-cols-3 gap-12 items-baseline mb-40">
            {typeof projects === 'undefined' ? (
              <div>
                <h2>Loading projects...</h2>
              </div>
            ) : projects.length === 0 ? (
              <h2>There are no open projects.</h2>
            ) : (
              projects.map(project => {
                return <ProjectCard key={project._id} project={project} />;
              })
            )}
          </div>
        </div>
        <div className="flex w-10/12 px-10 mb-8 mt-12 fixed bottom-0 bg-white">
          <Link href="/community/projects/create">
            <div className="flex py-5 justify-center w-2/6 mr-20 border-2 border-blue-600">
              <a className="flex flex-col items-center">
                <p className="text-2xl mb-2">Create new project</p>
                <img src="/plusbutton.svg" alt="Create project" />
              </a>
            </div>
          </Link>
          <SkillsDisplay skills={userInfo.skills} />
        </div>
      </div>
    </Layout>
  );
}

export default Projects;
