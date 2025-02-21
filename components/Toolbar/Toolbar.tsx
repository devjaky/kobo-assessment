import { StyleSheet, Text, View } from "react-native";
import type { DisplayMode, SortMode, ToolbarAction } from "@/types/toolbar";
import ToolbarButton from "./ToolbarButton";
import { ImageName } from "@/constants/Images";

interface Props {
  title?: string;
  displayMode?: DisplayMode;
  sortMode?: SortMode;
  onButtonPress(toolbarAction: ToolbarAction): void;
}

const Toolbar = ({
  title,
  displayMode = "list",
  sortMode = "alphabetical",
  onButtonPress,
}: Props) => {
  const displayModeButtonProps =
    displayMode === "list"
      ? {
          image: "Grid" as ImageName,
          height: 10,
          hitSlop: 10,
        }
      : {
          image: "List" as ImageName,
          height: 30,
          hitSlop: undefined,
        };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.heading}>{title}</Text>}
      <View style={styles.itemContainer}>
        <ToolbarButton
          action="toggleDisplayMode"
          {...displayModeButtonProps}
          onPress={onButtonPress}
        />
        <ToolbarButton
          action="toggleSortMode"
          image={sortMode === "alphabetical" ? "SortZA" : "SortAZ"}
          onPress={onButtonPress}
        />
        <ToolbarButton
          action="toggleAvatarFilter"
          image="Avatar"
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Toolbar;
