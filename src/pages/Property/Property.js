import React, { useEffect, useState } from "react";
import "./PropertyStyle.css";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import * as _ from "lodash";
import Spin from "../../components/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeartCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { clearEmailSentStateRedux } from '../../store/propertyRedux';
import InterestModal from "../../components/InterestModal/InterestModal";
import 'react-toastify/dist/ReactToastify.css';

const Properties = ({
  propertiesLoading,
  propertiesData,
  propertiesFailure,
  userDetails,
  fetchSinglePropertiesAsync,
  addLikeAsync,
  postLikeLoading,
  sendInterestEmailAsync,
  sendInterestEmailLoading,
  sendInterestEmailSuccess,
  clearEmailSendAsync,
}) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchSinglePropertiesAsync({ id });
  }, [id, fetchSinglePropertiesAsync]);

  useEffect(() => {
    if (sendInterestEmailSuccess) {
      setShowModal(true);
    }
  }, [sendInterestEmailSuccess]);

  const handleAddLike = () => {
    addLikeAsync({ propertyId: propertiesData.id, buyerId: userDetails.id });
  };

  const handleInterest = () => {
    sendInterestEmailAsync({ propertyId: propertiesData.id, buyerId: userDetails.id, sellerId: propertiesData.sellerId });
  };

  const hasUserLikedProperty = () => {
    return propertiesData.likes.some(like => like.buyerId === userDetails.id);
  };

  return (
    <>
      <NavBar />
      {(propertiesLoading || postLikeLoading || sendInterestEmailLoading) && <Spin />}
      {propertiesData !== undefined && (
        <div className="property-details">
          <h2 className="property-title">{propertiesData.title}</h2>
          <div className="property-content">
            <img
              src={propertiesData.propertyImageLink}
              alt={propertiesData.title}
              className="property-image"
            />
            <div className="property-description">
              <p>{propertiesData.description}</p>
            </div>
            <div className="property-info">
              <p>
                <strong>Price:</strong> ₹{propertiesData.price}
              </p>
              <p>
                <strong>Location:</strong> {propertiesData.location}
              </p>
              <p>
                <strong>Bedrooms:</strong> {propertiesData.noOfBedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {propertiesData.noOfBathrooms}
              </p>
              <p>
                <strong>Hospitals Nearby:</strong> {propertiesData.noOfHospitalsNearBy}
              </p>
              <p>
                <strong>Total Likes:</strong> {propertiesData.likes.length}
              </p>
            </div>
          </div>
          {userDetails.id !== propertiesData.sellerId  &&
          <div className="property-actions">
            {!hasUserLikedProperty() &&
              <button className="change-file" onClick={handleAddLike}>
                <FontAwesomeIcon icon={faThumbsUp} /> Like
              </button>
            }
            <button className="change-file" onClick={handleInterest}>
              <FontAwesomeIcon icon={faHeartCircleBolt} /> Interested
            </button>
          </div>
}
        </div>

      )}
      
      <InterestModal
        show={showModal}
        handleClose={() => {
          clearEmailSendAsync()
          setShowModal(false)
        }}
        emailSuccess={sendInterestEmailSuccess}
      />
    </>
  );
};

const mapStateToProps = ({ PropertySlice = {}, UserAuth = {} }) => {
  const propertiesLoading = _.get(PropertySlice, "singlePropertiesLoading", false);
  const propertiesData = _.get(PropertySlice, "singleProperties", undefined);
  const propertiesFailure = _.get(PropertySlice, "singlePropertiesError", undefined);
  const userDetails = _.get(UserAuth, "userInfo", undefined);
  const postLikeLoading = _.get(PropertySlice, "postLikeLoading", false);
  const postLikeError = _.get(PropertySlice, "postLikeError", undefined);
  const sendInterestEmailLoading = _.get(PropertySlice, "sendEmailLoading", false);
  const sendInterestEmailSuccess = _.get(PropertySlice, "sendEmail", undefined);
  const sendInterestEmailError = _.get(PropertySlice, "sendEmailError", undefined);

  return {
    propertiesLoading,
    propertiesData,
    propertiesFailure,
    userDetails,
    postLikeLoading,
    postLikeError,
    sendInterestEmailLoading,
    sendInterestEmailSuccess,
    sendInterestEmailError,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSinglePropertiesAsync: (data) => dispatch({ type: "fetchSinglePropertySagaCalled", payload: data }),
  addLikeAsync: (data) => dispatch({ type: "addLikeSagaCalled", payload: data }),
  sendInterestEmailAsync: (data) => dispatch({ type: "sendEmailInterestedSagaCalled", payload: data }),
  clearEmailSendAsync: () => dispatch(clearEmailSentStateRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
