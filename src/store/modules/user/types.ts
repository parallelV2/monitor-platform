export type RoleType = '' | '*' | '0' | '1';
// 0: admin
// 1: user
export interface UserState {
  nickname?: string;
  avatar?: string;
  email?: string;
  role: RoleType;
  id?: number;
}
