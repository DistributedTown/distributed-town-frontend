import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { useMagic } from '../../../components/MagicStore';
import ProjectCard from '../../../components/project/ProjectCard';
import SkillsDisplay from '../../../components/SkillsDisplay';

import Layout from '../../../components/Layout';
import { getProjects } from '../../../api';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import Button from '../../../components/Button';
import PageTitle from '../../../components/PageTitle';

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
      <div className="grid gap-8 m-8">
        <PageTitle>Open Projects</PageTitle>
        <div className="grid items-baseline gap-12 mt-5 mb-40 lg:grid-cols-2 xl:grid-cols-3">
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
          <Button filled>
            <a className="flex items-center justify-center space-x-2">
              <p className="mb-2 text-2xl">Create new project</p>
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
