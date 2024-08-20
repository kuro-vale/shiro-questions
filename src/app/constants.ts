import {environment} from "../environments/environment";

export const Paths = {
  Home: "",
  Profile: "profile",
  Login: "login",
  Register: "register",
} as const;

export const Icons = {
  AppLogo: "app-logo",
  Search: "search",
  Close: "close",
  Menu: "menu",
  Add: "add",
  Login: "login",
  Register: "how_to_reg",
  Account: "account_circle"
} as const;

export const CategoriesIcons = {
  All: "apps",
  Technology: "smart_toy",
  Geography: "public",
  Food: "lunch_dining",
  Literature: "library_books",
  Animals: "pets",
  Science: "science",
  Music: "music_note",
  "General Knowledge": "lightbulb",
  History: "history_edu",
  Arts: "palette",
  Sports: "fitness_center",
  Entertainment: "sports_esports"
} as const;

export const CategoriesTranslations = {
  All: $localize`:@@cat_all_categories:All categories`,
  Technology: $localize`:@@cat_technology:Technology`,
  Geography: $localize`:@@cat_geography:Geography`,
  Food: $localize`:@@cat_food:Food`,
  Literature: $localize`:@@cat_literature:Literature`,
  Animals: $localize`:@@cat_animals:Animals`,
  Science: $localize`:@@cat_science:Science`,
  Music: $localize`:@@cat_music:Music`,
  "General Knowledge": $localize`:@@cat_general_knowledge:General Knowledge`,
  History: $localize`:@@cat_history:History`,
  Arts: $localize`:@@cat_arts:Arts`,
  Sports: $localize`:@@cat_sports:Sports`,
  Entertainment: $localize`:@@cat_entertainment:Entertainment`
};

export const StorageConstants = {
  Token: "auth_token",
} as const;

export const MetaConstants = {
  Description: "description"
} as const;

export const apiUrl = new URL(environment.apiUrl).origin;
