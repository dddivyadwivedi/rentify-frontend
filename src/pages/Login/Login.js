import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import NavBar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import * as _ from "lodash";
import { useEffect } from "react";
import Spin from "../../components/Spinner/Spinner";
import {clearUserRedux} from '../../store/userRedux';
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  loginLoading,
  userDetails,
  loginError,
  clearUserReduxAsync,
  loginAsyncCalled,
}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('loginerror' , loginError)
    clearUserReduxAsync()
  } , [])
  const initialValues = {
    email: "",
    password: "",
 
  };

  const validationSchema = Yup.object({

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values,) => {
   const {email , password} = values
    loginAsyncCalled({email , password , navigate})
     
  };

  return (
    <>
    {loginLoading && <Spin/>}
    <NavBar pageName="divya" />
    <div id="signup">
      <h3 className="header">Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signup-form">
          
          <InputField label="Email" name="email"  />
          <InputField label="Password" name="password" type="password" />
         
          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
      {loginError !== undefined &&
      <div className="error">
        <p>{loginError}</p>
      </div>
}
      <div>
        New to platform ? <a href="/signup">Sign Up</a>
      </div>
    </div>
    </>
  );
};
const mapStateToProps = ({UserAuth = {}})=>{
  const loginLoading = _.get(UserAuth , "signInLoading" , false);
  const userDetails = _.get(UserAuth , "userInfo" , undefined);
  const loginError = _.get(UserAuth , "signInError" , undefined);

  return{
    loginLoading,
    userDetails,
    loginError,
  }
}
const mapDispatchToProps = (dispatch)=>({
  loginAsyncCalled : (data)=> dispatch({type : "loginUserSagaCalled" , payload : data}),
  clearUserReduxAsync : ()=>dispatch(clearUserRedux())
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
