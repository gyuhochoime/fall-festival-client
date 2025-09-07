import React from 'react';
import * as S from './FavoriteButton.styles';
import { FavoriteButtonProps } from './FavoriteButton.types';
import FavoriteOn from '@/assets/icons/favorite-on.svg?react';
import FavoriteOff from '@/assets/icons/favorite-off.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  isFavorited,
  onClick,
  variant = 'default',
  position = 'relative',
  mode = 'favorite',
  className,
  disabled = false,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) return;
    onClick(id, event);
  };

  const getIcon = () => {
    if (mode === 'delete') return <TrashIcon />;
    return isFavorited ? <FavoriteOn /> : <FavoriteOff />;
  };

  const getText = () => {
    if (mode === 'delete') return null;
    return isFavorited ? '찜 완료' : '찜하기';
  };

  const getAriaLabel = () => {
    if (mode === 'delete') return '삭제하기';
    return isFavorited ? '찜 완료' : '찜하기';
  };

  return (
    <S.FavoriteButton
      onClick={handleClick}
      $isFavorited={isFavorited}
      $variant={variant}
      $position={position}
      $mode={mode}
      className={className}
      disabled={disabled}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
      {getText() && <S.ButtonText $variant={variant}>{getText()}</S.ButtonText>}
    </S.FavoriteButton>
  );
};

export default FavoriteButton;
