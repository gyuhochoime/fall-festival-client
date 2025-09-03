import { ReactElement } from 'react';

export type navItem = {
  id: string;
  path: string;
  label: string;
  DefaultIcon: ReactElement;
  ActiveIcon: ReactElement;
  activePaths?: string[];
};

export type navItems = readonly navItem[];
