export type DisplayMode = "list" | "grid";
export type SortMode = "alphabetical" | "reverse-alphabetical";

type ToolbarAction =
  | "toggleDisplayMode"
  | "toggleSortMode"
  | "toggleAvatarFilter";

type ToolbarActionValue = {
  toggleDisplayMode: DisplayMode;
  toggleSortMode: SortMode;
  toggleAvatarFilter: boolean;
};

type ToolbarItem<T extends ToolbarAction> = ToolbarActionValue[T];

export type Toolbar = Record<ToolbarAction, ToolbarItem<ToolbarAction>>;
