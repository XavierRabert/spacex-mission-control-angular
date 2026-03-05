export enum FavoriteType {
  ROCKET = 'rocket',
  LAUNCH = 'launch',
}

export type Favorite = {
  type: FavoriteType;
  id: string;
};

export type Favorites = Favorite[];
