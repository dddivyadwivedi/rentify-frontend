import React, { useState, useEffect } from 'react';
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import NavBar from "../../components/Navbar/Navbar";
import "./HomePageStyle.css";
import { connect } from "react-redux";
import * as _ from "lodash";
import Spin from "../../components/Spinner/Spinner";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HomePage = ({
  allPropertyLoading,
  allPropertyData,
  allPropertyFailure,
  fetchAllPropertyAsync,
  propertiesCount,
}) => {
  const [pages, setpages] = useState(0);
  const [limit, setlimit] = useState(3);
  const [skip, setskip] = useState(0);
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  useEffect(() => {
    fetchAllPropertyAsync({ skip: 0, limit: 3 });
  }, [fetchAllPropertyAsync]);

  const handleFilterChange = () => {
    setskip(0);
    setpages(0);
    fetchAllPropertyAsync({ 
      skip: 0, 
      limit, 
      location, 
      priceMin: priceMin ? parseInt(priceMin) : undefined, 
      priceMax: priceMax ? parseInt(priceMax) : undefined, 
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined, 
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined 
    });
  };

  return (
    <>
      <NavBar />
      <h3 className="header">Home</h3>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
      {allPropertyLoading && <Spin />}
      <div id="home">
        {allPropertyData !== undefined &&
          allPropertyData.length > 0 &&
          allPropertyData.map((item) => (
            <PropertyCard propertyData={item} key={item.id} />
          ))}
      </div>
      {propertiesCount > 0 && (
        <div className="paginationsection">
          <div className="paginationtxtholer">
            <span className="noofpagetxt">
              Showing {pages + 1} From {Math.ceil(propertiesCount / limit)}
            </span>
          </div>
          <div className="paginationallignment">
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
              nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(propertiesCount / limit)}
              forcePage={pages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={(e) => {
                setskip(e.selected * limit);
                fetchAllPropertyAsync({
                  skip: e.selected * limit,
                  limit,
                  location,
                  priceMin: priceMin ? parseInt(priceMin) : undefined,
                  priceMax: priceMax ? parseInt(priceMax) : undefined,
                  bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
                  bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
                });
                setpages(e.selected);
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ PropertySlice = {} }) => {
  const allPropertyLoading = _.get(PropertySlice, "getAllPropertiesLoading", false);
  const allPropertyData = _.get(PropertySlice, "properties", undefined);
  const propertiesCount = _.get(PropertySlice, "propertiesCount", 0);
  const allPropertyFailure = _.get(PropertySlice, "getAllPropertiesError", undefined);

  return {
    allPropertyLoading,
    allPropertyData,
    allPropertyFailure,
    propertiesCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllPropertyAsync: (data) => dispatch({ type: "fetchAllPropertySagaCalled", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
