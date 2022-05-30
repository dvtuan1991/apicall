import { Button } from 'antd';
import React, { ReactNode } from 'react';

const ActionButton: React.FC<{title: ReactNode, id: number, action: Function, type: string }> = ({title, id, action, type}) => {
  return (
    <Button onClick={(e) => action(id)} shape="circle" type={type as 'primary' | 'text'} >
      {title}
    </Button>
  )
}

export default ActionButton