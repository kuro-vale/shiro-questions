export type User = {
  username: string;
}

export type UserRequest = {
  password: string;
  rememberMe: boolean;
} & User;

export type UserAuth = {
  token: string;
} & User;
