import * as S from './ImageBannerFrame.styles';
import { ImageBannerFrameProps } from './ImageBannerFrame.types';

/**
 * ImageTextIconFrame component
 * @param image image URL
 * @param title title TEXT
 * @param description description TEXT
 * @param onClick click event handler
 * @returns {JSX.Element}
 */

export default function ImageBannerFrame({ image, onClick }: ImageBannerFrameProps) {
  const hasImage = Boolean(image);
  return (
    <S.Container $hasImage={hasImage} onClick={onClick}>
      {hasImage && <S.Image src={image} alt="이미지" />}
    </S.Container>
  );
}
