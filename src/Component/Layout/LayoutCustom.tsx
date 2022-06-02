import { Col, Menu, Row, Spin } from 'antd';
import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getPostList } from '../../store/PostSlice';
import { getUserList } from '../../store/UserSlice';

const LayoutCustom: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const { userlist, isHas, isLoading } = useSelector((state: RootState) => state.users);
  const { postTotalList, isLoadingpost, isPostListHas } = useSelector((state: RootState) => state.posts);
  
  const menu = [
    {
      label: <Link to={'/'} >Home</Link>, key: 'home',
    },
    {
      label: <Link to={'/users'} >Users</Link>, key: 'users',
    }, {
      label: <Link to={'/posts'} >Posts</Link>, key: 'posts',
    },
  ]
  useEffect(() => {
    if (localStorage.getItem('userList') === null) {
      dispatch(getUserList())
    }
    if (localStorage.getItem('postList') === null) {
      dispatch(getPostList())
    }
  }, [dispatch])

  useEffect(() => {
    if (isHas && userlist.length > 0) {
      localStorage.setItem('userList', JSON.stringify(userlist))
    }
    if (postTotalList.length > 0) {
      localStorage.setItem('postList', JSON.stringify(postTotalList))
    }
  }, [isHas, isPostListHas])
  return (
    <>
      {localStorage.getItem('userList') !== null
        && localStorage.getItem('postList') !== null &&
        <Row justify='center' >
          <Col span={4} style={{backgroundColor: '#1890ff80'}}>
            <div className='relative'>
              <Menu items={menu} className='sidebar-menu' />
            </div>
          </Col>
          <Col span={20}>
            <main style={{ marginTop: 32 }}>
              <Spin spinning={isLoading || isLoadingpost} >
                {children}
              </Spin>
            </main>
          </Col>
        </Row>
      }
    </>
  )
}

export default LayoutCustom