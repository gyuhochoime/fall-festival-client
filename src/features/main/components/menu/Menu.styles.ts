import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
`;

export const Section = styled.section`
  width: 21rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  width: 20.9375rem;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem auto 0.8rem;
`;

export const Title = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  color: ${(props) => props.theme.colors.primary.violet};
`;

export const MoreButton = styled(motion.div)`
  color: ${(props) => props.theme.colors.primary.violet};
  display: flex;
  padding: 0.25rem 0 0;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
`;

export const BtnText = styled.p`
  ${(props) => props.theme.fonts.body.small600}
  text-align: center;
`;

export const SubTitle = styled.nav`
  ${(props) => props.theme.fonts.header.h3}
  color: ${(props) => props.theme.colors.grayScale.black};
  margin: 0 0 1rem;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: center;
  width: 21rem;
  margin: 1rem 1.21rem;
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
