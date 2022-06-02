import { Row, Col, Button, Pagination } from 'antd'
import React, { Dispatch, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { RootState } from '../../store';
import { getPostListTable } from '../../store/PostSlice';
import PostTable from './PostTable';

const PostsList = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { postListTable, postsleng, isLoadingpost } = useSelector((state: RootState) => state.posts)
  const dispatch: Dispatch<any> = useDispatch();

  const onClickPagination = (page: number) => {
    setPageIndex(page)
  };

  const getData = useCallback((pageIndex: number) => {
    const pageSize = 5
    dispatch(getPostListTable({ pageIndex, pageSize }))
  }, [ dispatch])

  useEffect(() => {
    getData(pageIndex)
  }, [getData, postsleng, pageIndex])

  return (
    <Row justify='center'>
      {!isLoadingpost &&
        <Col span={24}>
          <Button type='primary'>
            <Link to='/posts/create'>
              Add new
            </Link>
          </Button>
          {postListTable.length > 0  &&
            <>
              <PostTable data={postListTable} />
              <Pagination total={postsleng} current={pageIndex} onChange={onClickPagination} pageSize={5} showSizeChanger={false} />
            </>
          }
        </Col>
      }
    </Row>
  )
}

export default PostsList


