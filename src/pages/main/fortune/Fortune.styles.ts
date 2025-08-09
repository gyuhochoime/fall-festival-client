import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9ff 0%, #e8f0ff 100%);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Content = styled.div`
  padding: 1rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  line-height: 1.5;
`;

export const FortuneCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgb(0 0 0 / 10%);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const FortuneIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const FortuneType = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const FortuneText = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const LuckyItem = styled.div`
  background: #f0f7ff;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
`;

export const LuckyLabel = styled.span`
  font-size: 0.875rem;
  color: #06c;
  font-weight: 600;
`;

export const LuckyValue = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export const RefreshButton = styled.button`
  background: #06c;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0052a3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CharacterImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
`;
