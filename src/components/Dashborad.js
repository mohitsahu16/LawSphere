import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import dashBorad from "./img/dashBoard.png";
import "./Dashboard.css";
import config from "./config";
import ViewCountry from "./ViewCountry";
import AddCountry from "./Country";
import ViewState from "./ViewState";
import AddState from "./State";
import ViewCity from "./ViewCity";
import AddCity from "./City";
import ViewCourt from "./ViewCourt";
import AddCourt from "./AddCourt";
import AddEmployee from "./AddEmployee";
import ViewEmployee from "./ViewEmployee";
import AddCase from "./AddCase";
import ViewCases from "./ViewCases";

const Dashboard = () => {
  const navigate = useNavigate();
  const alternateColors = [ "#87CEEB","white"];
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCountryTable, setShowCountryTable] = useState(false);
  const [username, setUsername] = useState(""); // Add state to store the username
  const [showAddCountryForm, setShowAddCountryForm] = useState(false);
  const [showAddStateForm, setShowAddStateForm] = useState(false);
  const [showViewStateTable, setShowViewStateTable] = useState(false);
  const [showAddCityForm, setShowAddCityForm] = useState(false);
  const [showViewCityTable, setShowViewCityTable] = useState(false);
  const [showAddCourtForm, setShowAddCourtForm] = useState(false);
  const [showViewCourtTable, setShowViewCourtTable] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [showViewEmployeeTable, setShowViewEmployeeTable] = useState(false);
  const [showAddCasesForm, setShowAddCasesForm] = useState(false);
  const [showViewCasesTable, setShowViewCasesTable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${config.url}/lawsphere-api/v1/users/user_clone/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          // console.log("User Data:", userData); // Log the user data
          setUsername(
            userData.user.first_name + " " + userData.user.last_name || "Guest"
          );
        } else {
          console.error("Failed to fetch user data");
          console.error("Response:", response); // Log the response for debugging
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      if (showCountryTable) {
        setSidebarCollapsed(true);
      }
    };

    fetchUserData();
  }, [showCountryTable]);

  useEffect(() => {
    const x = window.matchMedia("(max-width: 400px)");
    const updateSidebar = () => {
      if (x.matches) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // Call listener function at run time
    updateSidebar();

    // Attach listener function on state changes
    x.addEventListener("change", updateSidebar);

    // Cleanup the event listener on component unmount
    return () => {
      x.removeEventListener("change", updateSidebar);
    };
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleViewCountry = () => {
    // Set the state to show the CountryTable component
    if (showCountryTable == false){ setShowCountryTable(true);setSidebarCollapsed(true);}
    else setShowCountryTable(false);
  };

  const handleAddCountry = () => {
    if (showAddCountryForm == true) setShowAddCountryForm(false);
    else setShowAddCountryForm(true);
    setShowCountryTable(false); // Close the View Country table if open
  };

  const handleAddState = () => {
    if (showAddStateForm) {
      setShowAddStateForm(false);
    } else {
      setShowAddStateForm(true);
    }
    setShowViewStateTable(false); // Close the View State table if open
  };

  const handleViewState = () => {
    // Set the state to show the ViewState component
    if (showViewStateTable) {
      setShowViewStateTable(false);
    } else {
      setShowViewStateTable(true);
    }
    setShowAddStateForm(false); // Close the Add State form if open
  };

  const handleAddCity = () => {
    if (showAddCityForm) {
      setShowAddCityForm(false);
    } else {
      setShowAddCityForm(true);
    }
    setShowViewCityTable(false); // Close the View City table if open
  };

  const handleViewCity = () => {
    if (showViewCityTable) {
      setShowViewCityTable(false);
    } else {
      setShowViewCityTable(true);
    }
    setShowAddCityForm(false); // Close the Add City form if open
  };

  const handleAddCourt = () => {
    if (showAddCourtForm) {
      setShowAddCourtForm(false);
    } else {
      setShowAddCourtForm(true);
      setShowViewCourtTable(false); // Close the View Court table if open
    }
  };

  const handleViewCourt = () => {
    if (showViewCourtTable) {
      setShowViewCourtTable(false);
    } else {
      setShowViewCourtTable(true);
      setShowAddCourtForm(false); // Close the Add Court form if open
    }
  };

  const handleAddEmployee = () => {
    if (showAddEmployeeForm) {
      setShowAddEmployeeForm(false);
    } else {
      setShowAddEmployeeForm(true);
    }
    // Close other forms or tables if open
    setShowCountryTable(false);
    setShowAddStateForm(false);
    setShowViewStateTable(false);
    setShowAddCityForm(false);
    setShowViewCityTable(false);
    setShowAddCourtForm(false);
    setShowViewCourtTable(false);
  };

  const handleViewEmployee = () => {
    if (showViewEmployeeTable) {
      setShowViewEmployeeTable(false);
    } else {
      setShowViewEmployeeTable(true);
    }
    // Close other forms or tables if open
    setShowCountryTable(false);
    setShowAddStateForm(false);
    setShowViewStateTable(false);
    setShowAddCityForm(false);
    setShowViewCityTable(false);
    setShowAddCourtForm(false);
    setShowViewCourtTable(false);
  };

  const handleAddCases = () => {
    if (showAddCasesForm) {
      setShowAddCasesForm(false);
    } else {
      setShowAddCasesForm(true);
      setShowViewCasesTable(false); // Close the View Cases table if open
    }
  };

  const handleViewCases = () => {
    if (showViewCasesTable) {
      setShowViewCasesTable(false);
    } else {
      setShowViewCasesTable(true);
      setShowAddCasesForm(false); // Close the Add Cases form if open
    }
  };

  const handleLogout = async () => {
    try {
      // Make API call to log out
      await fetch(`${config.url}/lawsphere-api/v1/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed
        },
        // Include refresh token in the request body
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refresh"),
        }),
      });

      // Clear local storage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      //alert to logout
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully!",
        timer: 1500, // Set the duration in milliseconds (1.5 seconds)
        showConfirmButton: false,
      });

      // Redirect to login page
      navigate("/"); // Update with the actual path to your login page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    // Initialize Bootstrap components after rendering
    const bootstrapToggle = new window.bootstrap.Collapse(
      document.getElementById("sidebar"),
      {
        toggle: false,
      }
    );

    // Update Bootstrap toggle state based on React state
    isSidebarCollapsed ? bootstrapToggle.hide() : bootstrapToggle.show();
  }, [isSidebarCollapsed]);

  return (
    <div style={{ overflowY: "hidden" }}>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-body-${
          isSidebarCollapsed ? "collapsed" : "*"
        }`}
      >
        <div className="container-fluid">
          <button className="btn" type="button" onClick={handleToggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            LAWSPHERE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          ></div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i> &nbsp;{username}
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user me-2"></i> Manage Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-key me-2"></i> Change Password
                </a>
                <a
                  className="dropdown-item"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i> Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`wrapper ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <aside id="sidebar">
          <div className="h-100">
            <ul className="sidebar-nav">
              <li className="sidebar-item">
                <a href="/dashboard" className="sidebar-link">
                  <i className="fa-solid fa-sliders pe-2"></i> Dashboard
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#multi"
                  aria-expanded="false"
                  aria-controls="multi"
                >
                  <i className="fa-solid fa-gear"></i> Dyanmic Settings
                </a>
                <ul
                  id="multi"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link collapsed small"
                      data-bs-toggle="collapse"
                      data-bs-target="#multi-two"
                      aria-expanded="false"
                      aria-controls="multi-two"
                    >
                      Location Settings
                    </a>
                    <ul
                      id="multi-two"
                      className="sidebar-dropdown list-unstyled collapse"
                    >
                      <li className="sidebar-item">
                        <a
                          href="#"
                          className="sidebar-link collapsed small"
                          data-bs-toggle="collapse"
                          data-bs-target="#country"
                          aria-expanded="false"
                          aria-controls="country"
                        >
                          Country
                        </a>
                        <ul
                          id="country"
                          className="sidebar-dropdown list-unstyled collapse"
                        >
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleAddCountry}
                            >
                              Add Country
                            </a>
                          </li>
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleViewCountry}
                            >
                              View Country
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="sidebar-item">
                        <a
                          href="#"
                          className="sidebar-link collapsed small"
                          data-bs-toggle="collapse"
                          data-bs-target="#state"
                          aria-expanded="false"
                          aria-controls="state"
                        >
                          State
                        </a>
                        <ul
                          id="state"
                          className="sidebar-dropdown list-unstyled collapse"
                        >
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleAddState}
                            >
                              Add State
                            </a>
                          </li>
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleViewState}
                            >
                              View State
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="sidebar-item">
                        <a
                          href="#"
                          className="sidebar-link collapsed small"
                          data-bs-toggle="collapse"
                          data-bs-target="#city"
                          aria-expanded="false"
                          aria-controls="city"
                        >
                          City
                        </a>
                        <ul
                          id="city"
                          className="sidebar-dropdown list-unstyled collapse"
                        >
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleAddCity}
                            >
                              Add City
                            </a>
                          </li>
                          <li className="sidebar-item">
                            <a
                              href="#"
                              className="sidebar-link text-center small"
                              onClick={handleViewCity}
                            >
                              View City
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <i className="fa-regular fa-user pe-2"></i>
                  Court
                </a>
                <ul
                  id="auth"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center"
                      onClick={handleAddCourt}
                    >
                      Add Court
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center"
                      onClick={handleViewCourt}
                    >
                      View Court
                    </a>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#employee"
                  aria-expanded="false"
                  aria-controls="employee"
                >
                  <i className="fa-regular fa-user pe-2"></i>
                  Employee
                </a>
                <ul
                  id="employee"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center"
                      onClick={handleAddEmployee}
                    >
                      Add Employee
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center"
                      onClick={handleViewEmployee}
                    >
                      View Employee
                    </a>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#cases"
                  aria-expanded="false"
                  aria-controls="cases"
                >
                  <i className="fa-solid fa-briefcase"></i> Cases
                </a>
                <ul
                  id="cases"
                  className="sidebar-dropdown list-unstyled collapse"
                  data-bs-parent="#sidebar"
                >
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center small"
                      onClick={handleAddCases}
                    >
                      Add Cases
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a
                      href="#"
                      className="sidebar-link text-center small"
                      onClick={handleViewCases}
                    >
                      View Cases
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
        <div className="main">
          <main className="content px-3 py-2">
            <div className="container-fluid">
              {showCountryTable ? (
                <ViewCountry />
              ) : showAddCountryForm ? (
                <AddCountry />
              ) : showViewStateTable ? (
                <ViewState />
              ) : showAddStateForm ? (
                <AddState />
              ) : showViewCityTable ? (
                <ViewCity />
              ) : showAddCityForm ? (
                <AddCity />
              ) : showAddCourtForm ? (
                <AddCourt />
              ) : showViewCourtTable ? (
                <ViewCourt />
              ) : showAddEmployeeForm ? (
                <AddEmployee />
              ) : showViewEmployeeTable ? (
                <ViewEmployee />
              ) : showAddCasesForm ? ( // Render Add Cases component conditionally
                <AddCase />
              ) : showViewCasesTable ? ( // Render View Cases component conditionally
                <ViewCases />
              ) : (
                <div>
                  {/* First Row */}
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="p-2 d-flex flex-row">
                        <img className="img-fluid" src={dashBorad} alt="pic" />
                        <h3 className="pt-5">Welcome {username}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body bg-info text-dark">
                          <h5 className="card-title">Total Cases</h5>
                          <p className="card-text">1000</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-blue">
                        <div className="card-body">
                          <h5 className="card-title">Pending Cases</h5>
                          <p className="card-text">500</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body bg-info text-dark">
                          <h5 className="card-title">Disposed Cases</h5>
                          <p className="card-text">500</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-blue">
                        <div className="card-body">
                          <h5 className="card-title">High Courts</h5>
                          <p className="card-text">10</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body bg-info text-dark">
                          <h5 className="card-title">District Courts</h5>
                          <p className="card-text">50</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-blue">
                        <div className="card-body">
                          <h5 className="card-title"></h5>
                          <p className="card-text">Value</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Bootstrap and script imports */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default Dashboard;
