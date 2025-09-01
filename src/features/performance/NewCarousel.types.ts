import { PerformanceItem } from './Carousel.types';

export interface NewCarouselProps {
  data: PerformanceItem[];
  onIndexChange?: (index: number) => void;
  onArtistClick?: (artistData: PerformanceItem) => void;
}
