import axiosInstance from '@/lib/AxiosInstance';
import type {
  Booth,
  PubListResponse,
  PubDetailResponse,
  PubApiResponse,
  MenuListResponse,
  MenuApiResponse,
} from '@/types/booth.types';
import { BOOTH_LIST } from '@/constants/booth/booth';

const transformMenusToBoothMenu = (menus: MenuApiResponse[]) => {
  const main = menus
    .filter((m) => m.category === 'main')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  const side = menus
    .filter((m) => m.category === 'side')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  const sub = menus
    .filter((m) => m.category === 'drink')
    .map((m) => ({
      name: m.name,
      describtion: m.description,
      price: `${m.price.toLocaleString()} 원`,
    }));

  return { main, side, sub };
};

const transformPubToBootn = async (pub: PubApiResponse): Promise<Booth> => {
  try {
    const menuResponse = await axiosInstance.get<MenuListResponse>(`/api/pubs/${pub.id}/menus`);
    const menu = transformMenusToBoothMenu(menuResponse.data.data);

    return {
      id: pub.id,
      locate: pub.location,
      type: pub.type,
      affiliation: pub.affiliation,
      pubName: pub.name,
      takeout: pub.takeout,
      profileImage: pub.profile_image,
      posterImage: pub.poster_image,
      menu,
    } as Booth;
  } catch {
    // 메뉴 API 실패시 하드코딩된 데이터 사용 (fallback)
    const boothData = BOOTH_LIST.find((booth) => booth.id === pub.id);

    return {
      id: pub.id,
      locate: pub.location,
      type: pub.type,
      affiliation: pub.affiliation,
      pubName: pub.name,
      takeout: pub.takeout,
      profileImage: pub.profile_image,
      posterImage: pub.poster_image,
      menu: boothData
        ? JSON.parse(JSON.stringify(boothData.menu))
        : { main: [], side: [], sub: [] },
    } as Booth;
  }
};

export const boothService = {
  async getAllBooths(): Promise<Booth[]> {
    try {
      const response = await axiosInstance.get<PubListResponse>('/api/pubs');
      const booths = await Promise.all(response.data.data.map(transformPubToBootn));
      return booths;
    } catch (error) {
      console.error('Failed to fetch booths from API, using fallback data:', error);
      // API 실패시 하드코딩 데이터 사용 (깊은 복사로 readonly 제거)
      return JSON.parse(JSON.stringify(BOOTH_LIST)) as Booth[];
    }
  },

  async getBoothById(id: number): Promise<Booth> {
    try {
      const response = await axiosInstance.get<PubDetailResponse>(`/api/pubs/${id}`);
      return await transformPubToBootn(response.data.data);
    } catch (error) {
      console.error(`Failed to fetch booth ${id} from API, using fallback data:`, error);
      // API 실패시 하드코딩 데이터 사용
      const booth = BOOTH_LIST.find((b) => b.id === id);
      if (!booth) {
        throw new Error('Booth not found in fallback data');
      }
      return JSON.parse(JSON.stringify(booth)) as Booth;
    }
  },
};
