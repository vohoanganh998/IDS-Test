import { User } from "../types/User";

export type PARAMS_GET_ALL = {
  limit?: number;
  page?: number;
  id?: string;
  role?: "admin" | "manager";
  username?: string;
};

export type MOCK_RES_GET = {
  status: number;
  data: User[];
};

export type MOCK_RES_MUTATION = {
  status: number;
  data: User;
};

export type MOCK_RES_DELETE = {
  status: number;
  data: { id: string };
};
