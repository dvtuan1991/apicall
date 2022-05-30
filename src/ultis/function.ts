import { resolve } from "path";
import { IUser } from "../types/User";

export const randomNumber = () => (Math.random() * 1000 + 500);

export const findObj = (users: IUser[], id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id)
      console.log(user);
      
      if(user) {
        resolve(user)
      } else {
        reject(  new Error('Not Found'))
      }
    }, randomNumber())
  }) 
};

export const getTableValue = (arr: IUser[], pageIndex: number, pageSize: number) => {
  let startIndex = (pageIndex - 1) * pageSize;
  let endIndex = pageIndex * pageSize
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = arr.slice(startIndex, endIndex);
      const leng = arr.length
      console.log(result);
      
      if(result.length) {
        resolve({result, leng}) 
      } else {
        reject(new Error('Error'))
      }
    }, randomNumber())
  })
}