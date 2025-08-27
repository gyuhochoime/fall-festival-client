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
  useShakeDevelop,
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

  // 흔들기 현상 훅
  const {
    shakeCount,
    maxShakes,
    progress,
    opacity: shakeOpacity,
    isShaking,
    permissionGranted,
    error: shakeError,
    startShakeDevelop,
    stopShakeDevelop,
    simulateShake,
  } = useShakeDevelop();

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
      stopShakeDevelop();
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
    console.log('🎬 Starting develop, permission granted:', permissionGranted);
    setStep('develop');

    // 흔들기 센서가 지원되는 경우에는 흔들기만 허용 (기본 애니메이션 사용 안함)
    if (window.DeviceMotionEvent) {
      // 권한이 있으면 바로 흔들기 시작, 없으면 권한 요청 UI 표시
      if (permissionGranted) {
        console.log('✅ Permission already granted, starting shake develop immediately');
        startShakeDevelop(() => setStep('done'));
      } else {
        console.log('❌ No permission yet, will show permission button');
      }
      // 권한이 없어도 기본 애니메이션은 시작하지 않음 (흔들기 우선)
    } else {
      // 데스크톱 등 가속도 센서가 없는 경우에만 기본 애니메이션 사용
      console.log('🖥️ No device motion support, using basic animation');
      startDevelop(() => setStep('done'));
    }
  };

  // 권한 요청 후 흔들기 시작 - 단순하게
  const handleRequestPermissionAndStart = async () => {
    console.log('🔔 Permission button clicked');
    await startShakeDevelop(() => {
      console.log('🎉 Shake develop completed!');
      setStep('done');
    });
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
              <S.PolaroidCard
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 (프레임 선택 시에는 항상 보임) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1,
                    zIndex: 1,
                  }}
                />
                {/* 프레임 */}
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
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
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
              <S.PolaroidCard
                $shaking={isShaking}
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f0f0f0', // 밝은 회색 초기값
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity:
                      window.DeviceMotionEvent && permissionGranted
                        ? shakeOpacity
                        : window.DeviceMotionEvent
                          ? 0
                          : opacity,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                  }}
                />
                {/* 프레임 (항상 보임) */}
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
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
            </S.FramePreview>

            {/* 흔들기 지원 && 권한 있음 */}
            {window.DeviceMotionEvent && permissionGranted && (
              <S.ShakeInstructions>
                <S.ShakeText>📱 폰을 흔들어서 사진을 현상하세요!</S.ShakeText>
                <S.ProgressBar>
                  <S.ProgressFill $width={progress * 100} />
                </S.ProgressBar>
                <S.ShakeCounter>
                  흔든 횟수: {shakeCount} / {maxShakes}
                </S.ShakeCounter>

                {/* 디버깅용 상태 표시 */}
                {/* 
                <div style={{
                  marginTop: '8px',
                  fontSize: '10px',
                  color: '#666',
                  textAlign: 'center',
                  fontFamily: 'monospace'
                }}>
                  <div>권한: {permissionGranted ? '✅' : '❌'}</div>
                  <div>진행률: {Math.round(progress * 100)}%</div>
                </div>
                */}

                {/* 데스크톱 테스트용 */}
                {!('ontouchstart' in window) && (
                  <button
                    onClick={simulateShake}
                    style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  >
                    데스크톱 테스트: 클릭으로 흔들기
                  </button>
                )}
              </S.ShakeInstructions>
            )}

            {/* 흔들기 지원 && 권한 없음 */}
            {window.DeviceMotionEvent && !permissionGranted && (
              <S.ShakeInstructions>
                <S.ShakeText>뽑을 준비 되셨나요?</S.ShakeText>
                <S.PermissionButton onClick={handleRequestPermissionAndStart}>
                  현상 시작!
                </S.PermissionButton>
                {shakeError && <S.ErrorMessage>{shakeError}</S.ErrorMessage>}
                <S.SubtleText>버튼을 누르면 가속도 센서 권한을 요청합니다</S.SubtleText>
              </S.ShakeInstructions>
            )}

            {/* 흔들기 지원하지 않는 경우만 기본 현상 */}
            {!window.DeviceMotionEvent && <S.SubtleText>현상 중... 흔들어 주세요!</S.SubtleText>}
          </>
        )}

        {step === 'done' && (
          <>
            <S.FramePreview>
              <S.PolaroidCard
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  position: 'relative',
                }}
              >
                {/* 배경 사진 (완성된 상태이므로 항상 보임) */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                    backgroundImage: photoUrl ? `url(${photoUrl})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1, // 완성된 상태
                    zIndex: 1,
                  }}
                />
                {/* 프레임 */}
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
                    zIndex: 2,
                  }}
                />
              </S.PolaroidCard>
            </S.FramePreview>

            {/* 흔들기로 현상했을 경우 축하 메시지 */}
            {window.DeviceMotionEvent && permissionGranted && shakeCount > 0 && (
              <S.SuccessMessage>멋진 폴라로이드가 완성되었어요!</S.SuccessMessage>
            )}

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
