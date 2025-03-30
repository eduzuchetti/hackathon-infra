import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Hackathon Infrastructure. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer; 