import * as S from './ConfirmationModal.styles';

interface ConfirmationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function ConfirmationModal({
  message,
  confirmText = '이동하기',
  cancelText = '머무르기',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <S.ModalContainer>
      <S.ModalTextBox>
        <S.ModalText>{message}</S.ModalText>
      </S.ModalTextBox>
      <S.ButtonContainer>
        <S.ConfirmButton onClick={onConfirm}>{confirmText}</S.ConfirmButton>
        <S.CancelButton onClick={onCancel}>{cancelText}</S.CancelButton>
      </S.ButtonContainer>
    </S.ModalContainer>
  );
}
