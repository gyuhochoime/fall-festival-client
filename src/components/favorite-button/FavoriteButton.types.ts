export interface FavoriteButtonProps {
  id: number;
  isFavorited: boolean;
  onClick: (id: number, event: React.MouseEvent) => void;
  variant?: 'default' | 'large';
  position?: 'relative' | 'absolute';
  mode?: 'favorite' | 'delete';
  className?: string;
  disabled?: boolean;
}
