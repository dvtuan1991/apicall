import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/User";
import { findObj, getTableValue } from "../ultis/function";
import { store } from './index';

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

interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

const initUserState: InitUserState = { userlist: [], userdetail: {} as IUser, userlisttable: [], isLoading: true, error: '', isHas: false, isCreate: false, total: 0 }
const userList: IUser[] = JSON.parse(localStorage.getItem('userList') ?? "[]");

export const getUserList = createAsyncThunk('users/getUsersList',
  async () => {
    if (!store.getState().users.isHas) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const data = await response.json();
      return data

    }
  })

export const getUserTable = createAsyncThunk(
  'users/getUserTable',
  async ({pageIndex, pageSize}: {pageIndex: number, pageSize: number}) => {
    // return await getTableValue(userList, pageIndex, pageSize )
    try {
      const data = getTableValue(userList, pageIndex, pageSize )
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (id: number | string) => {
    try {
      const response = await findObj(userList, Number(id))
      // return await response.json()
      return response
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: initUserState,
  reducers: {
    addNewUser: (state, action: PayloadAction<IUser>) => {
      state.userlist.push({ ...action.payload });
    },
    resetLocalStore: (state) => {
      state.isHas = !state.isHas
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        console.log('pending');

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
        state.isLoading = false;
        state.error = 'Not Responding'
      })

      .addCase(getUserTable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTable.fulfilled, (state, action: PayloadAction<{result: IUser[], leng: number}>) => {
        console.log( action.payload);
        state.isLoading = false
        state.userlisttable = action.payload.result;
        state.total = action.payload.leng
      })
      .addCase(getUserTable.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Not Responding';
      })

      .addCase(getUserDetail.pending, (state) => {
        state.isLoading = true;
        state.error = ''
      })
      .addCase(getUserDetail.fulfilled, (state, action: PayloadAction<IUser>) => {
        console.log(action.payload)
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.isLoading = false;
          state.userdetail = action.payload;
        }
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.isLoading = true;
        state.error = 'Not Responding'
      })
  }
})

export const { addNewUser, resetLocalStore } = userSlice.actions;

export default userSlice.reducer

function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}
