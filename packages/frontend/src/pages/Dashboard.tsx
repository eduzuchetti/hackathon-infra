import styled from 'styled-components';
import { useAuth } from '../auth/use-auth';
import { LogoutButton } from '../components/LogoutButton';
import { Profile } from '../components/Profile';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
`;

const MainContent = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <LogoutButton />
      </DashboardHeader>
      
      <DashboardContent>
        <Sidebar>
          <Profile />
        </Sidebar>
        
        <MainContent>
          <h2>Welcome, {user?.name}!</h2>
          <p>This is your hackathon dashboard where you can manage your events and teams.</p>
          
          <h3>Your Hackathons</h3>
          <p>You don't have any active hackathons yet. Create one to get started!</p>
          
          <h3>Your Teams</h3>
          <p>You're not part of any teams yet. Join one or create your own!</p>
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard; 