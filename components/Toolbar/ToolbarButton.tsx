import { type ImageName, Images } from "@/constants/Images";
import type { ToolbarAction } from "@/types/toolbar";
import type { ComponentProps } from "react";
import { Image as NativeImage, TouchableOpacity } from "react-native";

// Compensates for smaller image when grid image is reduced
// on the assumption that icon height is intended to change between "Grid" and "List" display modes
type HitSlop = ComponentProps<typeof TouchableOpacity>["hitSlop"];

interface Props
  extends Pick<ComponentProps<typeof NativeImage>, "height" | "width"> {
  action: ToolbarAction;
  image: ImageName;
  hitSlop?: HitSlop;
  onPress(toolbarAction: ToolbarAction): void;
}

const ToolbarButton = ({
  action,
  image,
  height = 30,
  width = 30,
  hitSlop,
  onPress,
}: Props) => {
  if (!(image in Images)) return null;
  return (
    <TouchableOpacity hitSlop={hitSlop} onPress={() => onPress(action)}>
      <NativeImage
        accessible
        accessibilityLabel={image}
        accessibilityRole="image"
        style={{ width, height }}
        source={Images[image as ImageName]}
      />
    </TouchableOpacity>
  );
};

export default ToolbarButton;
