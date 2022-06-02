import { Button, Col, Row, Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Col span={12}>
      <Space >
        <Button type='primary' shape='round' size={'large'}>
          <Link to={'/users'}>
            Go To Users
          </Link>
        </Button>
        <Button type='primary' shape='round' size={'large'}>
          <Link to={'/posts'}>
            Go To Posts
          </Link>
        </Button>
      </Space>
    </Col>
  )
}

export default Home