import { React, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Jump from "../UI/Jump";

import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../firebase";
import "./auth.css";
import { UserContext } from "../../UserContext";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const { currentUser, userData } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  // useEffect(() => {
  // //   if (currentUser) {
  // //       navigate("/home")
  // //   }
  // // }, [user, navigate, currentUser]
  // )

  
  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        marginTop: "50px",
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {/* Image Placeholder */}
            <div style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
              <Jump />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control my-change"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember for 30 days
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mb-3 w-100"
                  onClick={() => {
                    logInWithEmailAndPassword(email, password);
                    console.log(currentUser.uid)
                    if (currentUser) {
                      navigate("/home");
                    } else {
                      console.log("Cant Login");
                    }
                  }}
                >
                  Log In
                </button>
                <div className="text-center">
                  <a href="#forgot">Forgot password?</a>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-outline-dark w-100">
                    <img
                      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fgoogle-icon-logo-png-transparent.png&f=1&nofb=1&ipt=3bfecb37b7c165e7cccd3a708ef9f208d9816dd6356a34b139ffa02423ed5460&ipo=images"
                      alt="Google Icon"
                      style={{ width: "20px" }}
                    />{" "}
                    Log in with Google
                  </button>
                </div>
                <div className="text-center mt-4">
                  Don't have an account? <a href="/register">Sign Up</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      \
    </div>
  );
};

export default Login;
