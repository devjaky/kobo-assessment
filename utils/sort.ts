import { SortMode } from "@/types/toolbar";
import { UserProfile } from "@/types/user-profile";

export const sortByLastName =
  (sortMode: SortMode) => (a: UserProfile, b: UserProfile) => {
    const ascending = sortMode === "alphabetical";

    if (!a?.last_name && !b?.last_name) return 0; // Keep order if no name
    if (!a?.last_name) return ascending ? -1 : 1; // Null last name is assumed highest order when sort by ascending
    if (!b?.last_name) return ascending ? 1 : -1;

    // Sorts only based on last name
    // We can improve this by sorting first names when last names are identical
    // Wrap following code with a.last_name !== b.last_name and handle sort logic below
    return ascending
      ? a.last_name > b.last_name
        ? 1
        : -1
      : a.last_name < b.last_name
      ? 1
      : -1;
  };
