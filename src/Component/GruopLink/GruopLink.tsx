import { Button, Col,  Row, Space } from 'antd';
import React, { useState } from 'react'
import {  UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { IPost } from '../../types/Post';
import LinkButton from '../Button/LinkButton';

interface IGroupLink {
  data: IPost[]
}

const GruopLink: React.FC<IGroupLink> = ({ data }) => {
  const [isShow, SetIsShow] = useState(false)
  const handleClickShow = () => {
    SetIsShow(!isShow)
  }
  return (
    <div >
      <Space >
        {isShow
          ? <Button onClick={handleClickShow} type={'primary'} size='large' shape='round' >
            <DownCircleOutlined />
            <span>Hidden</span>
          </Button>
          : <Button onClick={handleClickShow} type={'primary'} size='large' shape='round' >
            <UpCircleOutlined />
            <span>Show More</span>
          </Button>
        }
      </Space>
      <div className={isShow ? 'd-block' : 'd-none'}>
        <Row>
          {
            data.map(object =>
              <Col span={12} key={object.id}>
                <LinkButton pathName={`/posts/${object.id}`} text={object.title} classname='link-group' />
              </Col>
            )
          }
        </Row>
      </div>

    </div>
  )
}

export default GruopLink