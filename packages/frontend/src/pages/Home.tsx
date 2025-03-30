import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import Container from '../components/Layout/Container';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

const HeroSection = styled.div`
  padding: ${theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSizes.xxxl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSizes.large};
  color: ${theme.colors.secondaryText};
  max-width: 700px;
  margin: 0 auto ${theme.spacing.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const FeaturesSection = styled.div`
  padding: ${theme.spacing.xxl} 0;
  background-color: #f9f9f9;
`;

const FeatureTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const FeatureCard = styled(Card)`
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.round};
  background-color: rgba(71, 162, 72, 0.1);
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${theme.spacing.md};
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Container>
        <HeroSection>
          <HeroTitle>Welcome to Hackathon Data Platform</HeroTitle>
          <HeroSubtitle>
            A modern, MongoDB-inspired platform for all your data management needs. 
            Easily organize, visualize, and analyze your data with our intuitive tools.
          </HeroSubtitle>
          <ButtonGroup>
            <Button variant="secondary" size="large" onClick={() => navigate('/about')}>
              Learn More
            </Button>
            <Button size="large" onClick={handleGetStarted}>
              Get Started
            </Button>
          </ButtonGroup>
        </HeroSection>
      </Container>

      <FeaturesSection>
        <Container>
          <FeatureTitle>Key Features</FeatureTitle>
          <FeaturesGrid>
            <FeatureCard 
              title="Intuitive Dashboard"
              subtitle="Monitor all your key metrics in one place"
            >
              <FeatureIcon>📊</FeatureIcon>
              <p>
                Our dashboard provides a clean overview of your data with MongoDB-inspired
                visualizations that make understanding your information easier than ever.
              </p>
            </FeatureCard>
            
            <FeatureCard 
              title="Advanced Analytics"
              subtitle="Deep insights into your data"
            >
              <FeatureIcon>📈</FeatureIcon>
              <p>
                Leverage our powerful analytics tools to discover patterns and trends, 
                helping you make more informed decisions.
              </p>
            </FeatureCard>
            
            <FeatureCard 
              title="Seamless Integration"
              subtitle="Connect with your favorite tools"
            >
              <FeatureIcon>🔄</FeatureIcon>
              <p>
                Easily integrate with other systems and tools in your workflow, 
                creating a unified data experience across your organization.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>
    </>
  );
};

export default Home; 