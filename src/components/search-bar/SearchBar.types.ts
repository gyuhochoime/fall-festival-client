export interface SearchBarProps {
  placeholder?: string;
  selectedDay?: string;
  onSearchClick?: () => void;
  onDayChange?: (day: string) => void;
}
