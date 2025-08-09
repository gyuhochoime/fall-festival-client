import { ReactElement } from 'react';

export type navItem = {
  id: string;
  path: string;
  label: string;
  DefaultIcon: ReactElement;
  ActiveIcon: ReactElement;
};

export type navItems = navItem[];
