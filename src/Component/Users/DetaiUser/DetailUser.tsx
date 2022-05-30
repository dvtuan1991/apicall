import { Dispatch } from '@reduxjs/toolkit';
import { Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store';
import { getUserDetail } from '../../../store/UserSlice';
import { IUser } from '../../../types/User';
import FormUser from './FormUse';

const { Text, Title } = Typography;

const DetailUser = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { error, userdetail, isLoading } = useSelector((state: RootState) => state.users)
  const dispatch: Dispatch<any> = useDispatch();
  console.log(userdetail);

  useEffect(() => {
    id && dispatch(getUserDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    if (error) {
      navigate('/')
    }
  }, [error])
  return (
    <div>
      {/* {!isLoading && !error  && <FormUser user={userdetail} />} */}
      <Title level={3}>User Information</Title>
      <Row>
        <Col>
          <Text>{userdetail.name}</Text>
        </Col>
      </Row>

    </div>
    // <FormUser  />
  )
}

export default DetailUser