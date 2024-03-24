import React, { useState } from "react";
import "./Country.css";
import Swal from "sweetalert2";
import "./ViewCountry";
import config from "./config";

const AddCountry = () => {
  const [formData, setFormData] = useState({
    name: "",
    country_code: "",
  });

  const { name, country_code } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (name === "" || country_code === "") {
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

    try {
      const response = await fetch(
        `${config.url}/lawsphere-api/v1/admin_settings/country/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            console.log(responseData);
            Swal.fire({
              icon: "error",
              title: "Country Addition Failed!",
              text:
                responseData.detail ||
                responseData.error ||
                "Unknown error occurred",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Country Creation Failed!",
            text: "An error occurred during adding country. Please try again later.",
          });
        }
      } else {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            console.log(responseData);
            Swal.fire({
              icon: "success",
              title: "Country Added Successfully!",
              text: responseData.detail,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
        Swal.fire({
          icon: "success",
          title: `Response: ${JSON.stringify(response)}`,
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

  return (
    <div className="container">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className=" shadow p-5 mb-5 bg-body-tertiary rounded">
          <form action="#" method="post" className="Country">
            <h2 className="title">Add Country</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Country Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="int"
                name="country_code"
                value={country_code}
                placeholder="Country Code"
                onChange={handleInputChange}
              />
            </div>
            

            <button type="button" className="btn_country" onClick={handleSubmit}>
              Save
            </button>
            
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default AddCountry;
