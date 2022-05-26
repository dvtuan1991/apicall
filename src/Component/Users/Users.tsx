import React from 'react'
import { Table, Tag, Space, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { User } from '../../types/User';
const colums: ColumnsType<User> = [
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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, 
  {
    title: 'Action',
    key: 'action',
    render: () => <></>
  }
]
const Users = () => {
  
  return (
    <Row justify='center'>
      <Col span={12} >
        <div>
          <Table />
        </div>
        </Col>
    </Row>
  )
}

export default Users