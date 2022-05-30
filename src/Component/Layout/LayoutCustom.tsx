import React, { Dispatch, ReactChild, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store';
import { getUserList, resetLocalStore } from '../../store/UserSlice';
import database from '../../ultis/db';

const LayoutCustom: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const {userlist, isHas} = useSelector((state: RootState) => state.users);
  console.log(userlist, isHas);
  
  useEffect(() => {
    if( localStorage.getItem('userList') === null) {
      console.log('dispach List')
      dispatch(getUserList())
    }
  },[dispatch])

  useEffect(() => {
    
    console.log(localStorage.getItem('userList') === null);
    console.log(userlist);
    
    
    if(isHas && userlist.length) {
      console.log('localStore')
      localStorage.setItem('userList', JSON.stringify(userlist))
      dispatch(resetLocalStore())
    }
  },[isHas])
  return (
    <div>
      {children}
    </div>
  )
}

export default LayoutCustom