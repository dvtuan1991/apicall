import { Col, Pagination, Row } from 'antd';
import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import {  getUserTable } from '../../store/UserSlice';
import UsersTable from './UsersTable';

const UserList = () => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const dispatch: Dispatch<any> = useDispatch();
  const {userlisttable, total, isLoading} = useSelector((state: RootState) => state.users)

  const onClickPagination = (page: number) => {
    setPageIndex(page)
  }

  useEffect(() => {
    const pageSize = 5
    dispatch(getUserTable({ pageIndex, pageSize }))
  }, [dispatch, pageIndex])
  return (
    <Row justify='center'>
      {!isLoading &&
      <Col span={18} >
        <div>
          <Link to='/'>
            Add new
          </Link>
        </div>
        {userlisttable.length &&
          <>
            <UsersTable data={userlisttable} num={0} />
            <Pagination total={total} current={pageIndex} onChange={onClickPagination} pageSize={5} showSizeChanger={false} />
          </>
        }
      </Col>}
    </Row>
  )
}

export default UserList