import { User } from "../../types/User";
import {
  MOCK_RES_DELETE,
  MOCK_RES_GET,
  MOCK_RES_MUTATION,
  PARAMS_GET_ALL,
} from "../type";

const data: User[] = [
  {
    id: "1",
    username: "Hoang Anh",
    password: "Test123!",
    role: "admin",
  },
  {
    id: "2",
    username: "Nguyễn Văn A",
    password: "Test123!",
    role: "manager",
  },
  {
    id: "3",
    username: "Nguyễn Văn B",
    password: "Test123!",
    role: "manager",
  },
  {
    id: "4",
    username: "Nguyễn Văn D",
    password: "Test123!",
    role: "admin",
  },
  {
    id: "5",
    username: "Nguyễn Văn E",
    password: "Test123!",
    role: "admin",
  },
];

export const getUsers = (params: PARAMS_GET_ALL) => {
  const paramSearch: any = { ...params };
  delete paramSearch.limit;
  delete paramSearch.page;

  const dataAfterSearch: User[] = [];

  data.forEach((item: any) => {
    let canGet = true;
    Object.keys(paramSearch).map((keyParams: string) => {
      if (
        !item[keyParams]
          .toLowerCase()
          .includes(paramSearch[keyParams].toLowerCase())
      )
        canGet = false;
    });
    if (canGet) dataAfterSearch.push(item);
  });

  return new Promise<MOCK_RES_GET>((resolve, reject) => {
    resolve({ status: 200, data: dataAfterSearch });
  });
};

export const addUser = (payload: User) => {
  return new Promise<MOCK_RES_MUTATION>((resolve, reject) => {
    if (data.findIndex((item: User) => item.id === payload.id) === -1) {
      data.unshift(payload);
      resolve({ status: 200, data: payload });
    } else reject({ status: 400, data: { mes: "Id cannot be duplicated!" } });
  });
};

export const editUser = (payload: User) => {
  return new Promise<MOCK_RES_MUTATION>((resolve, reject) => {
    const idxUser = data.findIndex((item: User) => item.id === payload.id);
    if (idxUser !== -1) {
      data[idxUser] = { ...payload };
      resolve({ status: 200, data: payload });
    } else reject({ status: 400, data: { mes: "User not found!" } });
  });
};

export const deleteUser = (id: string) => {
  return new Promise<MOCK_RES_DELETE>((resolve, reject) => {
    const idxUser = data.findIndex((item: User) => item.id === id);
    if (idxUser !== -1) {
      data.splice(idxUser, 1);
      resolve({ status: 200, data: { id } });
    } else reject({ status: 400, data: { mes: "User not found!" } });
  });
};
