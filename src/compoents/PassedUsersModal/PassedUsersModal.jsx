import { Modal, Empty, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import service from "../../api/service";

import "./PassedUsersModal.scss";
import {
  CheckCircleFilled,
  CheckCircleTwoTone,
  CloseCircleFilled,
  CloseCircleTwoTone,
} from "@ant-design/icons";

const PassedUsersModal = ({ id, open, setOpen }) => {
  const [users, setUsers] = useState([]);
  const { getPassedUsers } = service();

  useEffect(() => {
    getPassedUsers(id).then((res) => {
      setUsers(res.data);
    });
  }, [id]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Modal
      title="Список пользователей, прошедших тест"
      open={open}
      onCancel={() => setOpen(false)}
    >
      <div className="passed">
        {!users.length ? (
          <Empty />
        ) : (
          <ul className="passed__list">
            {users.map((user) => (
              <>
                <li className="passed__list-item">
                  <span>{user.user.name}</span>

                  {user.validAnswer ? (
                    <img
                      width={20}
                      src="https://img.icons8.com/?size=100&id=98955&format=png&color=E28F39"
                      alt=""
                    />
                  ) : (
                    <img
                      width={20}
                      src="https://img.icons8.com/?size=100&id=95771&format=png&color=E23939"
                      alt=""
                    />
                  )}
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default PassedUsersModal;
