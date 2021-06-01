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
      image: 'https://hub.textile.io/ipfs/bafkreiaks3kjggtxqaj3ixk6ce2difaxj5r6lbemx5kcqdkdtub5vwv5mi',
      properties: {
        title: project.title,
        description: project.description,
        skillsNeeded: ['Backend', 'Smart Contracts', 'Network Design'],
        fundsNeeded: 35000,
        commitment: 10
      }
    }
    const url = await pushJSONDocument(metadataJson)
    console.log(url);
      // TODO: get community data
      // await createProject({url, template: 0, communityAddress: '0x15a783406848Eb80b558A6A56E46b8e63151De8b'});
      await router.push('/community/projects');
    }
  return (
    <Layout color="#146EAA">
      <div className="w-full p-8 h-full overflow-scroll">
        <PageTitle>Create New Project</PageTitle>
        <CreateGigForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          isProject
        />
      </div>
      { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
            {
              tokenId: tokenId,
              hash: "wnGO5OQLkAEJ"
            }}/> : null}
    </Layout>
  );
}

export default CreateProject;
