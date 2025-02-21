import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Toolbar from "./Toolbar";
import { ToolbarAction } from "@/types/toolbar";

describe("Toolbar", () => {
  test("renders toolbar", () => {
    render(<Toolbar title="Toolbar title" onButtonPress={jest.fn} />);

    expect(screen.getByText("Toolbar title")).toBeOnTheScreen();

    const toolbarItems = screen.getAllByRole("image");
    expect(toolbarItems).toHaveLength(3);
  });

  test("fires correct toolbar item action on press", () => {
    const mockPress = jest.fn();
    render(<Toolbar title="Toolbar title" onButtonPress={mockPress} />);

    const toolbarItems = screen.getAllByRole("image");
    expect(toolbarItems).toHaveLength(3);
    const [display, sort, avatar] = toolbarItems;

    expect(display).toHaveAccessibleName("Grid");
    fireEvent.press(display);
    expect(mockPress).toHaveBeenCalledWith(
      "toggleDisplayMode" as ToolbarAction
    );

    expect(sort).toHaveAccessibleName("SortZA");
    fireEvent.press(sort);
    expect(mockPress).toHaveBeenCalledWith("toggleSortMode" as ToolbarAction);

    expect(avatar).toHaveAccessibleName("Avatar");
    fireEvent.press(avatar);
    expect(mockPress).toHaveBeenCalledWith(
      "toggleAvatarFilter" as ToolbarAction
    );

    expect(mockPress).toHaveBeenCalledTimes(3);
  });
});
