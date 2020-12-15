import { useRouter } from 'next/router';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import Layout from '../../../components/Layout';
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
      <div className="w-full p-8 h-full overflow-scroll bg-white">
        <h1 className="underline text-black text-4xl">Create New Gig</h1>
        <CreateGigForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </Layout>
  );
}

export default CreateGig;
