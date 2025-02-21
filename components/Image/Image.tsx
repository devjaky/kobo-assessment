import { type ImageName, Images } from "@/constants/Images";
import type { ComponentProps } from "react";
import { Image as NativeImage } from "react-native";

interface Props
  extends Pick<
    ComponentProps<typeof NativeImage>,
    "accessibilityLabel" | "style" | "source"
  > {
  name?: ImageName;
  height?: number;
  width?: number;
}

// Create our own image
const Image = ({
  accessibilityLabel,
  style,
  source,
  name,
  height = 30,
  width = 30,
}: Props) => {
  const imageSource =
    name && name in Images ? Images[name as ImageName] : source;
  return (
    <NativeImage
      accessible
      style={[style, { width, height }]}
      source={imageSource}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default Image;
