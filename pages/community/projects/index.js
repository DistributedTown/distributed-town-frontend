import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { useMagic } from '../../../components/Store';
import ProjectCard from '../../../components/project/ProjectCard';
import SkillsDisplay from '../../../components/SkillsDisplay';

import Layout from '../../../components/Layout';
import { getProjects } from '../../../api';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import Button from '../../../components/Button';

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
      <div className="grid m-8 gap-8">
        <h1 className="underline text-black text-4xl">Open Projects</h1>
        <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-3 gap-12 items-baseline mb-40">
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
        <Link href="/community/projects/create">
          <Button>
            <a className="flex gap-2 justify-center items-center">
              <p className="text-2xl mb-2">Create new project</p>
              <FaPlusCircle />
            </a>
          </Button>
        </Link>
        <SkillsDisplay skills={userInfo.skills} />
      </div>
    </Layout>
  );
}

export default Projects;
