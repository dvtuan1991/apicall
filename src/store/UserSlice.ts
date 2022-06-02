import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/User";
import { findObj, getTableValue } from "../ultis/function";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface InitUserState {
  userlist: IUser[];
  userlisttable: IUser[];
  userdetail: IUser;
  isLoading: boolean;
  error: string;
  isHas: boolean;
  isCreate: boolean;
  total: number;
}


const initUserState: InitUserState = { userlist: [], userdetail: {} as IUser, userlisttable: [], isLoading: false, error: '', isHas: false, isCreate: false, total: 0 }


export const getUserList = createAsyncThunk('users/getUsersList',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    return data
  })

export const getUserTable = createAsyncThunk(
  'users/getUserTable',
  async ({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) => {
    try {
      const userListLocal: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");
      const data = getTableValue(userListLocal, pageIndex, pageSize)
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (id: string) => {
    try {
      const userListLocal: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");
      const response = await findObj(userListLocal, Number(id))
      return response
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      const userListLocal: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");
      const newList = userListLocal.filter(user => user.id !== id);
      localStorage.setItem('userList', JSON.stringify(newList));
      return newList.length
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: initUserState,
  reducers: {
    addNewUser: (state, action: PayloadAction<IUser>) => {
      const userListLocal: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");
      userListLocal.push(action.payload)
      localStorage.setItem('userList', JSON.stringify(userListLocal));
      state.total = userListLocal.length
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      const userListLocal: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");
      const newListLocal : IUser[] = userListLocal.map(user => {
        if(user.id === action.payload.id) {
          return action.payload;
        } else {
          return user
        }
      })
      localStorage.setItem('userList', JSON.stringify(newListLocal));
      state.total = newListLocal.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        console.log('pending')
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUserList.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        console.log('full')
        state.userlist = action.payload;
        state.isLoading = false;
        state.error = '';
        state.isHas = true;
      })
      .addCase(getUserList.rejected, (state) => {
        state.error = 'Not Responding'
        state.isLoading = false;
      })

      .addCase(getUserTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTable.fulfilled, (state, action: PayloadAction<{ result: IUser[], leng: number }>) => {
        state.userlisttable = action.payload.result;
        state.total = action.payload.leng
        state.isLoading = false;
      })
      .addCase(getUserTable.rejected, (state) => {
        state.error = 'Not Responding';
        state.isLoading = false;
      })

      .addCase(getUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = ''
      })
      .addCase(getUserDetail.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.userdetail = action.payload;
        state.error = ''
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        console.log(action);
        state.error = 'Not Responding'
        state.isLoading = false;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false
        state.total = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message ?? ''
        state.isLoading = false;
      })
  }
})

export const { addNewUser, updateUser } = userSlice.actions;

export default userSlice.reducer

function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}
