import React, { useState ,useEffect} from "react";
import "./State.css";
import Swal from "sweetalert2";
import config from "./config";

const AddCase = () => {
  const [formData, setFormData] = useState({
    court: "",
    accused: "",
    victim: "",
    title: "",
    description: "",
    next_hearing_date: "",
    previous_hearing_date: "",
    next_hearing_time: ""
  });

  const { title,description,next_hearing_date,previous_hearing_date,accused,victim,mobile,email,court,next_hearing_time,aadhaar_no } = formData;
  const [accusedList, setaccusedList] = useState([]);
  const [victimList, setvictimList] = useState([]);
  const [courtList, setcourtList] = useState([]);

  useEffect(() => {
    const fetchaccused = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/customer/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        }   
    );

        if (response.ok) {
          const accusedData = await response.json();
          console.log(accusedData);
          setaccusedList(accusedData.results || []);
        } else {
          console.error("Failed to fetch accused list");
        }
      } catch (error) {
        console.error("Error fetching accused list:", error);
      }
    };

    const fetchvictim = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NTI0NTY1LCJpYXQiOjE3MDEzNDA1NjUsImp0aSI6IjA3OWQ2YmY4NjE5MjQ5OGM5NDI4YmQwMzZjMjllODk0IiwidXNlcl9pZCI6MX0._184KouM6L7OeRIb4pCkH_mdcyekIQx0NSgwtQ7gqQ4";
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/admin_settings/customer/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
        }   
    );

        if (response.ok) {
          const victimData = await response.json();
          setvictimList(victimData.results);
        } else {
          console.error("Failed to fetch victim list");
        }
      } catch (error) {
        console.error("Error fetching victim list:", error);
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

    fetchaccused();
    fetchCourt();
    fetchvictim();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  

  const handleSubmit = async () => {
    if (title === "" || description==="" ) {
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
        `${config.url}/lawsphere-api/v1/admin_settings/case/`,
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
              title: "Case Addition Failed!",
              text:
                responseData.detail ||
                responseData.error ||
                "Unknown error occurred",
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Case Creation Failed!",
            text: "An error occurred during adding Case. Please try again later.",
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
              title: "Case Added Successfully!",
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
            <h2 className="title">Add Case</h2>
            
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
                    {court.name}, {court.city_data.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="accused"
                value={accused}
                onChange={handleInputChange}
                style={{backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '15px'}}
              >
                <option value="" disabled>
                  Select accused
                </option>
                {accusedList.map((accused) => (
                  <option key={accused.id} value={accused.id}>
                    {accused.first_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-globe"></i>
              <select
                name="victim"
                value={victim}
                onChange={handleInputChange}
                style={{backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '15px'}}
              >
                <option value="" disabled>
                  Select victim
                </option>
                {victimList.map((victim) => (
                  <option key={victim.id} value={victim.id}>
                    {victim.first_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="Description"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="date"
                name="next_hearing_date"
                value={next_hearing_date}
                placeholder="Next Hearing Date"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="date"
                name="previous_hearing_date"
                value={previous_hearing_date}
                placeholder="Previous Hearing Date"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="time"
                name="next_hearing_time"
                value={next_hearing_time}
                placeholder="Next Hearing Time"
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

export default AddCase;