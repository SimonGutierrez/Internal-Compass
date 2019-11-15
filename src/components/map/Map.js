/* eslint-disable complexity */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import mapboxAccessToken from '../../config/mbglConfig';
import { branches as libraries } from '../../data/public-library-locations.json';

const replaceWhitespaceWithPlusSignRegex = /\s+/g;
let firstRenderWithUsers = true;
let curUserLocationName = '';

function useForceUpdate() {
  const [value, set] = useState(true);
  return () => set(!value);
}

const Map = ({ auth, users }) => {
  const [viewport, setViewport] = useState({
    latitude: 40.7531823,
    longitude: -73.9844421,
    width: '100vw',
    height: '91vh',
    zoom: 14,
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedPublicLibrary, setSelectedPublicLibrary] = useState(null);

  const forceUpdate = useForceUpdate();

  // console.log('auth: ', auth, 'users: ', users);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={mapboxAccessToken}
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {libraries.map(curPublicLibrary => {
            return (
              <Marker
                key={curPublicLibrary.id}
                latitude={curPublicLibrary.lat}
                longitude={curPublicLibrary.lon}
              >
                <button
                  onClick={event => {
                    event.preventDefault();
                    setSelectedPublicLibrary(curPublicLibrary);
                  }}
                  type="button"
                  className="marker-btn"
                >
                  <img
                    src="https://img.icons8.com/dusk/64/000000/book-shelf.png"
                    alt="Public Library Icon"
                  />
                </button>
              </Marker>
            );
          })}

          {users
            ? users.map(curUser => {
                // console.log(curUser);

                if (curUser.id === auth.uid) {
                  if (firstRenderWithUsers) {
                    viewport.latitude = curUser.locationGeocode.lat;
                    viewport.longitude = curUser.locationGeocode.lon;
                    firstRenderWithUsers = !firstRenderWithUsers;
                    curUserLocationName = curUser.locationName;
                    forceUpdate();
                  }
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <img
                        className="marker-me"
                        src="https://img.icons8.com/dusk/64/000000/home.png"
                        alt="My Location Icon"
                      />
                    </Marker>
                  );
                } else {
                  return (
                    <Marker
                      key={curUser.id}
                      latitude={curUser.locationGeocode.lat}
                      longitude={curUser.locationGeocode.lon}
                    >
                      <button
                        onClick={event => {
                          event.preventDefault();
                          setSelectedUser(curUser);
                        }}
                        type="button"
                        className="marker-btn"
                      >
                        <img
                          className="marker-others"
                          src="https://img.icons8.com/officel/64/000000/person-male.png"
                          alt="Others Location Icon"
                        />
                      </button>
                    </Marker>
                  );
                }
              })
            : null}

          {selectedPublicLibrary ? (
            <Popup
              onClose={() => {
                setSelectedPublicLibrary(null);
              }}
              latitude={selectedPublicLibrary.lat}
              longitude={selectedPublicLibrary.lon}
            >
              <div className="location-description">
                <span className="bold-text-style">
                  {selectedPublicLibrary.oversightAgency} -{' '}
                  {selectedPublicLibrary.address}
                </span>
              </div>

              <hr />

              <div className="navigation-container">
                <div className="navigation-containee">
                  <span className="bold-text-style">Opening Hours</span>
                  <div>
                    <span className="bold-text-style">Monday: </span>
                    {selectedPublicLibrary.monOpen} -{' '}
                    {selectedPublicLibrary.monClose}
                    {selectedPublicLibrary.monReopen
                      ? `, ${selectedPublicLibrary.monReopen}-${selectedPublicLibrary.monReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="bold-text-style">Tuesday: </span>
                    {selectedPublicLibrary.tueOpen} -{' '}
                    {selectedPublicLibrary.tueClose}
                    {selectedPublicLibrary.tueReopen
                      ? `, ${selectedPublicLibrary.tueReopen}-${selectedPublicLibrary.tueReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="bold-text-style">Wednesday: </span>
                    {selectedPublicLibrary.wedOpen} -{' '}
                    {selectedPublicLibrary.wedClose}
                    {selectedPublicLibrary.wedReopen
                      ? `, ${selectedPublicLibrary.wedReopen}-${selectedPublicLibrary.wedReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="bold-text-style">Thursday: </span>
                    {selectedPublicLibrary.thuOpen} -{' '}
                    {selectedPublicLibrary.thuClose}
                    {selectedPublicLibrary.thuReopen
                      ? `, ${selectedPublicLibrary.thuReopen}-${selectedPublicLibrary.thuReclose}`
                      : null}
                  </div>
                  <div>
                    <span className="bold-text-style">Friday: </span>
                    {selectedPublicLibrary.friOpen} -{' '}
                    {selectedPublicLibrary.friClose}
                    {selectedPublicLibrary.friReopen
                      ? `, ${selectedPublicLibrary.friReopen}-${selectedPublicLibrary.friReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="bold-text-style">Saturday: </span>
                    {selectedPublicLibrary.satOpen} -{' '}
                    {selectedPublicLibrary.satClose}
                    {selectedPublicLibrary.satReopen
                      ? `, ${selectedPublicLibrary.satReopen}-${selectedPublicLibrary.satReclose}`
                      : null}
                  </div>

                  <div>
                    <span className="bold-text-style">Sunday: </span>
                    {selectedPublicLibrary.sunOpen === 'Closed' ? (
                      selectedPublicLibrary.sunOpen
                    ) : (
                      <div>
                        {selectedPublicLibrary.sunOpen} -{' '}
                        {selectedPublicLibrary.sunClose}
                        {selectedPublicLibrary.sunReopen
                          ? `, ${selectedPublicLibrary.sunReopen}-${selectedPublicLibrary.sunReclose}`
                          : null}
                      </div>
                    )}
                  </div>
                </div>

                <br />

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${curUserLocationName.replace(
                    replaceWhitespaceWithPlusSignRegex,
                    '+'
                  )}+Subway+Station&destination=${selectedPublicLibrary.oversightAgency.replace(
                    replaceWhitespaceWithPlusSignRegex,
                    '+'
                  )}+${selectedPublicLibrary.address.replace(
                    replaceWhitespaceWithPlusSignRegex,
                    '+'
                  )}&travelmode=transit`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bold-text-style">Navigate</span>
                </a>
              </div>
            </Popup>
          ) : null}

          {selectedUser ? (
            <Popup
              onClose={() => {
                setSelectedUser(null);
              }}
              latitude={selectedUser.locationGeocode.lat}
              longitude={selectedUser.locationGeocode.lon}
            >
              <div className="location-description">
                <span className="bold-text-style">{`${selectedUser.firstName} ${selectedUser.lastName}`}</span>
              </div>

              <hr />

              <div className="location-description">
                <span className="bold-text-style">Gender: </span>
                {selectedUser.gender}
              </div>

              <div className="location-description">
                <span className="bold-text-style">Company: </span>
                {selectedUser.company}
              </div>

              <div className="location-description">
                <span className="bold-text-style">Contact Information: </span>
                <a
                  href={`mailto:${selectedUser.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bold-text-style">{selectedUser.email}</span>
                </a>
              </div>

              <div className="location-description">
                <span className="bold-text-style">Subway Station: </span>
                {selectedUser.locationName}
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'users',
    },
  ])
)(Map);

Map.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
};
