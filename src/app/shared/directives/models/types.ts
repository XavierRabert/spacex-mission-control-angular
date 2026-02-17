export enum CornerStyle {
  TOP_RIGHT = 'top-right',
  ALL = 'all',
  TOP_BOTTOM = 'top-bottom',
  NONE = 'none',
}

export type BorderSize = 'xs' | 'sm' | 'md' | 'lg';

export type DecorationConfig = {
  positions: string[];
  borders: string[];
};
