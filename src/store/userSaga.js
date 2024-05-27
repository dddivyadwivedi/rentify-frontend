import axios from "axios";
import {  put } from "redux-saga/effects";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} from "./userRedux";

let API_URL = "https://rentifybackend.adaptable.app/api";

export function* userSignUpSaga({ payload }) {
  yield put(signUpStart());
  const {navigate} = payload;
  delete payload["navigate"]
  try {
    const result = yield axios.post(
      `${API_URL}/auth/signup`,
      { ...payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(signUpSuccess(result.data));
    navigate('/login')
  } catch (err) {
    console.log('err' , err)
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
    yield put(signUpFailure(error));
  }
}

export function* userLoginSaga({ payload }) {
  yield put(loginStart());
  const {navigate} = payload;
  delete payload["navigate"]
  try {
    const result = yield axios.post(
      `${API_URL}/auth/signIn`,
      { ...payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(loginSuccess(result.data));
      navigate('/')
  } catch (err) {
    console.log(err);
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
    yield put(loginFailure(error));
  }
}
