import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Email is required';
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validate()) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/auth/register',
        {
          name: formData.name,
          username: formData.username,
          password: formData.password,
        }
      );

      setMessage(response.data.message);
      setErrors({});
      setFormData({ name: '', username: '', password: '' });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      setErrors({ message: msg });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Register</h3>

        {message && <div className="alert alert-success text-center">{message}</div>}
        {errors.message && <div className="alert alert-danger text-center">{errors.message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label">Email</label>
            <input
              type="email"
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="mb-4 text-start">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-success">Register</button>
          </div>
        </form>

        <div className="text-center">
          <p className="mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validate = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       isValid = false;
//     }
//     if (!formData.username.trim()) {
//       newErrors.username = 'Email is required';
//       isValid = false;
//     }
//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!validate()) return;

//     try {
//       const response = await axios.post(
//         'http://localhost:5000/auth/register',
//         {
//           name: formData.name,
//           username: formData.username,
//           password: formData.password,
//         }
//       );

//       setMessage(response.data.message);
//       setErrors({});
//       setFormData({ name: '', username: '', password: '' });

//       // Optional: redirect to login page
//       setTimeout(() => navigate('/login'), 1000);
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Something went wrong';
//       setErrors({ message: msg });
//     }
//   };

//   return (
//     <div className="container text-center">
//       <h1>Register</h1>

//       {message && <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}
//       {errors.message && <div style={{ color: 'red', marginBottom: '1rem' }}>{errors.message}</div>}

//       <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Name:</label><br />
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Email:</label><br />
//           <input
//             type="email"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label>Password:</label><br />
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
