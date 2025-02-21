import React from "react";
import { render, screen } from "@testing-library/react-native";
import UserProfileItem from "./UserProfileItem";
import type { UserProfile } from "../../types/user-profile";

const userProfile: UserProfile = {
  id: "acf93571-a02c-4c26-8bef-ca245c2a48e4",
  first_name: "Kassey",
  last_name: "Janicijevic",
  text: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  email: "kjanicijevic0@mozilla.org",
  backgroundColor: "#fa3bb6",
  avatar: "https://robohash.org/providenttotamrerum.png?size=200x200&set=set1",
  avatar_large:
    "https://robohash.org/quidemautut.jpg?size=3840x2160&set=set1&bgset=bg1",
};

describe("UserProfileItem", () => {
  test("renders user details in list display mode", () => {
    render(<UserProfileItem item={userProfile} />);

    expect(screen.getByRole("image", { name: "avatar" })).toBeOnTheScreen();
    expect(screen.getByText(/Kassey/)).toBeOnTheScreen();
    expect(screen.getByText(/Janicijevic/)).toBeOnTheScreen();
    expect(screen.getByText("kjanicijevic0@mozilla.org")).toBeOnTheScreen();
  });

  test("renders user details in grid display mode", () => {
    render(<UserProfileItem item={userProfile} displayMode="grid" />);

    expect(screen.getByRole("image", { name: "avatar" })).toBeOnTheScreen();
    expect(screen.getByText(/Kassey/)).toBeOnTheScreen();
    expect(screen.getByText(/Janicijevic/)).toBeOnTheScreen();
    expect(screen.getByText("kjanicijevic0@mozilla.org")).toBeOnTheScreen();
  });

  test("does not render avatar if missing", () => {
    render(<UserProfileItem item={{ ...userProfile, avatar: null }} />);

    expect(
      screen.queryByRole("image", { name: "avatar" })
    ).not.toBeOnTheScreen();
  });
});
