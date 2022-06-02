
import { useDispatch } from "react-redux";
import {  Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IUser } from '../../types/User';
import ActionButton from '../Button/ActionButton';
import {  useNavigate } from "react-router-dom";
import { Dispatch } from '@reduxjs/toolkit';
import { deleteUser } from '../../store/UserSlice';

const UsersTable: React.FC<{ data: IUser[]}> = ({ data }) => {
  let navigate = useNavigate();
  const dispach: Dispatch<any> = useDispatch();
  
  const handleClickEdit = (id: number) => {
    navigate(`/users/${id}`)
  }

  const handleClickDelete = (id: number) => {
    dispach(deleteUser({id}))
  }
  const colums: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as 'center',
      render: (record: IUser) => (
        <div>
          <ActionButton title={<EditOutlined />} id={record.id} action={handleClickEdit} type='primary' />
          <ActionButton title={<DeleteOutlined />} id={record.id} action={handleClickDelete} type='danger' />
        </div>
      )
    }
  ];

  return (
    <div>
          <Table dataSource={data} pagination={false} columns={colums} rowKey={record => record.id} />
    </div>
  )
}

export default UsersTable