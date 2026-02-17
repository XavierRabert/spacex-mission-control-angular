import { BorderSize, CornerStyle, DecorationConfig } from './types';

export const CORNER_DECORATIONS: Record<string, DecorationConfig[]> = {
  [CornerStyle.TOP_RIGHT]: [
    { positions: ['top-0', 'right-0'], borders: ['border-t-2', 'border-r-2'] },
  ],
  [CornerStyle.ALL]: [
    { positions: ['top-0', 'right-0'], borders: ['border-t-2', 'border-r-2'] },
    { positions: ['top-0', 'left-0'], borders: ['border-t-2', 'border-l-2'] },
    { positions: ['bottom-0', 'left-0'], borders: ['border-b-2', 'border-l-2'] },
    { positions: ['bottom-0', 'right-0'], borders: ['border-b-2', 'border-r-2'] },
  ],
};

export const CLIP_PATHS: Record<CornerStyle, (size: number) => string> = {
  [CornerStyle.TOP_RIGHT]: (s) =>
    `polygon(0 0, calc(100% - ${s}px) 0, 100% ${s}px, 100% 100%, 0 100%)`,
  [CornerStyle.ALL]: (s) =>
    `polygon(0 0, calc(100% - ${s}px) 0, 100% ${s}px, 100% 100%, ${s}px 100%, 0 calc(100% - ${s}px))`,
  [CornerStyle.TOP_BOTTOM]: (s) =>
    `polygon(0 0, calc(100% - ${s}px) 0, 100% ${s}px, 100% 100%, ${s}px 100%, 0 calc(100% - ${s}px))`,
  [CornerStyle.NONE]: () => 'none',
};

export const SIZES: Record<BorderSize, number> = { xs: 12, sm: 8, md: 15, lg: 25 };
