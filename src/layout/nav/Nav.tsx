import { NavLink, useLocation } from 'react-router-dom';
import * as S from './Nav.styles';
import { NAV_ITEMS } from './nav-item';
// import Lottie from 'react-lottie-player';

/**
 * Nav component
 * @returns {JSX.Element}
 */

export default function Nav() {
  const locate = useLocation();
  // 비로그인 세션 체제로 전환: 로그인 모달/게이트 비활성화
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, isLocation: boolean) => {
    if (isLocation) {
      e.preventDefault();
    }
    // 로그인 게이트 제거
  };

  return (
    <S.Nav>
      {NAV_ITEMS.map((item) => {
        const isLocation = locate.pathname.startsWith(item.path);
        return (
          <NavLink
            to={item.path}
            key={item.id}
            style={{ textDecoration: 'none' }}
            onClick={(e) => handleNavigate(e, isLocation)}
          >
            <S.NavBtn $isActive={isLocation}>
              {!isLocation ? item.DefaultIcon : item.ActiveIcon}
              <S.NavBtnText $isActive={isLocation}>{item.label}</S.NavBtnText>
            </S.NavBtn>
          </NavLink>
        );
      })}
    </S.Nav>
  );
}
