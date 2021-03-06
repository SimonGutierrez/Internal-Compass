import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { stations } from '../../data/nyc-subway-stations.json';
import { signUpThunkCreator } from '../../store/reducers/authReducer';
// import signupAccessToken from '../../config/signupConfig';

const defaultLocation = stations[0];

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: 'Male',
      company: 'N/A',
      location: defaultLocation,
      // accessToken: '',
      // accessTokenError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSelect(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    const location = stations.filter(
      curSubwayStation => curSubwayStation.name === event.target.value
    )[0];
    this.setState({
      location,
    });
  }

  handleSubmit(event) {
    // console.log('event.target.id: ', event.target.id);
    // console.log('event.target.value: ', event.target.value);

    event.preventDefault();

    // if (this.state.accessToken === signupAccessToken) {
    //   this.setState({
    //     accessTokenError: false,
    //   });
    //   this.props.signUpThunk(this.state);
    // } else {
    //   this.setState({
    //     accessTokenError: true,
    //   });
    // }

    this.props.signUpThunk(this.state);
  }

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="card white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>

            <div className="input-field">
              <label htmlFor="email">
                Email<span className="red-text-color">*</span> (Example:
                cody@email.com)
              </label>

              <input
                type="email"
                id="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Example: cody@email.com"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">
                Password<span className="red-text-color">*</span> (May only
                contain one uppercase letter, one lowercase letter, one digit,
                and at least 8 characters in total)
              </label>

              <input
                type="password"
                id="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}"
                title="May only contain one uppercase letter, one lowercase letter, one digit, and at least 8 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="firstName">
                First Name<span className="red-text-color">*</span> (May only
                contain uppercase and lowercase letters only, and at least 2
                characters in total)
              </label>

              <input
                type="text"
                id="firstName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field">
              <label htmlFor="lastName">
                Last Name<span className="red-text-color">*</span> (May only
                contain uppercase and lowercase letters only, and at least 2
                characters in total)
              </label>

              <input
                type="text"
                id="lastName"
                required
                pattern="[A-Za-z]{2,32}"
                title="May only contain uppercase and lowercase letters only, and at least 2 characters in total"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12">
              <label htmlFor="gender">
                Gender<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="gender"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-field col s12">
              <label htmlFor="company">
                Company<span className="red-text-color">*</span>
              </label>

              <br />
              <br />

              <select
                id="company"
                className="browser-default"
                required
                onChange={this.handleChange}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                <option value="N/A">N/A</option>
                <option value="Apple">Apple</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
                <option value="GitHub">GitHub</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Twitter">Twitter</option>
                <option value="Yahoo">Yahoo</option>
              </select>
            </div>

            <div className="input-field col s12">
              <label htmlFor="location">
                Location<span className="red-text-color">*</span> (Please pick
                the subway station closest to where you live)
              </label>

              <br />
              <br />

              <select
                id="location"
                className="browser-default"
                required
                onChange={this.handleSelect}
              >
                <option value="" disabled>
                  --Please choose an option--
                </option>
                {stations.map(curSubwayStation => {
                  return (
                    <option key={curSubwayStation.id}>
                      {curSubwayStation.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="input-field">
              <label htmlFor="accessToken">
                Access Token<span className="red-text-color">*</span> (Must
                match the access token you received via email invitation)
              </label>
              <input
                type="text"
                id="accessToken"
                required
                onChange={this.handleChange}
              />
            </div> */}

            <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
              {/* {authError ? (
                <p>{authError}</p>
              ) : this.state.accessTokenError ? (
                'Invalid Access Token! Please try again.'
              ) : null} */}

              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  signUpThunk(newUser) {
    dispatch(signUpThunkCreator(newUser));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
