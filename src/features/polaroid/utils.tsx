import { FRAMES, FRAME_DIMENSIONS } from './constants';
import {
  FrameCategory,
  FrameKey,
  BasicFrameKey,
  SpecialFrameKey,
  FrameData,
  PolaroidDimensions,
} from './types';

/**
 * 현재 선택된 프레임 정보를 가져오는 함수
 */
export function getCurrentFrame(frameCategory: FrameCategory, frameKey: FrameKey): FrameData {
  if (frameCategory === 'basic') {
    const basicFrame = FRAMES.basic[frameKey as BasicFrameKey];
    return basicFrame || FRAMES.basic.black;
  } else {
    const specialFrame = FRAMES.special[frameKey as SpecialFrameKey];
    return specialFrame || FRAMES.special.day1;
  }
}

/**
 * 미리보기 크기를 계산하는 함수
 */
export function calculatePreviewSize(
  containerWidth: number,
  containerHeight: number,
): PolaroidDimensions {
  const maxPreviewHeight = Math.min(containerHeight * 0.7, window.innerHeight * 0.5);
  const widthBasedPreview = Math.min(360, Math.floor(containerWidth * 0.8));
  const widthBasedHeight = Math.round(
    (widthBasedPreview * FRAME_DIMENSIONS.height) / FRAME_DIMENSIONS.width,
  );

  // 높이가 제한을 초과하면 높이 기준으로 다시 계산
  const previewWidth =
    widthBasedHeight > maxPreviewHeight
      ? Math.round((maxPreviewHeight * FRAME_DIMENSIONS.width) / FRAME_DIMENSIONS.height)
      : widthBasedPreview;
  const previewHeight = Math.round(
    (previewWidth * FRAME_DIMENSIONS.height) / FRAME_DIMENSIONS.width,
  );

  return { width: previewWidth, height: previewHeight };
}

/**
 * 캔버스에 폴라로이드 이미지를 그리는 함수
 */
export async function drawPolaroidOnCanvas(
  canvas: HTMLCanvasElement,
  photoUrl: string,
  frameData: FrameData,
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // 캔버스 크기 설정 (원본 프레임 크기)
  canvas.width = FRAME_DIMENSIONS.width;
  canvas.height = FRAME_DIMENSIONS.height;

  // 1. Draw white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  try {
    // 사용자 사진 로드
    const userImg = new Image();
    await new Promise<void>((resolve, reject) => {
      userImg.onload = () => resolve();
      userImg.onerror = reject;
      userImg.crossOrigin = 'anonymous';
      userImg.src = photoUrl;
    });

    // 2. Draw user's image onto the inner area (90,90,900,1280) with cover effect
    const targetX = 90;
    const targetY = 90;
    const targetWidth = 900;
    const targetHeight = 1280;

    // Calculate source image dimensions for "cover" effect
    const sourceAspectRatio = userImg.width / userImg.height;
    const targetAspectRatio = targetWidth / targetHeight;

    let sx = 0;
    let sy = 0;
    let sWidth = userImg.width;
    let sHeight = userImg.height;

    if (sourceAspectRatio > targetAspectRatio) {
      // Image is wider than target, crop horizontally
      sHeight = userImg.height;
      sWidth = sHeight * targetAspectRatio;
      sx = (userImg.width - sWidth) / 2;
      sy = 0;
    } else {
      // Image is taller or same aspect ratio, crop vertically
      sWidth = userImg.width;
      sHeight = sWidth / targetAspectRatio;
      sy = (userImg.height - sHeight) / 2;
      sx = 0;
    }

    ctx.drawImage(userImg, sx, sy, sWidth, sHeight, targetX, targetY, targetWidth, targetHeight);

    // 프레임 이미지 로드 및 그리기 (위에 덮어씌우기)
    const frameImg = new Image();
    await new Promise<void>((resolve, reject) => {
      frameImg.onload = () => resolve();
      frameImg.onerror = reject;
      frameImg.crossOrigin = 'anonymous';
      frameImg.src = frameData.frame;
    });

    ctx.drawImage(frameImg, 0, 0, FRAME_DIMENSIONS.width, FRAME_DIMENSIONS.height);
  } catch (error) {
    console.error('Failed to draw polaroid on canvas:', error);
    throw error;
  }
}

/**
 * 캔버스 데이터를 다운로드하는 함수
 */
export function downloadCanvasAsImage(canvas: HTMLCanvasElement, filename?: string): void {
  const data = canvas.toDataURL('image/jpeg', 0.95);
  const a = document.createElement('a');
  a.href = data;
  a.download = filename || `polaroid-${Date.now()}.jpg`;
  a.click();
}
