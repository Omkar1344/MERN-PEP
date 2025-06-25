import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { serverEndpoint } from "../config";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (formData.username.trim() === "") {
      isValid = false;
      newErrors.username = "Username is required";
    }

    if (formData.password.trim() === "") {
      isValid = false;
      newErrors.password = "Password is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const body = {
        username: formData.username,
        password: formData.password,
      };
      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/login`,
          body,
          { withCredentials: true }
        );
        dispatch({
          type: "SET_USER",
          payload: response.data.userDetails,
        });
      } catch (error) {
        setErrors({
          message:
            error.response?.data?.message ||
            "Something went wrong, please try again",
        });
      }
    }
  };

  const handleGoogleSignin = async (authResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/google-auth",
        {
          idToken: authResponse.credential,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "SET_USER",
        payload: response.data.userDetails,
      });
    } catch (error) {
      console.log(error);
      setErrors({ message: "Something went wrong while google signin" });
    }
  };

  const handleGoogleSigninFailure = async (error) => {
    console.log(error);
    setErrors({ message: "Something went wrong while google signin" });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {errors.message && (
          <div className="alert alert-danger text-center" role="alert">
            {errors.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <h6 className="text-center">OR</h6>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSignin}
            onError={handleGoogleSigninFailure}
          />
        </GoogleOAuthProvider>
        <div className="text-center">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link} from 'react-router-dom';

// function Login({ updateUserDetails }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let isValid = true;
//     let newErrors = {};

//     if (formData.username.length === 0) {
//       isValid = false;
//       newErrors.username = "Username is required";
//     }

//     if (formData.password.length === 0) {
//       isValid = false;
//       newErrors.password = "Password is mandatory";
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (validate()) {
//       const body = {
//         username: formData.username,
//         password: formData.password,
//       };
//       const configuration = {
//         withCredentials: true,
//       };
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/auth/login",
//           body,
//           configuration
//         );
//         console.log(response);
//         updateUserDetails(response.data.userDetails);
//       } catch (error) {
//         console.log(error);
//         setErrors({
//           message:
//             error.response?.data?.message ||
//             "Something went wrong, please try again",
//         });
//       }
//     }
//   };

//   return (
//     <div className="container text-center">
//       {message && message}
//       {errors.message && errors.message}
//       <h1>Login Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           {errors.username && errors.username}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && errors.password}
//         </div>
//         <div>
//           <button>Submit</button>
//         </div>
//          <p style={{ marginTop: "1rem" }}>
//         Don't have an account?{" "}
//         <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
//           Register here
//         </Link>
//       </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
