import { getUsers, addUser, editUser, deleteUser } from "./../mockapi/index";
import {
  MOCK_RES_DELETE,
  MOCK_RES_GET,
  MOCK_RES_MUTATION,
  PARAMS_GET_ALL,
} from "../type";
import { User } from "../../types/User";

//If we are using API online I will make a baseModel. it's custom REST Api for asios
export default class userModel {
  //same as above so we will be result Promise<AxiosResponse>
  getListUsers(params: PARAMS_GET_ALL): Promise<MOCK_RES_GET> {
    return getUsers(params);
  }

  addNewUser(data: User): Promise<MOCK_RES_MUTATION> {
    return addUser(data);
  }

  editAUser(data: User): Promise<MOCK_RES_MUTATION> {
    return editUser(data);
  }

  deleteAUser(id: string): Promise<MOCK_RES_DELETE> {
    return deleteUser(id);
  }
}
