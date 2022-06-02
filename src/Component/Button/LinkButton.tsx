import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton: React.FC<{pathName: string, text: string, classname?: string}> = ({pathName, text, classname}) => {
  return (
    <Link to={pathName} className={classname}>
      {text}
    </Link>
  )
}

export default LinkButton