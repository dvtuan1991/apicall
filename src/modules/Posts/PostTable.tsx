import React from 'react'
import Table, { ColumnsType } from 'antd/lib/table'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { IPost } from '../../types/Post'
import { IUser } from '../../types/User'
import ActionButton from '../../component/Button/ActionButton'
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Tooltip } from 'antd';
import { setLimitTring } from '../../ultis/function';
import { deletePost } from '../../store/PostSlice';

const PostTable: React.FC<{ data: IPost[] }> = ({ data }) => {
  const navigate = useNavigate();
  const dispach: Dispatch<any> = useDispatch();
  const handleClickEdit = (id: number) => {
    navigate(`/posts/${id}`)
  }

  const handleClickDelete = (id: number) => {
    dispach(deletePost(id))
  }
  
  const colums: ColumnsType<IPost> = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      width: '40%',
      render: (text: string) => (
        <Tooltip title={text} placement='topLeft'>
          <span>{setLimitTring(text)}</span>
        </Tooltip>
      )
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
  ]
  return (
    <div>
      <Table dataSource={data} pagination={false} columns={colums} rowKey={record => record.id} />
    </div>
  )
}

export default PostTable

