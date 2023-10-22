export enum UserRoles {
  admin = "admin",
  user = "user",
}

export interface User {
  user: {
    name: string;
    email: string;
    id: string;
    isActivated: boolean;
    role: UserRoles;
    token: string;
    phone: string;
  } | null;
}
