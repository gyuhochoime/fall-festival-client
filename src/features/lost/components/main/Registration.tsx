import useModal from '@/hooks/useModal';
import * as S from './Registration.styles';
import PlusIcon from '@/assets/icons/plus.svg?react';
import ModalPost from '../../modal/ModalPost';
import { theme } from '@/styles/theme';
// 로그인 모달/상태 사용 제거

/**
 * 분실물 등록 컴포넌트
 * @returns {JSX.Element}
 */

export default function Registration() {
  const modalPost = useModal(ModalPost);

  const handleAddClick = () => {
    modalPost.open(
      {
        title: '분실물 등록 숙지 사항',
      },
      {
        isHelpIcon: false,
      },
    );
  };
  return (
    <S.Container>
      <S.Button onClick={() => handleAddClick()}>
        <S.IconTextWrap>
          <S.Icon>
            <PlusIcon width={'1.5rem'} height={'1.5rem'} fill={theme.colors.grayScale.black} />
          </S.Icon>
          <S.ButtonText>분실물 등록하기</S.ButtonText>
        </S.IconTextWrap>
      </S.Button>
      <S.Text>* 분실물을 습득하셨다면 주변의 가까운 스태프에게 먼저 전달해주세요!</S.Text>
    </S.Container>
  );
}
