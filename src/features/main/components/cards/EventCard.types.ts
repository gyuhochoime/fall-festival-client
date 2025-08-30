// import { ColorKey } from '@/components/colorbuttons/ColorButton.types';

export interface CardProps {
  startTime?: string;
  endTime?: string;
  title: string;
  location: string;
  date: string;
  onClick?: () => void;
  currentIndex?: number;
  totalCards?: number;
}

export interface ProgressProps {
  startTime?: string;
  endTime?: string;
}
