import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import { useCreateGig } from '../../../hooks/useCreateGig';
import PageTitle from '../../../components/PageTitle';
import QRModal from '../../../components/QRModal';
import { useState } from 'react';

function CreateProject() {
  const router = useRouter();
  const [createGig, { isLoading: isSubmitting }] = useCreateGig();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const modalText = [
    'Scan with your ', 
    <a href="" className="underline text-blue-600 hover:text-blue-400 visited:text-purple-400" >SkillWallet App</a>, 
    ' to publish this project.'];

    //TODO: replace mock data with backend call
  // async function onSubmit(project) {
    // await createGig({ ...project, isProject: true });
  //   await router.push('/community/projects');
  // }

  return (
    <Layout>
      <div className="w-full p-8 h-full overflow-scroll">
        <PageTitle>Create New Project</PageTitle>
        <CreateGigForm
          isSubmitting={isSubmitting}
          onSubmit={toggleModal}
          isProject
        />
      </div>
      { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText}/> : null}
    </Layout>
  );
}

export default CreateProject;
