import * as S from './ImageTextIconFrame.styles';
import { ImageTextIconFrameProps } from './ImageTextIconFrame.types';

/**
 * ImageTextIconFrame component
 * @param image image URL
 * @param title title TEXT
 * @param description description TEXT
 * @param onClick click event handler
 * @returns {JSX.Element}
 */

export default function ImageTextIconFrame({
  image,
  title,
  description,
  onClick,
}: ImageTextIconFrameProps) {
  const hasImage = Boolean(image);
  return (
    <S.Container $hasImage={hasImage} onClick={onClick}>
      {hasImage && <S.Image src={image} alt="이미지" />}
      <S.TextWrap $hasImage={hasImage}>
        <S.TitleText>{title}</S.TitleText>
        <S.DescriptionText>{description}</S.DescriptionText>
      </S.TextWrap>
    </S.Container>
  );
}
