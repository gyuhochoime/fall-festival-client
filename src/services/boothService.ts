import axiosInstance from '@/lib/AxiosInstance';
import type {
  Booth,
  PubListResponse,
  PubDetailResponse,
  PubApiResponse,
  MenuListResponse,
  MenuApiResponse,
} from '@/types/booth.types';

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
  const menuResponse = await axiosInstance.get<MenuListResponse>(`/api/pubs/${pub.id}/menus`);
  const menu = transformMenusToBoothMenu(menuResponse.data.data);

  return {
    id: pub.id,
    locate: pub.location,
    type: pub.type,
    affiliation: pub.affiliation,
    pubName: pub.name,
    takeout: pub.takeout,
    profileImage: pub.profileImage,
    posterImage: pub.posterImage,
    menu,
  } as Booth;
};

export const boothService = {
  async getAllBooths(): Promise<Booth[]> {
    const response = await axiosInstance.get<PubListResponse>('/api/pubs');
    const booths = await Promise.all(response.data.data.map(transformPubToBootn));
    return booths;
  },

  async getBoothById(id: number): Promise<Booth> {
    const response = await axiosInstance.get<PubDetailResponse>(`/api/pubs/${id}`);
    return await transformPubToBootn(response.data.data);
  },
};
