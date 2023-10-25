export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  nickname?: string;
  avatar?: string;
  email?: string;
  id?: number;
}
