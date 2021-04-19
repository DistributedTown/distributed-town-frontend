import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import ProjectCard from '../../../components/project/ProjectCard';
import SkillsDisplay from '../../../components/SkillsDisplay';

import Layout from '../../../components/Layout';
import { getProjects } from '../../../api/gigs';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import Button from '../../../components/Button';
import PageTitle from '../../../components/PageTitle';
import {user as userInfo} from '../../../utils/mockData';
import {getAllProjects as mockProjects} from '../../../utils/mockData';

function Projects() {
  // TODO: replace mock data with backend call
  // const { data: userInfo } = useGetUserInfo();
  const [projects, setProjects] = useState();
  let availableId = 9999999999;

  useEffect(() => {
    (async () => {
      // TODO: replace mock data with backend call
      // const projectsResponse = await getProjects();
      // setProjects(projectsResponse);
      setProjects(mockProjects.projects);
    })();
  }, []);

  // TODO: Loading
  if (!userInfo) return null;

  return (
    <Layout>
      <div className="grid gap-8 m-8">
        <div className="flex justify-between items-center">
          <PageTitle className="align-center">Open Projects</PageTitle>
            <div>
              <Link href="/community/projects/create">
                <Button filled>
                  <a className="flex items-center justify-center space-x-2">
                    <p className="mb-2 text-2xl">Create new project</p>
                  </a>
                </Button>
              </Link>
            </div>
        </div>
        <div className="grid items-baseline gap-12 mt-5 mb-40 lg:grid-cols-2 xl:grid-cols-3">
          {typeof projects === 'undefined' ? (
            <div>
              <h2>Loading projects...</h2>
            </div>
          ) : projects.length === 0 ? (
            <h2>There are no open projects.</h2>
          ) : (
            projects.map(project => {
              if (!project._id) {
                project._id = availableId;
                availableId -= 1;
              }
              return <ProjectCard key={project._id} project={project} />;
            })
          )}
        </div>
        <SkillsDisplay skills={userInfo.skillSet.skills} />
      </div>
    </Layout>
  );
}

export default Projects;
