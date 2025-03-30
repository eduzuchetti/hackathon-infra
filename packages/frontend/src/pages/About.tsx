import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import Container from '../components/Layout/Container';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const PageTitle = styled.h1`
  margin: ${theme.spacing.lg} 0;
  color: ${theme.colors.text};
`;

const Subtitle = styled.h2`
  color: ${theme.colors.secondaryText};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing.lg};
`;

const TeamSection = styled.div`
  margin: ${theme.spacing.xl} 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const TeamMemberCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: ${theme.borderRadius.round};
  object-fit: cover;
  margin-bottom: ${theme.spacing.md};
`;

const Name = styled.h3`
  margin-bottom: ${theme.spacing.xs};
`;

const Role = styled.p`
  color: ${theme.colors.secondaryText};
  margin-bottom: ${theme.spacing.md};
`;

const ContactSection = styled.div`
  margin-top: ${theme.spacing.xxl};
  text-align: center;
`;

const About: React.FC = () => {
  return (
    <Container>
      <PageTitle>About Us</PageTitle>
      <Subtitle>We're building the future of data management</Subtitle>
      
      <Card elevation="medium">
        <p>
          Our app helps you organize, visualize, and analyze your data with MongoDB-inspired
          interfaces that are both powerful and easy to use.
        </p>
        <p>
          Founded in 2023, we're on a mission to democratize data access and make powerful
          tools available to everyone.
        </p>
      </Card>
      
      <TeamSection>
        <h2>Our Team</h2>
        <TeamGrid>
          <TeamMemberCard elevation="small">
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team member" />
            <Name>John Smith</Name>
            <Role>Founder & CEO</Role>
          </TeamMemberCard>
          
          <TeamMemberCard elevation="small">
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team member" />
            <Name>Sarah Johnson</Name>
            <Role>Lead Developer</Role>
          </TeamMemberCard>
          
          <TeamMemberCard elevation="small">
            <Avatar src="https://randomuser.me/api/portraits/men/68.jpg" alt="Team member" />
            <Name>Mike Thompson</Name>
            <Role>UX Designer</Role>
          </TeamMemberCard>
        </TeamGrid>
      </TeamSection>
      
      <ContactSection>
        <h2>Get in Touch</h2>
        <p>Have questions or want to learn more about our services?</p>
        <Button size="large">Contact Us</Button>
      </ContactSection>
    </Container>
  );
};

export default About; 