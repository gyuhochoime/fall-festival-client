import { Tabs } from '@/components/tabs';
import { useState } from 'react';
import * as S from './MenuList.styles';
import { MenuFrame } from '@/components/image-text-frame';
import { useBooth } from '@/hooks/useBooth';
import { useNavigate } from 'react-router-dom';
const MENU_CATEGORY = ['메인 메뉴', '사이드 메뉴', '기타'];

export default function MenuList({ id }: { id: number }) {
  const [activeTab, setActiveTab] = useState<string>('');
  const { booth, error } = useBooth(id);
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
  return (
    <>
      <S.TabsContainer>
        <Tabs tabs={MENU_CATEGORY} activeTab={activeTab} onTabClick={setActiveTab} toggle={true} />
      </S.TabsContainer>
      {(activeTab === '' || activeTab === '메인 메뉴') && (
        <S.MenuFrame>
          <S.MenuItem>메인 메뉴</S.MenuItem>
          <S.MenuList>
            {booth.menu.main.map((menu) => (
              <MenuFrame
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}

      {activeTab === '' && booth.menu.side.length > 0 && <S.HorizontalLine />}

      {(activeTab === '' || activeTab === '사이드 메뉴') && (
        <S.MenuFrame>
          <S.MenuItem>사이드 메뉴</S.MenuItem>
          <S.MenuList>
            {booth.menu.side.map((menu) => (
              <MenuFrame
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}

      {activeTab === '' && booth.menu.others.length > 0 && <S.HorizontalLine />}

      {(activeTab === '' || activeTab === '기타') && (
        <S.MenuFrame>
          <S.MenuItem>기타</S.MenuItem>
          <S.MenuList>
            {booth.menu.others.map((menu) => (
              <MenuFrame
                menu={menu.name}
                price={menu.price}
                description={menu.describtion}
                width="100%"
              />
            ))}
          </S.MenuList>
        </S.MenuFrame>
      )}
    </>
  );
}
