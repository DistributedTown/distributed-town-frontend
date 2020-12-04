import { useContext } from 'react';
import { useQuery } from 'react-query';
import { TokenContext } from '../components/Store';

export const useGetInvitation = () => {
  const [token] = useContext(TokenContext);

  const inviteMembers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/invite`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.json();
  };

  return useQuery('inviteLink', inviteMembers, { enabled: false });
};
