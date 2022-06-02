import { Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../store';
import { getPostDetail } from '../../../store/PostSlice';
import FormPost from './FormPost';

const DetailPost = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { detailPost, isLoadingpost, error } = useSelector((state: RootState) => state.posts);
  console.log(isLoadingpost)
  const dispach: Dispatch<any> = useDispatch()

  useEffect(() => {
    id && dispach(getPostDetail(id));
  }, [id])

  useEffect(() => {
    error && navigate('/404');
  }, [error])
  return (
    <div>
      {Object.keys(detailPost).length > 0 && <FormPost post={detailPost} />}
    </div>
  )
}

export default DetailPost