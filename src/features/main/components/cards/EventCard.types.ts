// import { ColorKey } from '@/components/colorbuttons/ColorButton.types';

export interface CardProps {
  startTime?: string;
  endTime?: string;
  title: string;
  location: string;
  date: string;
  onClick?: () => void;
}

export interface ProgressProps {
  startTime?: string;
  endTime?: string;
}
