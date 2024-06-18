export type User = {
  username: string;
}

export type UserRequest = {
  password: string
} & User;
