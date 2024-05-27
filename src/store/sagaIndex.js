import { all,  takeLatest } from "redux-saga/effects";
import {
 userSignUpSaga,
 userLoginSaga,
} from "./userSaga";

import {
  getAllProperties,
  getSingleProperty,
  createPropertySaga,
  editPropertySaga,
  likeProperty,
  sendInterestEmailSaga,


} from './propertySaga'

export default function* root() {
  yield all([
    takeLatest("signUpUserSagaCalled", userSignUpSaga),
    takeLatest("loginUserSagaCalled" , userLoginSaga),
    takeLatest("fetchAllPropertySagaCalled" , getAllProperties),
    takeLatest("fetchSinglePropertySagaCalled" , getSingleProperty),
    takeLatest("addPropertySagaCalled" , createPropertySaga),
    takeLatest("editPropertySagaCalled" , editPropertySaga),
    takeLatest("addLikeSagaCalled" , likeProperty),
    takeLatest("sendEmailInterestedSagaCalled" , sendInterestEmailSaga) 
  ]);
}
