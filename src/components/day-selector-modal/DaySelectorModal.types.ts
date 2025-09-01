export interface DaySelectorModalProps {
  isOpen: boolean;
  selectedDay: string;
  onDaySelect: (day: string) => void;
  onClose: () => void;
}
