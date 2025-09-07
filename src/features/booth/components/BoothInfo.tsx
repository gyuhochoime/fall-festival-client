import * as S from './BoothInfo.styles';
import { FavoriteButton } from '@/components/favorite-button';
import { newlineToBr } from '@/utils/newlineToBr';
import { useBooth } from '@/hooks/useBooth';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import { OPERATING_HOURS } from '@/constants/booth/operating-hours';
import PubBeerIcon from '@/assets/icons/pub_beer.svg?react';
import TimeIcon from '@/assets/icons/time_pub.svg?react';

export default function BoothInfo({ id }: { id: number }) {
  const { booth, error } = useBooth(id);
  const { handleToggleFavorite, isFavorited } = useFavorites();
  const navigate = useNavigate();

  if (error || !booth) {
    navigate('/error', {
      state: {
        mainText: '서버가 힘들어하고 있어요.',
        subText: '멋사가 금방 고쳐올테니, 잠시 후에 다시 와주세요!',
        showBackButton: true,
        showHomeButton: true,
      },
    });
    return null;
  }

  const isBoothFavorited = isFavorited(booth.id);

  return (
    <S.Container>
      <S.ImageBtnFrame>
        <S.Image src={booth.profileImage} />
        <FavoriteButton
          id={booth.id}
          isFavorited={isBoothFavorited}
          onClick={handleToggleFavorite}
          variant="large"
          position="relative"
        />
      </S.ImageBtnFrame>
      <S.TextSection>
        <S.TextFrame>
          <S.Text>{booth.affiliation}</S.Text>
        </S.TextFrame>
        <S.BoothName
          dangerouslySetInnerHTML={{
            __html: newlineToBr(booth.pubName),
          }}
        />
        <S.InfoRow>
          <S.OperatingHours>
            <TimeIcon width="0.75rem" height="0.75rem" />
            {OPERATING_HOURS}
          </S.OperatingHours>
          <S.VerticalLine_black />
          <S.LocationButton
            onClick={() => {
              const locationSection = document.querySelector('[data-section="location"]');
              locationSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            위치보기
          </S.LocationButton>
        </S.InfoRow>

        {booth.takeout && (
          <S.TakeOut>
            <PubBeerIcon width="0.75rem" height="0.75rem" />
            포장가능
          </S.TakeOut>
        )}
      </S.TextSection>
    </S.Container>
  );
}
