import React, { useState ,useEffect} from "react";
import "./State.css";
import Swal from "sweetalert2";
import config from "./config";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    designation: "",
    department: "", 
    mobile: "",
    email: "",
    court: "",
    permanent_address: "",
    aadhaar_no: "",
  });

  const { first_name,last_name,dob,designation,department,mobile,email,court,permanent_address,aadhaar_no } = formData;
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setdepartmentList] = useState([]);
  const [courtList, setcourtList] = useState([]);

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/?name=Designation`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        }   
    );

        if (response.ok) {
          const designationData = await response.json();
          console.log(designationData);
          setDesignationList(designationData.results || []);
        } else {
          console.error("Failed to fetch designation list");
        }
      } catch (error) {
        console.error("Error fetching designation list:", error);
      }
    };

    const fetchDepartment = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/?name=Department`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        }   
    );

        if (response.ok) {
          const departmentData = await response.json();
          setdepartmentList(departmentData.results);
        } else {
          console.error("Failed to fetch department list");
        }
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };

    const fetchCourt = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/court/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        }   
    );

        if (response.ok) {
          const courtData = await response.json();
          setcourtList(courtData.results);
        } else {
          console.error("Failed to fetch court list");
        }
      } catch (error) {
        console.error("Error fetching court list:", error);
      }
    };

    fetchDesignation();
    fetchCourt();
    fetchDepartment();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  

  const handleSubmit = async () => {
    if (first_name === "" || last_name==="" ) {
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
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI2MjA2LCJpYXQiOjE3MDEzNDIyMDYsImp0aSI6ImNjODg4NzE5YTg0MzRlYTZhOTg4Yjg5NTM5ODRjMTk1IiwidXNlcl9pZCI6MjJ9.GreZU0i_JMmG1x3gRGVpWjF4rJ7RxRZJlw6A4-mvwwQ";
      const response = await fetch(
        `${config.url}/lawsphere-api/v1/admin_settings/employee/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            // console.log(responseData);
            Swal.fire({
              icon: "error",
              title: "Employee Addition Failed!",
              text:
                responseData.detail ||
                responseData.error ||
                "Unknown error occurred",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Employee Creation Failed!",
            text: "An error occurred during adding Employee. Please try again later.",
          });
        }
      } else {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          response.json().then((responseData) => {
            // console.log(responseData);
            Swal.fire({
              icon: "success",
              title: "Employee Added Successfully!",
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
      // console.error("Error during signup:", error);
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
          <form action="#" method="post" className="state">
            <h2 className="title">Add Employee</h2>
            
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="court"
                value={court}
                onChange={handleInputChange}
                style={{backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '15px'}}
              >
                <option value="" disabled>
                  Select court
                </option>
                {courtList.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="first_name"
                value={first_name}
                placeholder="First Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="last_name"
                value={last_name}
                placeholder="Last Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="date"
                name="dob"
                value={dob}
                placeholder="Date of Birth"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="designation"
                value={designation}
                onChange={handleInputChange}
                style={{backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '15px'}}
              >
                <option value="" disabled>
                  Select designation
                </option>
                {designationList.map((designation) => (
                  <option key={designation.id} value={designation.id}>
                    {designation.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="department"
                value={department}
                onChange={handleInputChange}
                style={{backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '15px'}}
              >
                <option value="" disabled>
                  Select department
                </option>
                {departmentList.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.value}
                  </option>
                ))}
              </select>
            </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="int"
                  name="mobile"
                  value={mobile}
                  placeholder="Mobile No."
                  onChange={handleInputChange}
                />
                </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
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
                name="permanent_address"
                value={permanent_address}
                placeholder="Permanent Address"
                onChange={handleInputChange}
              />
              </div>
              <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="int"
                name="aadhaar_no"
                value={aadhaar_no}
                placeholder="Aadhaar No."
                onChange={handleInputChange}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;