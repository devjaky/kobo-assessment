import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type {
  UserProfile,
  UserProfileDisplayMode,
} from "../../types/user-profile";
import Image from "../Image";

interface Props {
  item: UserProfile;
  displayMode?: UserProfileDisplayMode;
}

const UserProfileItem = ({ item, displayMode = "list" }: Props) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    avatar,
    backgroundColor,
  } = item;

  const ProfileContent = useMemo(() => {
    if (displayMode === "grid") {
      return (
        <View
          style={[
            styles.gridContainer,
            { backgroundColor: backgroundColor || undefined },
          ]}
        >
          {avatar && (
            <Image
              accessibilityLabel="avatar"
              width={100}
              height={100}
              source={{ uri: avatar }}
            />
          )}
          <View style={styles.gridInfo}>
            <Text>
              {firstName} {lastName}
            </Text>
            <Text>{email}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.listContainer}>
        {avatar && (
          <Image
            accessibilityLabel="avatar"
            width={100}
            height={100}
            source={{ uri: avatar }}
          />
        )}
        <View style={styles.listInfo}>
          <Text>
            {firstName} {lastName}
          </Text>
          <Text>{email}</Text>
        </View>
      </View>
    );
  }, [displayMode, backgroundColor, avatar, firstName, lastName, email]);

  return <View style={styles.container}>{ProfileContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  gridContainer: {
    padding: 10,
    gap: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  gridInfo: {
    flex: 1,
    gap: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
  },
  listInfo: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

// Memoize to prevent unnecessary re-renders
export default React.memo(UserProfileItem);
