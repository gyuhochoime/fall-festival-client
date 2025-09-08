export interface BoothMenuItem {
  name: string;
  describtion: string;
  price: string;
}

export interface BoothMenu {
  main: BoothMenuItem[];
  side: BoothMenuItem[];
  set: BoothMenuItem[];
  others: BoothMenuItem[];
}

export interface Booth {
  id: number;
  locate: string;
  latitude: number;
  longitude: number;
  affiliation: string;
  pubName: string;
  menu: BoothMenu;
  takeout: boolean;
  profileImage: string;
  posterImage: string;
}

export interface PubApiResponse {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  affiliation: string;
  name: string;
  takeout: boolean;
  profileImage: string;
  posterImage: string;
}

export interface PubListResponse {
  status: string;
  data: PubApiResponse[];
  message: string;
}

export interface PubDetailResponse {
  status: string;
  data: PubApiResponse;
  message: string;
}

export interface MenuApiResponse {
  id: number;
  name: string;
  category: 'main' | 'side' | 'set' | 'others';
  description: string;
  price: number;
}

export interface MenuListResponse {
  status: string;
  data: MenuApiResponse[];
  message: string;
}
