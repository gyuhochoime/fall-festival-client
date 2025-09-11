// 이미지 지연 로딩을 위한 유틸리티 함수

export const lazyLoadImage = async (imageName: string): Promise<string | null> => {
  try {
    const module = await import(`@/assets/images/notice/${imageName}`);
    return module.default;
  } catch (error) {
    console.warn(`Failed to load image: ${imageName}`, error);
    return null;
  }
};

export const lazyLoadPerformanceImage = async (imageName: string): Promise<string | null> => {
  try {
    const module = await import(`@/assets/images/performance/${imageName}`);
    return module.default;
  } catch (error) {
    console.warn(`Failed to load image: ${imageName}`, error);
    return null;
  }
};

// 이미지 배치 로딩
export const batchLoadImages = async (imageNames: string[]): Promise<(string | null)[]> => {
  const promises = imageNames.map((name) => lazyLoadImage(name));
  return Promise.all(promises);
};
