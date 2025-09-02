import * as S from './ValidationModal.styles';

interface ValidationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  buttonText?: string;
  onConfirm?: () => void;
}

export default function ValidationModal({
  message,
  buttonText = '확인',
  onConfirm,
}: ValidationModalProps) {
  return (
    <S.ModalContainer>
      <S.ModalTextBox>
        <S.ModalText>{message}</S.ModalText>
      </S.ModalTextBox>
      <S.ConfirmButton onClick={onConfirm}>{buttonText}</S.ConfirmButton>
    </S.ModalContainer>
  );
}
