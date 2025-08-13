import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayoutStore } from '@/stores/useLayoutStore';

import * as S from '@/pages/polaroid/Polaroid.styles';
import {
  Step,
  FRAMES,
  SLIDE_TEXTS,
  getCurrentFrame,
  calculatePreviewSize,
  drawPolaroidOnCanvas,
  downloadCanvasAsImage,
  useDevelopAnimation,
  useFrameSelection,
  useOnboardingSlides,
  usePhotoCapture,
  useContainerSize,
} from '@/features/polaroid';

/**
 * 폴라로이드 촬영/현상 플로우
 * - 하단 네비게이션 숨김, 상단 커스텀 헤더
 * - 온보딩 -> 촬영 -> 프레임 선택 -> 현상(Interval) -> 저장
 * TODO: 자이로(움직임) 센서를 이용해 흔들기 시 현상되도록 기능 구현
 */
export default function Polaroid() {
  const navigate = useNavigate();
  const setIsNav = useLayoutStore((s) => s.setIsNav);

  // 전체 단계
  const [step, setStep] = useState<Step>('intro');

  // 커스텀 훅들
  const { slideIndex, scrollRef, onScroll, goNextSlide, goToSlide, setSlideIndex } =
    useOnboardingSlides();

  const { photoUrl, fileInputRef, handleShootClick, handleFileChange } = usePhotoCapture();

  const { frameCategory, frameKey, setFrameCategory, setFrameKey } = useFrameSelection();

  const { opacity, startDevelop, stopDevelop } = useDevelopAnimation();

  const { containerRef, containerWidth, containerHeight } = useContainerSize();

  // 캔버스 저장용 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 미리보기 크기 계산
  const { width: previewWidth, height: previewHeight } = useMemo(
    () => calculatePreviewSize(containerWidth, containerHeight),
    [containerWidth, containerHeight],
  );

  // 현재 선택된 프레임 정보
  const currentFrame = useMemo(
    () => getCurrentFrame(frameCategory, frameKey),
    [frameCategory, frameKey],
  );

  // 진입/이탈 시 하단 탭바 숨김/복원
  useEffect(() => {
    setIsNav(false);
    return () => setIsNav(true);
  }, [setIsNav]);

  // 상단 헤더 버튼 핸들러
  const handleBack = () => {
    if (step === 'frame') {
      setStep('intro');
      setSlideIndex(2);
      // 마지막 슬라이드로 스크롤 이동
      requestAnimationFrame(() => goToSlide(2));
      return;
    }
    if (step === 'develop') {
      stopDevelop();
      setStep('frame');
      return;
    }
    if (step === 'done') {
      setStep('frame');
      return;
    }
    // intro 단계에서는 뒤로가기 = 나가기와 동일하게 동작
    handleExit();
  };

  const handleExit = () => {
    navigate('/main');
    setIsNav(true);
  };

  // 프레임 선택 완료 -> 현상 시작
  const handleStartDevelop = () => {
    setStep('develop');
    startDevelop(() => setStep('done'));
  };

  // 촬영 완료 핸들러
  const handlePhotoSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleFileChange(e);
    if (e.target.files?.[0]) {
      setStep('frame');
    }
  };

  // 캔버스 저장
  const handleSave = async () => {
    if (!canvasRef.current || !photoUrl) return;

    try {
      await drawPolaroidOnCanvas(canvasRef.current, photoUrl, currentFrame);
      downloadCanvasAsImage(canvasRef.current);
    } catch (error) {
      console.error('Failed to save polaroid:', error);
    }
  };

  const headerTitle = useMemo(() => '폴라로이드', []);
  const isLastSlide = slideIndex === 2;

  return (
    <S.Container>
      {/* 상단 헤더 */}
      <S.Header>
        <S.HeaderButton aria-label="뒤로" onClick={handleBack}>
          {'<'}
        </S.HeaderButton>
        <S.HeaderTitle>{headerTitle}</S.HeaderTitle>
        <S.HeaderButton aria-label="나가기" onClick={handleExit}>
          ×
        </S.HeaderButton>
      </S.Header>

      {/* 본문 */}
      <S.Fullscreen role="main" ref={containerRef}>
        {step === 'intro' && (
          <>
            <S.SwipeWrap ref={scrollRef} onScroll={onScroll}>
              {[0, 1, 2].map((i) => (
                <S.Slide key={i}>
                  <S.PlaceholderImage>Image {i + 1}</S.PlaceholderImage>
                  <S.SlideText>{SLIDE_TEXTS[i]}</S.SlideText>
                </S.Slide>
              ))}
            </S.SwipeWrap>
            <S.Dots>
              {[0, 1, 2].map((i) => (
                <S.Dot key={i} $active={i === slideIndex} />
              ))}
            </S.Dots>
            <S.PrimaryButton onClick={isLastSlide ? handleShootClick : goNextSlide}>
              {isLastSlide ? '촬영하기' : '다음으로'}
            </S.PrimaryButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handlePhotoSelected}
            />
          </>
        )}

        {step === 'frame' && (
          <>
            <S.FramePreview>
              <div
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                  backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  zIndex: -1,
                }}
              >
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </S.FramePreview>

            {/* 카테고리 선택 */}
            <S.CategoryPicker>
              <S.CategoryTab
                $active={frameCategory === 'basic'}
                onClick={() => setFrameCategory('basic')}
              >
                기본 프레임
              </S.CategoryTab>
              <S.CategoryTab
                $active={frameCategory === 'special'}
                onClick={() => setFrameCategory('special')}
              >
                스페셜 프레임
              </S.CategoryTab>
            </S.CategoryPicker>

            {/* 프레임 선택 */}
            <S.FramePicker>
              {frameCategory === 'basic'
                ? Object.entries(FRAMES.basic).map(([key, frame]) => (
                    <S.FrameOption
                      key={key}
                      onClick={() => setFrameKey(key as keyof typeof FRAMES.basic)}
                      $selected={frameKey === key}
                    >
                      <img src={frame.thumb} alt={frame.name} />
                      <span>{frame.name}</span>
                    </S.FrameOption>
                  ))
                : Object.entries(FRAMES.special).map(([key, frame]) => (
                    <S.FrameOption
                      key={key}
                      onClick={() => setFrameKey(key as keyof typeof FRAMES.special)}
                      $selected={frameKey === key}
                    >
                      <img src={frame.thumb} alt={frame.name} />
                      <span>{frame.name}</span>
                    </S.FrameOption>
                  ))}
            </S.FramePicker>
            <S.PrimaryButton onClick={handleStartDevelop}>현상 시작</S.PrimaryButton>
          </>
        )}

        {step === 'develop' && (
          <>
            <S.FramePreview>
              <div
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                  backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  opacity: opacity,
                }}
              >
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </S.FramePreview>
            <S.SubtleText>현상 중... 10초 정도 소요됩니다</S.SubtleText>
          </>
        )}

        {step === 'done' && (
          <>
            <S.FramePreview>
              <div
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                  backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
              >
                <img
                  src={currentFrame.frame}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </S.FramePreview>
            <S.ButtonRow>
              <S.PrimaryButton onClick={handleSave}>저장하기</S.PrimaryButton>
              <S.SecondaryButton onClick={() => setStep('intro')}>다시하기</S.SecondaryButton>
            </S.ButtonRow>
            {/* 숨김 캔버스: 저장 시 사용 */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}
      </S.Fullscreen>
    </S.Container>
  );
}
