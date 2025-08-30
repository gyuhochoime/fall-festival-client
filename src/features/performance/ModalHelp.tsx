import * as S from './ModalHelp.styles';
import { useModalStore } from '@/stores/useModalStore';

/**
 * ModalHelp 컴포넌트
 * @returns {JSX.Element}
 */

export default function ModalHelp() {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleDismiss = () => {
    modals.forEach((modal) => {
      closeModal({ key: modal.key, clearTime: 0 });
    });
  };

  return (
    <S.ModalContainer>
      <S.ModalTextBox>
        <S.ModalText>축제기획단 기반 정보이며</S.ModalText>
        <S.ModalText>기상 상황이나 아티스트 사정 등으로 인한</S.ModalText>
        <S.ModalText>변동 사항은 실시간 반영되지 않을 수 있어요!</S.ModalText>
      </S.ModalTextBox>
      <S.ModalDismissButton onClick={handleDismiss}>다시 보지 않기</S.ModalDismissButton>
    </S.ModalContainer>
  );
}
