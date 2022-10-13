import { useSession } from 'next-auth/react';

type Session = {
  user: User;
  expires: string;
  accessToken: string;
  provider: string;
  idaccount: string;
};

interface User {
  name: string;
  eamil: string;
  image: string;
}

const useNRGSession = () => {
  const { data: session, status } = useSession();

  const getDivision = () => {
    switch (session?.provider) {
      case 'facebook':
        return 1;
      case 'google':
        return 2;
      case 'apple':
        return 4;
      default:
        return 0; // guest
    }
  };

  return {
    session: session ? (session as Session) : null,
    status,
    division: getDivision()
  };
};

export default useNRGSession;
