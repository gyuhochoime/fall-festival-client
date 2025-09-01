import * as S from './DaySelectorModal.styles';
import { DaySelectorModalProps } from './DaySelectorModal.types';
import HandleBarIcon from '@/assets/icons/handle-bar.svg?react';
import ModalCheckIcon from '@/assets/icons/modal-check.svg?react';

const DaySelectorModal: React.FC<DaySelectorModalProps> = ({
  isOpen,
  selectedDay,
  onDaySelect,
  onClose,
}) => {
  const handleDayClick = (day: string) => {
    onDaySelect(day);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.Backdrop onClick={handleBackdropClick}>
      <S.ModalContainer>
        <S.HandleBar>
          <HandleBarIcon width="20.9375rem" height="1.75rem" />
        </S.HandleBar>

        <S.Title>일자선택</S.Title>

        <S.DayList>
          {['1일차', '2일차', '3일차'].map((day) => (
            <S.DayItem key={day} onClick={() => handleDayClick(day)}>
              <S.DayText $isSelected={selectedDay === day}>{day}</S.DayText>
              {selectedDay === day && (
                <S.CheckIcon>
                  <ModalCheckIcon width="1.25rem" height="1.25rem" />
                </S.CheckIcon>
              )}
            </S.DayItem>
          ))}
        </S.DayList>
      </S.ModalContainer>
    </S.Backdrop>
  );
};

export default DaySelectorModal;
