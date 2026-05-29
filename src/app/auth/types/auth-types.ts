export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUserRole {
  id: number;
  name: string;
  type: string;
}

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: IUserRole;
  universityName?: string;
}
