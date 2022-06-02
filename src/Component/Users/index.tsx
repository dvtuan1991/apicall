import { Button, Col, Pagination, Row } from 'antd';
import React, { Dispatch, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getUserTable } from '../../store/UserSlice';
import UsersTable from './UsersTable';

const UserList = () => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const dispatch: Dispatch<any> = useDispatch();
  const { userlisttable, total, isLoading } = useSelector((state: RootState) => state.users)

  const onClickPagination = (page: number) => {
    setPageIndex(page)
  }

  const getData = useCallback((pageIndex: number) => {
    const pageSize = 5
    dispatch(getUserTable({ pageIndex, pageSize }))
  }, [ dispatch])

  useEffect(() => {
    getData(pageIndex)
  }, [getData, total, pageIndex])
  return (
    <Row justify='center'>
      {!isLoading &&
        <Col span={20} >
          <Button type='primary'>
            <Link to='/users/create'>
              Add new
            </Link>
          </Button>
          {userlisttable.length > 0 && userlisttable !== [] &&
            <>
              <UsersTable data={userlisttable}  />
              <Pagination total={total} current={pageIndex} onChange={onClickPagination} pageSize={5} showSizeChanger={false} />
            </>
          }
        </Col>}
    </Row>
  )
}

export default UserList