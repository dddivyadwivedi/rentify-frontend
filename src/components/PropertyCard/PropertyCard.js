import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./PropertyCardStyle.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as _ from "lodash";
import {
  faHeart,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function PropertyCard({ userDetails, propertyData }) {
  const navigate = useNavigate();

  return (
    <Card className="card">
      <Card.Img variant="top" src={propertyData.propertyImageLink} />
      <Card.Body>
        <Card.Title>{propertyData.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {propertyData.name}
        </Card.Subtitle>
        <Card.Text>
          <strong>Location:</strong> {propertyData.location}
        </Card.Text>
        <Card.Text>
          <strong>Number of Bedrooms:</strong> {propertyData.noOfBedrooms}
        </Card.Text>

        <Card.Text>
          <strong>Price:</strong> ₹{propertyData.price}
        </Card.Text>
        <div className="like-section">
          {userDetails !== undefined && userDetails.role === "seller" && (
            <button
              className="change-button"
              onClick={() => navigate(`/managepost/${propertyData.id}`)}
            >
              {" "}
              <FontAwesomeIcon icon={faEdit} />{" "}
            </button>
          )}
          <button
            className="change-button"
            onClick={() => navigate(`/post/${propertyData.id}`)}
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} />{" "}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
const mapStateToProps = ({ UserAuth = {} }) => {
  const userDetails = _.get(UserAuth, "userInfo", undefined);

  return {
    userDetails,
  };
};

export default connect(mapStateToProps, null)(PropertyCard);
