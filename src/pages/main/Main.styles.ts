import styled from 'styled-components';
import BackLayout from '@/assets/icons/Background-main.svg';
import { motion } from 'framer-motion';

export const Layout = styled.div`
  /* background-image: url(${BackLayout});
  background-repeat: no-repeat;
  background-size: cover; */
  background: linear-gradient(180deg, #7e419a 35%, #7e419aca 45%, transparent 90%);
  width: 100%;
  height: 50rem;
  position: absolute;
`;
export const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 5.37rem;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: ${(props) => props.theme.colors.grayScale.black};
  position: relative;
`;

export const Title = styled.p`
  ${(props) => props.theme.fonts.header.h3}
  color: ${(props) => props.theme.colors.grayScale.offwhite};
`;

export const CarouselsBox = styled.div`
  display: flex;
  justify-content: center;
`;

// ne
export const TitleWrapper = styled.div`
  display: flex;
  width: 20.9375rem;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem auto 0.8rem;
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
