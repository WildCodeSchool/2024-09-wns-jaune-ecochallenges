import { ActionForm } from '@/components/forms/action';
import { useGetActionQuery } from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ActionEdition = () => {
  const { actionId } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useGetActionQuery({
    variables: { id: actionId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (user?.role !== 'admin' && user?.id !== data?.getAction.createdBy?.id) {
    navigate(`/actions`);
    toast.error(`Vous n'avez pas les droits pour modifier ce challenge`);
    return null;
  }

  return <ActionForm actionId={actionId} />;
};
