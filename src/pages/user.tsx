import ListUsers from "../components/user/ListUsers";
import AdvancedSearchForm from "../components/user/AdvancedSearchForm";
import ModalActionUser from "../components/user/ModalActionUser";
import { Button } from "antd";
import UseModal from "../core/hooks/useModal";
import { getUsers } from "../services/user.service";
import { useQuery as UseQuery } from "react-query";
import { User } from "../types/User";
import { useState as UseState } from "react";
import ModalConfirm from "../components/user/ModalConfirm";
import { PARAMS_GET_ALL } from "../services/type";
import { useSearchParams as UseSearchParams } from "react-router-dom";

function user() {
  const modal = UseModal();
  const confirmModal = UseModal();
  const [queryPararms, setQueryPararms] = UseSearchParams();

  const [users, setUsers] = UseState<User[]>([]);

  const { isSuccess, isLoading, refetch } = UseQuery(
    "listUsers",
    () => {
      const params: any = { limit: 10, page: 1 };

      queryPararms.forEach((value, key) => {
        params[key] = value;
      });

      return getUsers({ ...params });
    },
    {
      onSuccess: (data: User[]): void => {
        setUsers(
          data.map((item: User, idx: number) => {
            item.key = idx + 1;
            return item;
          })
        );
      },
    }
  );

  return (
    <>
      {isSuccess && (
        <>
          <AdvancedSearchForm refreshTable={refetch} />
          <hr
            style={{ background: "whitesmoke", height: "1px", border: "none" }}
          />
          <Button
            type="primary"
            style={{ marginBottom: "5px" }}
            onClick={() => modal.show()}
          >
            Add new
          </Button>
          <ListUsers list={users} modal={modal} modalConfirm={confirmModal} />
          <ModalActionUser refreshTable={refetch} modal={modal} />
          <ModalConfirm refreshTable={refetch} modal={confirmModal} />
        </>
      )}
    </>
  );
}

export default user;
