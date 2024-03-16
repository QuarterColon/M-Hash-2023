import { React, useState } from "react";

import Jump from "../UI/Jump";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerWithEmailAndPassword } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container-fluid" style={{ color: "white" }}>
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="w-75 mx-auto">
              <h2>Create an account!</h2>
              <p>Please enter your details</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                  onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Choose a username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                  onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                  onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button type="submit" className="btn btn-primary mb-3 w-100" onClick={() => {registerWithEmailAndPassword(name, email, password)
                navigate("/login")
                }}>
                  Register
                </button>
                <div className="text-center mt-4">
                  Already have an account? <a href="/login">Log In</a>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            {/* Image Placeholder */}
            <div style={{ height: "100vh", backgroundColor: "#f0f0f0" }}>
              <Jump />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
