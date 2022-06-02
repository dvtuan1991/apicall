import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton: React.FC<{pathName: string, text: string, className?: string}> = ({pathName, text, className}) => {
  return (
    <Link to={pathName} className={className}>
      {text}
    </Link>
  )
}

export default LinkButton