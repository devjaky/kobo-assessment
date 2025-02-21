import { UserProfile } from "@/types/user-profile";
import UserProfileItem from "@/components/UserProfileItem";
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import Toolbar from "@/components/Toolbar";
import type { DisplayMode, SortMode, ToolbarAction } from "@/types/toolbar";
import { sortByLastName } from "@/utils/sort";
import { useUserProfiles } from "@/hooks/useUserProfiles";

const USE_LOCAL_DATA = true; // Determines where data is sourced from local or api
const USER_PROFILE_LIST = require("../assets/MOCK_DATA.json");

const Question1 = () => {
  const { profiles } = useUserProfiles();
  const [displayMode, setDisplayMode] = useState<DisplayMode>("list");
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");
  const [filterLargeAvatars, setFilterLargeAvatars] = useState(false);

  const numColumns = displayMode === "list" ? 1 : 2;

  const profileList = useMemo(() => {
    const profilesToUse: UserProfile[] = USE_LOCAL_DATA
      ? USER_PROFILE_LIST
      : profiles;

    let filteredProfiles = profilesToUse;

    if (filterLargeAvatars) {
      filteredProfiles = profilesToUse.filter(
        (profile) => profile.avatar_large === null // Null check was requested by spec- prefer Boolean cast or string validation
      );
    }

    // Handle sorting
    const sortedProfiles = [...filteredProfiles].sort(sortByLastName(sortMode));

    return sortedProfiles;
  }, [profiles, filterLargeAvatars, sortMode]);

  const handleToolbarItemPress = useCallback(
    (item: ToolbarAction) => {
      switch (item) {
        case "toggleDisplayMode":
          return setDisplayMode(displayMode === "list" ? "grid" : "list");
        case "toggleSortMode":
          return setSortMode(
            sortMode === "alphabetical"
              ? "reverse-alphabetical"
              : "alphabetical"
          );
        case "toggleAvatarFilter":
          return setFilterLargeAvatars(!filterLargeAvatars);
      }
    },
    [
      displayMode,
      sortMode,
      filterLargeAvatars,
      setDisplayMode,
      setSortMode,
      setFilterLargeAvatars,
    ]
  );

  const renderItem = useCallback<ListRenderItem<UserProfile>>(
    ({ item }) => {
      return (
        <TouchableOpacity
          style={[
            styles.container,
            item.backgroundColor
              ? { backgroundColor: item.backgroundColor }
              : undefined,
          ]}
          onPress={() => {}}
        >
          <UserProfileItem item={item} displayMode={displayMode} />
        </TouchableOpacity>
      );
    },
    [displayMode]
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Toolbar
          title="User List"
          displayMode={displayMode}
          sortMode={sortMode}
          onButtonPress={handleToolbarItemPress}
        />
        <FlatList
          // displayMode key forces the list to re-render when the value of numColumns changes
          key={displayMode}
          numColumns={numColumns}
          contentContainerStyle={styles.userProfileListContainer}
          extraData={sortMode}
          data={profileList}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  userProfileListContainer: {
    justifyContent: "center",
  },
});

export default Question1;
