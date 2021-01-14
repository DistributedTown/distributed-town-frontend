import { useRouter } from 'next/router';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import Layout from '../../../components/Layout';
import PageTitle from '../../../components/PageTitle';
import { useCreateGig } from '../../../hooks/useCreateGig';

function CreateGig() {
  const router = useRouter();
  const [createGig, { isLoading: isSubmitting }] = useCreateGig();

  async function onSubmit(gig) {
    await createGig({ ...gig, isProject: false });
    await router.push('/community/gigs');
  }

  return (
    <Layout>
      <div className="h-screen p-8">
        <PageTitle>Create New Gig</PageTitle>
        <CreateGigForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </Layout>
  );
}

export default CreateGig;
