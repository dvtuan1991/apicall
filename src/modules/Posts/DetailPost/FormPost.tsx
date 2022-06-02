import React, { useEffect, useMemo, useState } from 'react'
import { Button, Form, Input, InputNumber,  Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IPost } from '../../../types/Post'
import { Link, useNavigate } from 'react-router-dom';
import { defaultValidateMessages } from '../../../ultis/common';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { addNewPost, updatePost } from '../../../store/PostSlice';
import { openNotification } from '../../../ultis/function';

interface IPostForm {
  title: string;
  body: string;
  userId?: number
}

const { Title } = Typography;

const FormPost: React.FC<{ post?: IPost, isCreate?: boolean }> = ({ post, isCreate }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispach: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const handleClickEdit =  () => {
    !isCreate && setIsEdit(true)
  }

  const handleClickCancel = () => {
    !isCreate && setIsEdit(false)
    form.setFieldsValue(initPostFormValue);
  }
  const handleClickFinish = async (value: IPostForm) => {
    if(post) {
      const isEqual = _.isEqual(value, initPostFormValue);
      if(isEqual) {
        openNotification('info', 'No thing change')
        navigate('/posts');
      } else {
        const postUpdate: IPost = {
          id: post.id,
          title: value.title,
          body: value.body,
          userId: value.userId
        };
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(postUpdate),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        if(response.ok) {
          dispach(updatePost(postUpdate))
          openNotification('success', 'Update sucess')
          navigate('/posts');
        }
      } 
    } else if (isCreate) {
      const newUser = { ...value, id: Date.now()}
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`,{
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newUser)
      });
      console.log(response)
      if(response.ok) {
        dispach(addNewPost(newUser));
        openNotification('success', 'Create Success')
        navigate('/posts');
      }
    };
  };
  const initPostFormValue: IPostForm = useMemo(() => {
    if (post && !isCreate) {
      return {
        title: post.title,
        body: post.body,
        userId: post.userId
      }
    } else {
      return {
        title: '',
        body: '',
      }
    }
  }, [isCreate, post])

  useEffect(() => {
    isCreate && setIsEdit(true)
  }, [isCreate]);

  return (
    <div className='main-form'>
      {isCreate
        ? <Title level={3} className='text-center'>Create New Post</Title>
        : <Title level={3} className='text-center'>Post Information</Title>
      }
      <Space >
        <Button danger>
          <Link to={'/posts'}>
            <ArrowLeftOutlined />
          </Link>
        </Button>
        <Button onClick={handleClickEdit} style={{ display: isEdit ? 'none' : 'block' }} >
          Edit
        </Button>
      </Space>
      <Form
        name="user"
        form={form}
        wrapperCol={{ span: 20 }}
        initialValues={initPostFormValue}
        onFinish={handleClickFinish}
        validateMessages={defaultValidateMessages}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true }]}
        >
          <Input disabled={!isEdit} bordered={isEdit} />
        </Form.Item>
        <Form.Item
          label='Body'
          name='body'
          rules={[{ required: true, min: 25 }]}
        >
          <Input disabled={!isEdit} bordered={isEdit} />
        </Form.Item>
        <Form.Item 
        label='User Id'
         name='userId'
         rules={[{required: true, type: 'number', min: 1, max: 100}]}
         >
          <InputNumber disabled={!isCreate} bordered={isCreate} />
        </Form.Item>
        <Form.Item style={{ display: isEdit ? 'block' : 'none' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleClickCancel} type='primary' danger style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormPost