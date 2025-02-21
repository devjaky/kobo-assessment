type StringValue = string | null;

export interface UserProfile {
  id: string;
  // Naming pattern inconsistent- snake vs camel
  // This type strictly follows the structure of the JSON data provided
  first_name: StringValue;
  last_name: StringValue;
  text: StringValue;
  email: StringValue;
  backgroundColor: StringValue;
  avatar: StringValue;
  avatar_large: StringValue;
}

export type UserProfileDisplayMode = "list" | "grid";
