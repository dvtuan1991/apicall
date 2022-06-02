import { Dispatch } from '@reduxjs/toolkit';
import {  Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store';
import { getPostsByUserId } from '../../../store/PostSlice';
import { getUserDetail } from '../../../store/UserSlice';
import GroupLink from '../../../component/GroupLink/GroupLink';
import FormUser from './FormUse';

const {  Title } = Typography;

const DetailUser = () => {
  let { id } = useParams();
  const navigate = useNavigate()
  const { error, userdetail, isLoading } = useSelector((state: RootState) => state.users);
  const { postByUserId } = useSelector((state: RootState) => state.posts)
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    console.log('getState')
    if (id) {
      dispatch(getUserDetail(id))
      dispatch(getPostsByUserId(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (error) {
      navigate('/404')
    }
  }, [error, navigate])

  return (
    <>
      {!isLoading && !error && Object.keys(userdetail).length &&
        <>
          <FormUser user={userdetail} />
          <div className='group-link'>
            <Title level={4}>{`${userdetail.username} has ${postByUserId.length} posts`}</Title>
            {postByUserId.length > 0 && <GroupLink data={postByUserId} />}
          </div>
        </>
      }
    </>
  )
}

export default DetailUser