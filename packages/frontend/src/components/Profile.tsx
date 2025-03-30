import styled from 'styled-components';
import { useAuth } from '../auth/use-auth';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #0070f3;
`;

const UserName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
`;

const UserEmail = styled.p`
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.875rem;
`;

export const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <ProfileContainer>
      <Avatar src={user.picture} alt={user.name} />
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
    </ProfileContainer>
  );
}; 