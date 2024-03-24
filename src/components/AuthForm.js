import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import just from "./img/just.svg";
import logo from './img/logo.png'
import config from "./config";

const AuthForm = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [logpassword, setlogpassword] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    c_password: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const { first_name, last_name, email, password, c_password, mobile } =
    formData;

  const handleToggleMode = () => {
    setSignUpMode(!isSignUpMode);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === "" ||
      c_password === "" ||
      mobile === ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty!",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate_animated", "animate_headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate_animated", "animate_headShake");
          }, 500);
          return;
        },
      });
      return;
    }

    if (password !== c_password) {
      Swal.fire("Oops", "Password And Confirm Password do not match!", "info");
      return;
    }

    try {
      console.log(`${config.url}/lawsphere-api/v1/users/register/`);
      const response = await fetch(`${config.url}/lawsphere-api/v1/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
          response.json().then((responseData) => {
            console.log(responseData);
            Swal.fire({
              icon: "error",
              title: "Signup Failed!",
              text: responseData.detail || responseData.email || responseData.password || responseData.error || "Unknown error occurred",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup Failed!",
            text: "An error occurred during signup. Please try again later.",
          });
        }
      } else {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          // text: `Response: ${JSON.stringify(responseData)}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error during signup:", error);
      Swal.fire({
        icon: "error",
        title: "An unexpected error occurred!",
        text: "Please try again later.",
      });
    }
  };

  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: logpassword,
    };

    try {
      const response = await fetch(`${config.url}/lawsphere-api/v1/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      // console.log(response.JSON);
      if (response.ok) {
        // Display success message with SweetAlert
        const responseData = await response.json();
        // console.log(responseData.access);
        // console.log(responseData.refresh);
        localStorage.setItem('access', responseData.access);
        localStorage.setItem('refresh', responseData.refresh);
        // Store the JWT token in local storage
        
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        // Display error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "ERROR!",
          text: `${errorData.detail}`,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "An unexpected error occurred!",
        text: "Please try again later.",
      });
    }
  };

  return (
    <>
    <div className="container-1">
     <div className="forms-container-1">
       <div className="signin-signup">
         <form action="#" method="post" className="sign-in-form">
           <h2 className="title">Sign in</h2>
           <div className="input-field">
             <i className="fas fa-user"></i>
             <input
               type="text"
               name="username"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
             />
           </div>
           <div className="input-field">
             <i className="fas fa-lock"></i>
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={logpassword}
               onChange={(e) => setlogpassword(e.target.value)}
             />
           </div>
           <button type="button" className="btn1 solid" onClick={handleLogin}>
             Login
           </button>
         </form>

         
       </div>
     </div>

     <div className="panels-container-1">
       <div className="panel left-panel">
       <img src="https://www.plutonic.co.in/imgs/plutonic_logo.png" className="image imglogo" alt="" />
         <div className="content">
           <h3>Welcome to Plutonic Task Management</h3>
           <p>
           Your gateway to streamlined productivity. Experience seamless task organization and team collaboration through our user-friendly interface, ensuring efficient project management at your&nbsp;fingertips.
           </p>
         </div>
       </div>
     </div>
   </div>
   </>
 )
};
export default AuthForm;
