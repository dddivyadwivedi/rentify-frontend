import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import "./SignUpStyle.css";
import NavBar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import * as _ from "lodash";
import { useEffect } from "react";
import Spin from "../../components/Spinner/Spinner";
import { clearUserRedux } from "../../store/userRedux";
import { useNavigate } from "react-router-dom";

const SignupForm = ({
  signUpLoading,
  signUpDone,
  signUpError,
  signUpAsyncCalled,
  clearUserReduxAsync,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    clearUserReduxAsync();
  }, [clearUserReduxAsync]);
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
      role: Yup.string().required("Role is required"),
  });

  const onSubmit = (values) => {
    console.log("values", values);
    const { userName, password, email , phone , address , role } = values;

    let data = {
      userName,
      password,
      email,
      phone,
      address,
      role,
      navigate,
    };
    signUpAsyncCalled(data);
  };

  return (
    <>
      {signUpLoading && <Spin />}
      <NavBar />
      <div id="signup">
        <h3 className="header">SignUp</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="signup-form">
            <InputField label="Username" name="userName" />
            <InputField label="Email" name="email" />
            <InputField label="Phone" name="phone" type="phone" />
            <InputField label="Address" name="address" />
            <InputField
              label="Role"
              name="role"
              type="select"
              options={[
                { value: "", label: "Select role" },
                { value: "buyer", label: "Buyer" },
                { value: "seller", label: "Seller" },
              ]}
            />
            <InputField label="Password" name="password" type="password" />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button className="button" type="submit">
              SignUp
            </button>
          </Form>
        </Formik>
        {/* <Spin/> */}
        {signUpError !== undefined && (
          <div className="error">
            <p>{signUpError}</p>
          </div>
        )}
        <div>
          Already registered ? <a href="/login">Sign in</a>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ UserAuth = {} }) => {
  const signUpLoading = _.get(UserAuth, "signUpLoading", false);
  const signUpDone = _.get(UserAuth, "signedUp", undefined);
  const signUpError = _.get(UserAuth, "signUpError", undefined);

  return {
    signUpLoading,
    signUpDone,
    signUpError,
  };
};
const mapDispatchToProps = (dispatch) => ({
  signUpAsyncCalled: (data) =>
    dispatch({ type: "signUpUserSagaCalled", payload: data }),
  clearUserReduxAsync: () => dispatch(clearUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
