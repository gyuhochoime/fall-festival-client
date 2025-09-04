// import { ColorKey } from '@/components/colorbuttons/ColorButton.types';

export interface CardProps {
  startTime?: string;
  endTime?: string;
  title: string;
  location: string;
  date: string;
  onClick?: () => void;
  noticeId?: number | null; // noticeId 추가
}

export interface ProgressProps {
  startTime?: string;
  endTime?: string;
}
