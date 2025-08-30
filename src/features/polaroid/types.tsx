export type Step = 'intro' | 'frame' | 'develop' | 'done';

export type FrameCategory = 'basic' | 'special';

export type BasicFrameKey = 'black' | 'pink' | 'sky' | 'white' | 'yellow';

export type SpecialFrameKey = 'day1' | 'day2' | 'day3' | 'black' | 'pink' | 'denim';

export type FrameKey = BasicFrameKey | SpecialFrameKey;

export interface FrameData {
  frame: string;
  thumb: string;
  name: string;
}

export interface FrameCollection {
  basic: Record<BasicFrameKey, FrameData>;
  special: Record<SpecialFrameKey, FrameData>;
}

export interface PolaroidDimensions {
  width: number;
  height: number;
}
