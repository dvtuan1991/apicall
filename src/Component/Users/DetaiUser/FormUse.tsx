import { Dispatch } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../../types/User';

const FormUser: React.FC<{ user: IUser }> = ({ user }) => {
  const navigate = useNavigate()
  const [initFormValue, setInitFormValue] = useState<IUser>()
  // const [isCreate, setIsCreate] = useState<boolean>(false)
  const handleClickForm = (value: any) => {
    console.log(value)
  }
  useEffect(() => {
    if (!user) {
      navigate('/')
    } else {
      const initValue = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          }
        },
        website: user.website,
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs
        },
      }
      setInitFormValue(initValue)
    }
  }, [user])
  return (
    <>
      {initFormValue &&
        <Form
          name="user"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={initFormValue}
          onFinish={handleClickForm}
        >
          <Form.Item
            name='id'
            label='id'
            
          // rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
          >
            <Input bordered={false} disabled />
          </Form.Item>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='username'
            label='Username'
            rules={[{ required: true, message: 'Please input your Username!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='website'
            label='Website'
            rules={[{ required: true, message: 'Please input your Website!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='phone' label='Phone'>
            <Input />
          </Form.Item>
          <Form.Item label='address'>
            <Input.Group compact>
              <Form.Item
                name={['address', 'street']}
                label='street'
                rules={[{ required: true, message: 'street is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['address', 'suite']}
                label='suite'
                rules={[{ required: true, message: 'suite is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['address', 'city']}
                label='city'
                rules={[{ required: true, message: 'city is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['address', 'zipcode']}
                label='zipcode'
                rules={[{ required: true, message: 'zipcode is required' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label='geo'>
                <Input.Group compact>
                  <Form.Item
                    name={['address', 'geo', 'lat']}
                    rules={[{ required: true, message: 'street is required' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={['address', 'street', 'lng']}
                    rules={[{ required: true, message: 'street is required' }]}>
                    <Input />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label='company'>
            <Input.Group compact>
              <Form.Item
                name={['company', 'name']}
                label='Company name'
                rules={[{ required: true, message: 'name is required' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['company', 'catchPhrase']}
                label='Company CatchPhrase'
                rules={[{ required: true, message: 'catchPhrase is required' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['company', 'bs']}
                label='Company bs'
                rules={[{ required: true, message: 'bs is required' }]}>
                <Input />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
    </>
  )
}

export default FormUser