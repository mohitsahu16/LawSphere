import React, { useState, useEffect } from "react";
import "./State.css";
import Swal from "sweetalert2";
import config from "./config";

const AddCourt = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    country: "",
    state: "",
    city: "",
    category: "",
    manager: "",
  });

  const {
    name,
    email,
    mobile,
    address,
    country,
    state,
    city,
    category,
    manager,
  } = formData;

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/country/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        if (response.ok) {
          const countryData = await response.json();
          setCountryList(countryData.results || []);
        } else {
          console.error("Failed to fetch country list");
        }
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/?name=Court Category`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        if (response.ok) {
          const categoryData = await response.json();
          setCategoryList(categoryData.results || []);
        } else {
          console.error("Failed to fetch category list");
        }
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };

    const fetchManagers = async () => {
      try {
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/users/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        if (response.ok) {
          const managerData = await response.json();
          // console.log(managerData);
          setManagerList(managerData || []);
          // console.log(managerData);
        } else {
          console.error("Failed to fetch manager list");
        }
      } catch (error) {
        console.error("Error fetching manager list:", error);
      }
    };

    fetchCountries();
    fetchCategories();
    fetchManagers();
  }, []);

  const fetchStatesAndCities = async (selectedCountry) => {
    try {
      const response = await fetch(
        `${config.url}/lawsphere-api/v1/admin_settings/state/?country=${selectedCountry}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.ok) {
        const stateData = await response.json();
        setStateList(stateData.results || []);
      } else {
        console.error("Failed to fetch state list");
      }
    } catch (error) {
      console.error("Error fetching state list:", error);
    }
  };

  const fetchCities = async (selectedState) => {
    try {
      const response = await fetch(
        `${config.url}/lawsphere-api/v1/admin_settings/city/?state=${selectedState}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.ok) {
        const cityData = await response.json();
        setCityList(cityData.results || []);
      } else {
        console.error("Failed to fetch city list");
      }
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountry,
      state: "",
      city: "",
    }));
    fetchStatesAndCities(selectedCountry);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "",
    }));
    fetchCities(selectedState);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  };

  const handleManagerChange = (e) => {
    const selectedManager = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      manager: selectedManager,
    }));
  };

  const handleSubmit = async () => {
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      address === "" ||
      country === "" ||
      state === "" ||
      city === "" ||
      category === "" ||
      manager === ""
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

    try {
      const response = await fetch(
        `${config.url}/lawsphere-api/v1/admin_settings/court/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            Swal.fire({
              icon: "error",
              title: "Court Addition Failed!",
              text:
                responseData.detail ||
                responseData.error ||
                "Unknown error occurred",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Court Creation Failed!",
            text: "An error occurred during adding court. Please try again later.",
          });
        }
      } else {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            Swal.fire({
              icon: "success",
              title: "Court Added Successfully!",
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
      Swal.fire({
        icon: "error",
        title: "An unexpected error occurred!",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="container" style={{height:'50%'}}>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className=" shadow p-5 mb-5 bg-body-tertiary rounded">
          <form action="#" method="post" className="state">
            <h2 className="title">Add Court</h2>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="country"
                value={country}
                onChange={handleCountryChange}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countryList.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="state"
                value={state}
                onChange={handleStateChange}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <option value="" disabled>
                  Select State
                </option>
                {stateList.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="city"
                value={city}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <option value="" disabled>
                  Select City
                </option>
                {cityList.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.value}
                    {/* {console.log(category)} */}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="manager"
                value={manager}
                onChange={handleManagerChange}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "none",
                  borderRadius: "15px",
                }}
              >
                <option value="" disabled>
                  Select Manager
                </option>
                {managerList.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.first_name+" " +manager.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="mobile"
                value={mobile}
                placeholder="Mobile"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="btn_state"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourt;
