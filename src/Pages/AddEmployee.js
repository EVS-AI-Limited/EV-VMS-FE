
import React, { Component } from "react";
import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';
import Box from '@mui/material/Box';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vmobile = value => {
  if (value.length > 11 ) {
    return (
      <div className="alert alert-danger" role="alert">
        The contact must be 10 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 8 ) {
    return (
      <div className="alert alert-danger" role="alert">
        The password minimum 8 characters.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
   
    this.state = {
      userName: "",
      firstName:"",
      lastName:"",
      password: "",
      email: "",
      mobile: "",
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      userName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeContact(e) {
    this.setState({
      mobile: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
 
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.userName,
        this.state.firstName,
        this.state.lastName,
        this.state.password,
        this.state.email,
        this.state.mobile,
        
        
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <>
      <NavBar />
      <SideBar /> 
     
      <div className="col-md-12">
      <div className="add-employee-form">
        
          {/* <img
           src={img}
           alt="profile-img"
           className="profile-img-card"
          /> */}
        
            <Form id="formAuthentication"
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <Input
                    type="text"
                    className="form-input"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <Input
                    type="text"
                    className="form-input"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <Input
                    type="text"
                    className="form-input"
                    name="userName"
                    placeholder="Enter your name"
                    value={this.state.userName}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Input
                    type="text"
                    className="form-input"
                    name="email"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <Input
                    type="number"
                    className="form-input"
                    name="mobile"
                    placeholder="Enter your contact"
                    value={this.state.mobile}
                    onChange={this.onChangeContact}
                    validations={[required, vmobile]}
                  />
                </div>
                <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <Input
                type="password"
                className="form-input"
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required,vpassword]}
              />
            </div>
                <br></br>
                <div className="form-group">
                  <button className="add-employee-submit">Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
       </div>
      </div> 
      </>
    );
  }
}










