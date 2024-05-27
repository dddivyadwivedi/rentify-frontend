import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: undefined,
  propertiesCount : 0,
  getAllPropertiesLoading: false,
  getAllPropertiesError: undefined,
  addPropertiesLoading: false,
  addPropertiesError: undefined,
  editPropertiesLoading: false,
  editPropertiesError: undefined,
  singlePropertiesLoading: false,
  singleProperties: undefined,
  singlePropertiesError: undefined,
  addLikeLoading: false,
  addLikeError: undefined,
  sendEmailLoading: false,
  sendEmail: undefined,
  sendEmailError: undefined,
};

const PropertySlice = createSlice({
  name: "Properties",
  initialState,
  reducers: {
    allPropertiestart: (state, action) => {
      return {
        ...state,
        getAllPropertiesLoading: true,
        properties: undefined,
        propertiesCount : 0,
        getAllPropertiesError: undefined,
      };
    },
    allPropertiesuccess: (state, action) => {
      return {
        ...state,
        getAllPropertiesLoading: false,
        properties: action.payload.properties,
        propertiesCount : action.payload.count,
        getAllPropertiesError: undefined,
      };
    },
    allPropertiesFailure: (state, action) => {
      return {
        ...state,
        getAllPropertiesLoading: false,
        properties: undefined,
        propertiesCount : 0,
        getAllPropertiesError: action.payload,
      };
    },
    singlePropertiestart: (state, action) => {
      return {
        ...state,
        singlePropertiesLoading: true,
        singleProperties: undefined,
        singlePropertiesError: undefined,
      };
    },
    singlePropertiesuccess: (state, action) => {
      console.log("redux", action.payload);
      return {
        ...state,
        singlePropertiesLoading: false,
        singleProperties: action.payload,
        singlePropertiesError: undefined,
      };
    },
    singlePropertiesFailure: (state, action) => {
      return {
        ...state,
        singlePropertiesLoading: false,
        singleProperties: undefined,
        singlePropertiesError: action.payload,
      };
    },
    addPropertiestart: (state, action) => {
      return {
        ...state,
        addPropertiesLoading: true,
        addPropertiesError: undefined,
      };
    },
    addPropertiesuccess: (state, action) => {
      return {
        ...state,
        addPropertiesLoading: false,
        addPropertiesError: undefined,
      };
    },
    addPropertiesFailure: (state, action) => {
      return {
        ...state,
        addPropertiesLoading: false,
        addPropertiesError: action.payload,
      };
    },

    editPropertiestart: (state, action) => {
      return {
        ...state,
        editPropertiesLoading: true,
        editPropertiesError: undefined,
      };
    },
    editPropertiesuccess: (state, action) => {
      return {
        ...state,
        editPropertiesLoading: false,
        editPropertiesError: undefined,
      };
    },
    editPropertiesFailure: (state, action) => {
      return {
        ...state,
        editPropertiesLoading: false,
        editPropertiesError: action.payload,
      };
    },

    addLikeStart: (state, action) => {
      return {
        ...state,
        addLikeLoading: true,
        addLikeError: undefined,
      };
    },
    addLikeSuccess: (state, action) => {
      return {
        ...state,
        addLikeLoading: false,
        addLikeError: undefined,
      };
    },
    addLikeFailure: (state, action) => {
      return {
        ...state,
        addLikeLoading: false,
        addLikeError: undefined,
      };
    },

    sendEmailStart: (state, action) => {
      return {
        ...state,
        sendEmailLoading: true,
        sendEmail: undefined,
        sendEmailError: undefined,
      };
    },

    sendEmailSuccess: (state, action) => {
      return {
        ...state,
        sendEmailLoading: false,
        sendEmail: action.payload,
        sendEmailError: undefined,
      };
    },
    sendEmailFailure: (state, action) => {
      return {
        ...state,
        sendEmailLoading: false,
        sendEmail: undefined,
        sendEmailError: action.payload,
      };
    },

    clearSinglePropertyRedux: (state, action) => {
      return {
        ...state,
        singlePropertiesLoading: false,
        singleProperties: undefined,
        singlePropertiesError: undefined,
      };
    },
    clearEmailSentStateRedux : (state,action)=>{
      return{
        ...state,
        sendEmailLoading : false,
        sendEmail : undefined,
        sendEmailError : undefined,
      }
    }
  },
});

export const {
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
  clearSinglePropertyRedux,
  clearEmailSentStateRedux,
} = PropertySlice.actions;

export default PropertySlice.reducer;
