import { navItems } from '@/layout/nav/nav.types';

import HOME_ICON from '@/assets/icons/home.svg?react';
import MAP_ICON from '@/assets/icons/geopoint.svg?react';
import STAGE_ICON from '@/assets/icons/stage.svg?react';
import PUB_ICON from '@/assets/icons/pub.svg?react';
import POLAROID_ICON from '@/assets/icons/polaroid.svg?react';

import HOME_ICON_ACTIVE from '@/assets/icons/home-filled.svg?react';
import MAP_ICON_ACTIVE from '@/assets/icons/geopoint-filled.svg?react';
import STAGE_ICON_ACTIVE from '@/assets/icons/stage-filled.svg?react';
import PUB_ICON_ACTIVE from '@/assets/icons/pub-filled.svg?react';
import POLAROID_ICON_ACTIVE from '@/assets/icons/polaroid-filled.svg?react';

export const NAV_ITEMS: navItems = [
  {
    id: 'home',
    path: '/main',
    label: '홈',
    DefaultIcon: <HOME_ICON width={'1.5rem'} height={'1.5rem'} />,
    ActiveIcon: <HOME_ICON_ACTIVE width={'1.5rem'} height={'1.5rem'} />,
  },
  {
    id: 'map',
    path: '/map',
    label: '지도',
    DefaultIcon: <MAP_ICON width={'1.5rem'} height={'1.5rem'} />,
    ActiveIcon: <MAP_ICON_ACTIVE width={'1.5rem'} height={'1.5rem'} />,
  },
  {
    id: 'performance',
    path: '/performance',
    label: '공연',
    DefaultIcon: <STAGE_ICON width={'1.5rem'} height={'1.5rem'} />,
    ActiveIcon: <STAGE_ICON_ACTIVE width={'1.5rem'} height={'1.5rem'} />,
  },
  {
    id: 'booth',
    path: '/booth',
    label: '주점',
    DefaultIcon: <PUB_ICON width={'1.5rem'} height={'1.5rem'} />,
    ActiveIcon: <PUB_ICON_ACTIVE width={'1.5rem'} height={'1.5rem'} />,
  },
  {
    id: 'polaroid',
    path: '/polaroid',
    label: '폴라로이드',
    DefaultIcon: <POLAROID_ICON width={'1.5rem'} height={'1.5rem'} />,
    ActiveIcon: <POLAROID_ICON_ACTIVE width={'1.5rem'} height={'1.5rem'} />,
  },
  /*{
    id: 'user',
    path: '/user',
    label: '나의 예약',
    icon: WAITING_LOTTIE,
    DefaultIcon: <WAITING_ICON width={'1.5rem'} height={'1.5rem'} fill="#17171B" />,
  },*/
] as const;
