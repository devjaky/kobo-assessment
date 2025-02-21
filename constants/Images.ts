export const Images = {
  Grid: require("../assets/images/grid.png"),
  List: require("../assets/images/list.png"),
  SortAZ: require("../assets/images/sort_az.png"),
  SortZA: require("../assets/images/sort_za.png"),
  Avatar: require("../assets/images/avatar.png"),
} as const;

export type ImageName = keyof typeof Images;

export type ImageButton = {
  name: ImageName;
  width?: number;
  height?: number;
};
