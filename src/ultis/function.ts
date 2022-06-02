import { notification } from "antd";
import { IPost } from "../types/Post";
import { IUser } from "../types/User";

export const randomNumber = () => (Math.random() * 1000 );

export const findObj = (array: any, id: number) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      const value: IUser | IPost = array.find((obj: IUser | IPost) => obj.id === id)      
      if(value) {
        resolve(value)
      } else {
        reject(  new Error('Not Found'))
      }
    }, randomNumber())
  }) 
};

export const getTableValue = (arr: IUser[] | IPost[] , pageIndex: number, pageSize: number) => {
  const leng = arr.length;
  let startIndex = (pageIndex - 1) * pageSize;
  let endIndex = pageIndex * pageSize;
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if(startIndex >= leng) {
        startIndex = (Math.floor(leng / startIndex) - 1) * pageSize;
        endIndex = Math.floor(leng / startIndex) * pageSize
      }
      const result = arr.slice(startIndex, endIndex);      
      if(result.length) {
        resolve({result, leng}) 
      } else {
        reject(new Error('Error'))
      }
    }, randomNumber())
  })
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const openNotification = (type: NotificationType, message: string) => {
  notification[type]({
    message,
    placement: 'top',
    duration: 2
  })
};

export const setLimitTring = (string: string, limit: number = 80) => {
  if(string) {

      if (string.length > limit) {
          return string.substring(0, limit) + "..."
      } else {
          return string
      }
  }
}