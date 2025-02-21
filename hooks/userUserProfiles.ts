import { useEffect, useState } from "react";
import { UserProfile } from "@/types/user-profile";

// TODO: Write unit test

// Pagination can be achieved by changing PAGE to state
// It must be developed in conjunction with FlatList and onEndReached to handle page increment
const PAGE = 1;
const USER_PROFILES_API_URL = `https://gist.githubusercontent.com/dsandin/7b7cd2b834abd8c10908803cac5d1dd3/raw/9a8c0270e0f7a778409b2996419bacdbb06edc87/users_page${PAGE}`;

// I would integrate react-query to handle caching, rehydration, errors, etc.
export const userUserProfiles = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We can create universal API fetch function to handle server requests better
    const fetchUsers = async () => {
      try {
        const response = await fetch(USER_PROFILES_API_URL);
        if (!response.ok) throw new Error("Failed to fetch user profiles");
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { profiles, loading, error };
};
