import { create } from 'zustand';
import { artistService } from '@/services/artistService';
import { PerformanceItem } from '@/features/performance/Carousel.types';

export type DayType = '1일차' | '2일차' | '3일차';

interface PerformanceState {
  performances: Record<DayType, PerformanceItem[]>;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface PerformanceActions {
  fetchPerformances: () => Promise<void>;
  getPerformancesByDay: (day: DayType) => PerformanceItem[];
  clearError: () => void;
}

export const usePerformanceStore = create<PerformanceState & PerformanceActions>((set, get) => ({
  // State
  performances: {
    '1일차': [],
    '2일차': [],
    '3일차': [],
  },
  loading: false,
  error: null,
  isInitialized: false,

  // Actions
  fetchPerformances: async () => {
    const { isInitialized } = get();

    console.log('fetchPerformances called, isInitialized:', isInitialized);

    // 이미 초기화되었으면 다시 호출하지 않음
    if (isInitialized) {
      console.log('Already initialized, skipping fetch');
      return;
    }

    console.log('Starting to fetch performances...');
    set({ loading: true, error: null });

    try {
      const performancesWithArtists = await artistService.getPerformancesWithArtists();
      console.log('Fetched performances with artists:', performancesWithArtists);

      // 일차별로 데이터 분류
      const performancesByDay: Record<DayType, PerformanceItem[]> = {
        '1일차': [],
        '2일차': [],
        '3일차': [],
      };

      performancesWithArtists.forEach((performance) => {
        const performanceItem: PerformanceItem = {
          id: performance.id.toString(),
          backgroundUrl: performance.artist.image,
          singer: performance.artist.name,
          fcm_singer: performance.artist.name,
          time: artistService.formatTimeRange(performance.startTime, performance.endTime),
          description: performance.artist.genre,
          songList: performance.artist.songs.map((song) => ({
            image: song.image,
            name: song.title,
            url: song.link,
          })),
        };

        performancesByDay[performance.day as DayType].push(performanceItem);
      });

      console.log('Setting performances by day:', performancesByDay);
      set({
        performances: performancesByDay,
        loading: false,
        error: null,
        isInitialized: true,
      });
      console.log('Performance store initialized successfully');
    } catch (err) {
      console.error('공연 데이터를 가져오는데 실패했습니다:', err);
      set({
        loading: false,
        error: '공연 정보를 불러오는데 실패했습니다.',
        isInitialized: false,
      });
    }
  },

  getPerformancesByDay: (day: DayType) => {
    const { performances } = get();
    return performances[day] || [];
  },

  clearError: () => {
    set({ error: null });
  },
}));
