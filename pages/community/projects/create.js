import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import { useCreateGig } from '../../../hooks/useCreateGig';

function CreateProject() {
  const router = useRouter();
  const [createGig, { isLoading: isSubmitting }] = useCreateGig();

  async function onSubmit(project) {
    await createGig({ ...project, isProject: true });
    await router.push('/community/projects');
  }

  return (
    <Layout>
      <div className="w-full p-8 h-full overflow-scroll">
        <h1 className="underline text-black text-4xl">Create New Project</h1>
        <CreateGigForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          isProject
        />
      </div>
    </Layout>
  );
}

export default CreateProject;
