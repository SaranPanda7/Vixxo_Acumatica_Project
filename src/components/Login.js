import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";
import Preloader from "./Preloader";

<style type="text/css">
  {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    
    `}
</style>;

function Login() {
  // const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  console.log(data);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    loginRequest();
    document.getElementById("preloader").style.display = "block";
    console.log(data);
  };

  const loginRequest = () => {
    axios
      .post("https://dycp390e54.execute-api.us-east-2.amazonaws.com/dev/login/", data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => console.log(error));
  };

  // ------------------------------------------------------xxx-----------------------------------------------

  return (
    <div className="modal-login">
      <Modal.Dialog>
        <Modal.Header>
          <div className="avatar">
            <img
              src={require("../images/Ces.png")}
              height={65}
              width={60}
              alt="Avatar"
            />
          </div>
          <Modal.Title>Member Login</Modal.Title>
          {/* <CloseButton aria-label="Hide">&times;</CloseButton> */}
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={FormSubmitHandler}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter Username.."
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Password.."
                onChange={changeHandler}
                required="required"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-lg btn-block login-btn"
                type="submit"
                name="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal.Dialog>
      <div id="preloader" className="h-100 preloader">
        <Preloader />
      </div>
    </div>
  );
}

export default Login;
