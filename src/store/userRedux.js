import { createSlice } from '@reduxjs/toolkit';

const UserAuth = createSlice({
  name: "UserAuth",
  initialState: {
    signUpLoading: undefined,
    signedUp: undefined,
    signUpError: undefined,
    userInfo: undefined,
    signInLoading: false,
    signInError: undefined,
    accessToken : undefined,
  },
  reducers: {

    clearUserRedux : (state, action)=>{
      return {
        ...state,
        signInError : undefined,
        signUpError : undefined,
      }
    },
    signUpStart: (state, action) => {
      return {
        ...state,
        signUpLoading: true,
        signedUp: undefined,
        signUpError: undefined,
      };
    },
    signUpSuccess: (state, action) => {
      return {
        ...state,
        signUpLoading: false,
        signedUp: action.payload,
        signUpError: undefined,
      };
    },
    signUpFailure: (state, action) => {
      return {
        ...state,
        signUpLoading: false,
        signedUp: undefined,
        signUpError: action.payload,
      };
    },
    loginStart: (state, action) => {
      return {
        ...state,
        signInLoading: true,
        signInError: undefined,
        userInfo: undefined,
      };
    },

    loginSuccess: (state, action) => {
      return {
        ...state,
        signInLoading: false,
        signInError: undefined,
        userInfo: action.payload.userDetails,
        accessToken: action.payload.accessToken,
      
    
      };
    },
    loginFailure: (state, action) => {
      return {
        ...state,
        signInLoading: false,
        signInError: action.payload,
        userInfo: undefined,
     
      };
    },

    logOut : (state,action)=>{
      return {}
    }
  },
});

export default UserAuth.reducer;
export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  clearUserRedux,
  logOut,
} = UserAuth.actions;
