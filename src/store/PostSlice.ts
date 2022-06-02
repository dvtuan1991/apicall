import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../types/Post";
import { getTableValue, findObj } from "../ultis/function";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface InitPostState {
  postTotalList: IPost[];
  postListTable: IPost[];
  postByUserId: IPost[];
  detailPost: IPost;
  isLoadingpost: boolean;
  error?: string;
  postsleng: number;
  isPostListHas: boolean;
}

const initPostState: InitPostState = { postTotalList: [], postListTable: [], postByUserId: [], detailPost: {} as IPost, isLoadingpost: false, error: '', postsleng: 0, isPostListHas: false }
export const getPostList = createAsyncThunk(
  'posts/getPostlist',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();
    return data
  }
)

export const getPostsByUserId = createAsyncThunk(
  'posts/getPostByUserId',
  async (id: string) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      if (response.ok) {

        const data = await response.json();
        return data
      }
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  })

export const getPostListTable = createAsyncThunk(
  'posts/getPostListTable',
  async ({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) => {
    try {
      const userListLocal: IPost[] = JSON.parse(localStorage.getItem('postList') ?? "[]");
      const data = await getTableValue(userListLocal, pageIndex, pageSize)
      return data
    } catch (error: any) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
);

export const getPostDetail = createAsyncThunk(
  'posts/getPostDetail',
  async (id: string) => {
    try {
      const postListLocal = JSON.parse(localStorage.getItem('postList') ?? '[]');
      const post = await findObj(postListLocal, Number(id))
      return post
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deletePost = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      const postListLocal: IPost[] = JSON.parse(localStorage.getItem('postList') ?? "[]");
      const newList = postListLocal.filter(post => post.id !== id);
      localStorage.setItem('postList', JSON.stringify(newList));
      return newList.length
    } catch (error: any) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: initPostState,
  reducers: {
    addNewPost: (state, action: PayloadAction<IPost>) => {
      const postListLocal = JSON.parse(localStorage.getItem('postList') ?? "[]");
      postListLocal.push(action.payload);
      localStorage.setItem('postList', JSON.stringify(postListLocal));
      state.postsleng = postListLocal;
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      const postListLocal: IPost[] = JSON.parse(localStorage.getItem('postList') ?? "[]");
      const newList = postListLocal.map(post => {
        if (post.id === action.payload.id) {
          return action.payload;
        } else {
          return post
        }
      });
      localStorage.setItem('postList', JSON.stringify(newList));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostList.pending, (state) => {
        state.isLoadingpost = true;
      })
      .addCase(getPostList.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postTotalList = action.payload;
        state.isLoadingpost = false;
        state.isPostListHas = true;
      })

      .addCase(getPostListTable.pending, (state) => {
        state.isLoadingpost = true;
      })
      .addCase(getPostListTable.fulfilled, (state, action: PayloadAction<{ result: IPost[], leng: number }>) => {
        state.postListTable = action.payload.result;
        state.postsleng = action.payload.leng;
        state.isLoadingpost = false
      })
      .addCase(getPostListTable.rejected, (state, action) => {
        state.isLoadingpost = false;
        state.error = action.error?.message ?? ''
      })

      .addCase(getPostsByUserId.pending, (state) => {
        state.isLoadingpost = true;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.isLoadingpost = false;
        state.postByUserId = action.payload;
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.isLoadingpost = false
        state.error = action.error.message ?? ''
      })

      .addCase(getPostDetail.pending, (state) => {
        state.isLoadingpost = true;
      })
      .addCase(getPostDetail.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.detailPost = action.payload;
        state.error = '';
        state.isLoadingpost = false
      })
      .addCase(getPostDetail.rejected, (state, action) => {
        state.error = action.error.name
        state.isLoadingpost = false
      })

      .addCase(deletePost.pending, (state) => {
        state.isLoadingpost = true
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.postsleng = action.payload;
        state.isLoadingpost = false
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message ?? '';
        state.isLoadingpost = false
      })
  },
})

export default postSlice.reducer;

export const { addNewPost, updatePost } = postSlice.actions

function rejectWithValue(data: any): any {
  throw new Error("Function not implemented.");
}
