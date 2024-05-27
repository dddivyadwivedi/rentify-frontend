import * as _ from "lodash";
import { select } from "redux-saga/effects";

export function* getAccessToken() {
    const user = yield select(({ UserAuth }) => UserAuth);
    return _.get(user, "accessToken", false);
  }