import { useState, useEffect } from 'react';
import { NavBar } from '@/components/nav-bar';
import * as S from './Faq.styles';
import { faqData, FaqItem } from '@/constants/faq/FaqData';
import { useLayoutStore } from '@/stores/useLayoutStore';

// 아래 화살표 아이콘 컴포넌트
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react';

interface FaqAccordionItemProps {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
}

const FaqAccordionItem = ({ item, isExpanded, onToggle }: FaqAccordionItemProps) => {
  return (
    <S.FaqItem>
      <S.FaqQuestion onClick={onToggle}>
        <S.QuestionText>{item.question}</S.QuestionText>
        <S.ExpandIcon $isExpanded={isExpanded}>
          <ChevronDownIcon />
        </S.ExpandIcon>
      </S.FaqQuestion>
      <S.FaqAnswer $isExpanded={isExpanded}>
        <S.AnswerContent>
          <hr />
          <S.AnswerText>{item.answer}</S.AnswerText>
        </S.AnswerContent>
      </S.FaqAnswer>
    </S.FaqItem>
  );
};

/**
 * FAQ 컴포넌트
 * @returns {JSX.Element}
 */
export default function Faq() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const setIsNav = useLayoutStore((state) => state.setIsNav);

  useEffect(() => {
    setIsNav(false);
    return () => {
      setIsNav(true);
    };
  }, [setIsNav]);

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <S.Container>
      <NavBar title="축제 FAQ" isBack={true} />
      <S.FaqList>
        {faqData.map((item) => (
          <FaqAccordionItem
            key={item.id}
            item={item}
            isExpanded={expandedItems.has(item.id)}
            onToggle={() => toggleExpanded(item.id)}
          />
        ))}
      </S.FaqList>
    </S.Container>
  );
}
