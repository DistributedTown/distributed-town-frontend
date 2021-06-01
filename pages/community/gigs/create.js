import { useState } from 'react';
import { useRouter } from 'next/router';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import Layout from '../../../components/Layout';
import PageTitle from '../../../components/PageTitle';
import { useCreateGig } from '../../../hooks/useCreateGig';
import QRModal from '../../../components/QRModal';

function CreateGig() {
  const router = useRouter();
  const [createGig, { isLoading: isSubmitting }] = useCreateGig();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const modalText = [
    'Scan with your ', 
    <a href="" className="underline text-blue-600 hover:text-blue-400 visited:text-purple-400" >SkillWallet App</a>, 
    ' to publish this gig.'];


  async function onSubmit(gig) {
    toggleModal();
    await createGig({ ...gig, isProject: false });
    await router.push('/community/gigs');
  }

  return (
    <Layout color="#BD413B">
      <div className="h-screen p-8">
        <PageTitle>Create New Gig</PageTitle>
        <CreateGigForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
      { showModal ? <QRModal toggleModal={toggleModal} modalText={modalText} qrCodeObj={
            {
              tokenId: tokenId,
              hash: "wnGO5OQLkAEJ"
            }}/> : null}
    </Layout>
  );
}

export default CreateGig;
