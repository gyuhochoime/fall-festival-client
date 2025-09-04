import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding-top: 4.5rem;
  padding-bottom: 1em;
  gap: 1.5rem;
`;

export const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  width: 21rem;
  gap: 0.75rem;
`;

export const FaqItem = styled.div`
  background: ${(props) => props.theme.colors.grayScale.white};
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grayScale.gy100};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 25%);
`;

export const FaqQuestion = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

export const QuestionText = styled.p`
  ${(props) => props.theme.fonts.body.medium500}
  color: ${(props) => props.theme.colors.grayScale.black};
  margin: 0;
  line-height: 1.4;
`;

export const ExpandIcon = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${(props) => props.theme.colors.grayScale.black};
`;

export const FaqAnswer = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const AnswerContent = styled.div`
  padding: 0 1rem 1.25rem;

  hr {
    margin: 0 0 1rem;
    border-color: ${(props) => props.theme.colors.grayScale.gy50};
  }
`;

export const AnswerText = styled.p`
  ${(props) => props.theme.fonts.body.small400}
  color: ${(props) => props.theme.colors.grayScale.gy600};
  margin: 0;
  line-height: 1.5;
  white-space: pre-line;
`;
