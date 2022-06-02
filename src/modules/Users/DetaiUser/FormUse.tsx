
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import _ from "lodash";
import { IUser } from '../../../types/User';
import { useDispatch } from 'react-redux';
import { addNewUser, updateUser } from '../../../store/UserSlice';
import { defaultValidateMessages } from '../../../ultis/common';
import { openNotification } from '../../../ultis/function';

interface UserForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
  website: string
  companyName: string
  catchPhrase: string;
  bs: string
}
const { Title } = Typography;

const FormUser: React.FC<{ user?: IUser, isCreate?: boolean }> = ({ user, isCreate }) => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleclickEdit = () => {
    !isCreate && setIsEdit(true);
  }

  const handleClickCancel = () => {
    !isCreate && setIsEdit(false)
    form.setFieldsValue(initialValues)
  }
  const handleClickForm = async (value: UserForm) => {
    if (isCreate) {
      const userCreate: IUser = {
        id: Date.now(),
        username: value.username,
        name: value.name,
        email: value.email,
        phone: value.email,
        address: {
          street: value.street,
          suite: value.suite,
          city: value.city,
          zipcode: value.zipcode,
          geo: {
            lat: value.lat,
            lng: value.lng,
          }
        },

        website: value.website,
        company: {
          name: value.companyName,
          catchPhrase: value.catchPhrase,
          bs: value.bs
        }
      };
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(userCreate),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      if (response.ok) {
        dispach(addNewUser(userCreate))
        openNotification('success', 'Creat New User Success')
        navigate('/users')
      } else {
        openNotification('error', 'Some thing wrong, try again later');
        navigate('/users')
      }
    } else if (user) {
      const isEqual = _.isEqual(value, initialValues);
      if (isEqual) {
        openNotification('info', 'Creat New User Success');
        navigate('/users')
      } else {
        const userUpdate: IUser = {
          id: user.id,
          username: value.username,
          name: value.name,
          email: value.email,
          phone: value.email,
          address: {
            street: value.street,
            suite: value.suite,
            city: value.city,
            zipcode: value.zipcode,
            geo: {
              lat: value.lat,
              lng: value.lng,
            }
          },
          website: value.website,
          company: {
            name: value.companyName,
            catchPhrase: value.catchPhrase,
            bs: value.bs
          }
        }
        dispach(updateUser(userUpdate))
        openNotification('success', 'Update User Success')
        navigate('/users')
      }
    };
  };

  const initialValues = useMemo(() => {
    if (user && !isCreate) {
      return {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
        website: user.website,
        companyName: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs
      };
    }
    return {
      name: "",
      username: "",
      email: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      website: "",
      companyName: "",
      catchPhrase: "",
      bs: ""
    };
  }, [user, isCreate]);

  useEffect(() => {
    isCreate && setIsEdit(true)
  }, [isCreate])
  return (
    <div className='main-form'>
      {isCreate
        ? <Title level={3} className='text-center'>Create New User</Title>
        : <Title level={3} className='text-center'>User Information</Title>
      }
      <Space >
        <Button danger>
          <Link to={'/users'}>
            <ArrowLeftOutlined />
          </Link>
        </Button>
        <Button onClick={handleclickEdit} style={{ display: isEdit ? 'none' : 'block' }} >
          Edit
        </Button>
      </Space>
      {initialValues &&
        <Form
          name="user"
          layout='vertical'
          form={form}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          onFinish={handleClickForm}
          validateMessages={defaultValidateMessages}
        >
          <Row gutter={15} >
            <Col span={12}>
              <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, max: 24 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='username'
                label='Username'
                rules={[{ required: true, max: 15 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='website'
                label='Website'
                rules={[{ required: true, max: 20 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='phone'
                label='Phone'
                rules={[{ required: true, max: 50 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='catchPhrase'
                label='CatchPhrase'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='bs'
                label=' Bs'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='street'
                label='Street'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='suite'
                label='Suite'
                rules={[{ required: true, max: 20 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='city'
                label='City'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='zipcode'
                label='Zipcode'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='lat'
                label='Lat'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='lng'
                label='Lng'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>
              <Form.Item
                name='companyName'
                label=' Company Name'
                rules={[{ required: true, max: 40 }]}
              >
                <Input disabled={!isEdit} bordered={isEdit} />
              </Form.Item>

            </Col>
          </Row>
          <Form.Item style={{ display: isEdit ? 'block' : 'none' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleClickCancel} type='primary' danger style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form >
      }
    </div >
  )
}

export default FormUser