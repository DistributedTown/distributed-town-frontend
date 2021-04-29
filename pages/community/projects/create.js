import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import { useCreateProject } from '../../../hooks/useCreateProject';
import PageTitle from '../../../components/PageTitle';
import QRModal from '../../../components/QRModal';
import { useState } from 'react';
import { pushJSONDocument } from '../../../utils/textile.hub';

//todo: 6 skills tops
function CreateProject() {
  const router = useRouter();
  const [createProject, { isLoading: isSubmitting }] = useCreateProject();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const modalText = [
    'Scan with your ', 
    <a href="" className="underline text-blue-600 hover:text-blue-400 visited:text-purple-400" >SkillWallet App</a>, 
    ' to publish this project.'];

    async function onSubmit(project) {

    const metadataJson = {
      name: `DistributedTown's project`,
      description: "Distributed Town lets people organize in self-sovereign, autonomous communities with a common, mathematically proved system of accounting. It’s based on a non-speculative mutual credit system, and a universal-login based on Skills, rather than personal data.",
      image: 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg',
      properties: {
        title: project.title,
        description: project.description,
        skillsNeeded: project.skills,
        fundsNeeded: project.fundsNeeded,
        commitment: project.commitment
      }
    }
    const url = await pushJSONDocument(metadataJson)
    console.log(url);
      // TODO: get community data
      await createProject({url, template: 0, communityAddress: '0xF0F8AEC4D3552a0BE4D797EA93aE20dB8F643b99'});
      await router.push('/community/projects');
    }
  return (
    <Layout>
      <div className="w-full p-8 h-full overflow-scroll">
        <PageTitle>Create New Project</PageTitle>
        <CreateGigForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          isProject
        />
      </div>
      { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText}/> : null}
    </Layout>
  );
}

export default CreateProject;
