import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import NavBar from "../../components/Navbar/Navbar";
import "./ManagePropertyStyle.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Spin from "../../components/Spinner/Spinner";
import { clearUserRedux } from "../../store/userRedux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

function ManageProperty({
  editPropertiesLoading,
  editPropertiesError,
  addPropertiesLoading,
  addPropertiesError,
  addPropertiesAsyncCalled,
  editPropertiesAsyncCalled,
  getSingleProperty,
  propertyData,
  propertyLoading,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    noOfBedrooms: "",
    noOfBathrooms: "",
    noOfHospitals: "",
    price: "",
    fileName: "",
  });

  useEffect(() => {
    if (id) {
      console.log("id", id);
      getSingleProperty({ id });
    }
  }, [id]);

  useEffect(() => {
    if (propertyData !== undefined) {
      setInitialValues({
        name: propertyData.name  || "",
        description: propertyData.description || "",
        image: "",
        location: propertyData.location || "",
        noOfBedrooms: propertyData.noOfBedrooms || "",
        noOfBathrooms: propertyData.noOfBathrooms || "",
        noOfHospitals: propertyData.noOfHospitalsNearBy || "",
        price: propertyData.price || "",
        fileName: propertyData.propertyImageLink
          ? propertyData.propertyImageLink.split("/").pop()
          : "",
      });
    }
    console.log('initial' , initialValues)
  }, [propertyData]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image:
      propertyData !== undefined
        ? Yup.string()
        : Yup.string().required("Image is required"),
    location: Yup.string().required("Location is required"),
    noOfBedrooms: Yup.number()
      .required("Number of Bedrooms is required")
      .positive()
      .integer(),
    noOfBathrooms: Yup.number()
      .required("Number of Bathrooms is required")
      .positive()
      .integer(),
    noOfHospitals: Yup.number()
      .required("Number of Hospitals is required")
      .positive()
      .integer(),
    price: Yup.number().required("Price is required").positive(),
  });

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    const fileName = file ? file.name : "";
    console.log("file", file);
    setInitialValues((prevValues) => ({
      ...prevValues,
      image: file,
      fileName: fileName,
    }));
  };

  const onSubmit = (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("noOfBedrooms", values.noOfBedrooms);
    formData.append("noOfBathrooms", values.noOfBathrooms);
    formData.append("noOfHospitalsNearBy", values.noOfHospitals);
    formData.append("price", values.price);
    if (values.image !== "") {
      formData.append("bannerImage", values.image);
    }
    if (propertyData !== undefined) {
      editPropertiesAsyncCalled({ formData, navigate, id: propertyData.id });
    } else {
      addPropertiesAsyncCalled({ formData, navigate });
    }
  };

  

  const handleFileChange = (event) => {
    
      setInitialValues((prevValues) => ({
        ...prevValues,
        image: "",
        fileName: "",
      }));
    }
  
    
  

  return (
    <>
      {(editPropertiesLoading || addPropertiesLoading) && <Spin />}
      <NavBar />
      <div id="managepost">
        <h3 className="header">Manage Post</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form className="signup-form">
           

            {initialValues.fileName !=="" ? (
              <div className="file-info">
                <span>Selected File: {initialValues.fileName}</span>
                <button className="change-file" onClick={handleFileChange}>
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
            ) : (
              <InputField
                label="Image"
                name="image"
                type="file"
                className="form-field"
                fileName={initialValues.fileName}
                onChange={handleChange}
              />
            )}

            <InputField label="Name" name="name" className="form-field"  />
            <InputField
              label="Location"
              name="location"
              className="form-field"
            />
            <InputField
              label="Description"
              name="description"
              as="textarea"
              rows="3"
              cols="50"
              className="form-field"
            />
            <InputField
              label="No. of Bedrooms"
              name="noOfBedrooms"
              type="number"
              className="form-field"
            />
            <InputField
              label="No. of Bathrooms"
              name="noOfBathrooms"
              type="number"
              className="form-field"
            />
            <InputField
              label="No. of nearby Hospitals"
              name="noOfHospitals"
              type="number"
              className="form-field"
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              className="form-field"
            />
            <button className="button" type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

const mapStateToProps = ({ PropertySlice = {} }) => {
  const editPropertiesLoading = _.get(
    PropertySlice,
    "editPropertiesLoading",
    false
  );
  const editPropertiesError = _.get(
    PropertySlice,
    "editPropertiesError",
    false
  );
  const addPropertiesLoading = _.get(
    PropertySlice,
    "addPropertiesLoading",
    false
  );
  const addPropertiesError = _.get(
    PropertySlice,
    "addPropertiesError",
    undefined
  );
  const propertyData = _.get(PropertySlice, "singleProperties", undefined);
  const propertyLoading = _.get(
    PropertySlice,
    "singlePropertiesLoading",
    false
  );
  return {
    editPropertiesLoading,
    editPropertiesError,
    addPropertiesLoading,
    addPropertiesError,
    propertyData,
    propertyLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editPropertiesAsyncCalled: (data) =>
    dispatch({ type: "editPropertySagaCalled", payload: data }),
  addPropertiesAsyncCalled: (data) =>
    dispatch({ type: "addPropertySagaCalled", payload: data }),
  getSingleProperty: (data) =>
    dispatch({ type: "fetchSinglePropertySagaCalled", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProperty);
