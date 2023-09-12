import { User } from "../types/User";
import apiFactory from "./model";
import { PARAMS_GET_ALL } from "./type";

export const getUsers = async (parmas: PARAMS_GET_ALL): Promise<User[]> => {
  try {
    const res = await apiFactory.user.getListUsers(parmas);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data: User): Promise<User> => {
  try {
    const res = await apiFactory.user.addNewUser(data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (data: User): Promise<User> => {
  try {
    const res = await apiFactory.user.editAUser(data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<{ id: string }> => {
  try {
    const res = await apiFactory.user.deleteAUser(id);
    return res.data;
  } catch (error) {
    throw error;
  }
};
