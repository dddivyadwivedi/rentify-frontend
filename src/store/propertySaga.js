import axios from "axios";
import { put, call } from "redux-saga/effects";
import {
  allPropertiestart,
  allPropertiesuccess,
  allPropertiesFailure,
  singlePropertiestart,
  singlePropertiesuccess,
  singlePropertiesFailure,
  addPropertiestart,
  addPropertiesuccess,
  addPropertiesFailure,
  editPropertiestart,
  editPropertiesuccess,
  editPropertiesFailure,
  addLikeStart,
  addLikeSuccess,
  addLikeFailure,
  sendEmailStart,
  sendEmailSuccess,
  sendEmailFailure,
} from "./propertyRedux";
import { getAccessToken } from "../utilities/utility";

let API_URL = "https://rentifybackend.adaptable.app/api";

export function* getAllProperties({ payload }) {
  try {
    yield put(allPropertiestart());
    
    const { skip, limit, location, priceMin, priceMax, bedrooms, bathrooms } = payload;
    
    let query = `skip=${skip}&limit=${limit}`;
    
    if (location) {
      query += `&location=${encodeURIComponent(location)}`;
    }
    if (priceMin !== undefined) {
      query += `&priceMin=${priceMin}`;
    }
    if (priceMax !== undefined) {
      query += `&priceMax=${priceMax}`;
    }
    if (bedrooms !== undefined) {
      query += `&bedrooms=${bedrooms}`;
    }
    if (bathrooms !== undefined) {
      query += `&bathrooms=${bathrooms}`;
    }
    
    const result = yield axios.get(`${API_URL}/property?${query}`);
    
    console.log("result->", result);
    yield put(allPropertiesuccess(result.data));
  } catch (err) {
    let error = err.response && err.response.data && err.response.data.message 
      ? err.response.data.message 
      : err.message;
    yield put(allPropertiesFailure(error));
  }
}
export function* getSingleProperty({ payload }) {
  try {

    yield put(singlePropertiestart());
    let token = yield getAccessToken();

    const result = yield axios.get(`${API_URL}/property/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('result' , result)
    yield put(singlePropertiesuccess(result.data));
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
    yield put(singlePropertiesFailure(error));
  }
}

export function* createPropertySaga({ payload }) {
  try {
    yield put(addPropertiestart());
    console.log("payload->", payload);
    // const formData = new FormData();
    // formData.append("name", payload.title);
    // formData.append("description", payload.description);
    // if (payload.image) {
    //   formData.append("bannerImage", payload.image);
    // }
    let token = yield getAccessToken();
    const result = yield axios.post(`${API_URL}/property`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(addPropertiesuccess(result.data));
    payload.navigate("/");
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
    yield put(addPropertiesFailure(error));
  }
}

export function* editPropertySaga({ payload }) {
  try {
    yield put(editPropertiestart());
    let token = yield getAccessToken();
   
    const result = yield axios.patch(
      `${API_URL}/property/${payload.id}`,
      payload.formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(editPropertiesuccess(result.data));
    payload.navigate("/");
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
    yield put(editPropertiesFailure(error));
  }
}



export function* likeProperty({ payload }) {
  try {
    yield put(addLikeStart());
    const token = yield getAccessToken();
    const result = yield axios.post(
      `${API_URL}/property/likeProperty`,
      { ...payload },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(addLikeSuccess(result.data));
    yield call(getSingleProperty, { payload: {id : result.data.id} });
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
    yield put(addLikeFailure(error));
  }
}

export function* sendInterestEmailSaga({ payload }) {
    try {
        console.log('payload ->' , payload)
      yield put(sendEmailStart());
      const token = yield getAccessToken();
      const result = yield axios.post(
        `${API_URL}/property/sendInterestEmail`,
        { ...payload },
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('result->' , result)
      yield put(sendEmailSuccess(result.data))
    } catch (err) {

      let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
      yield put(sendEmailFailure(error));
    }
  }
