import React, { useState } from "react";
import jwt_decode from "jwt-decode";

const Header = () => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("access")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  return (
    <div className="main-header fixed-top">
      {!user ? (
        <div className="">
          <h3 className="text-center text-white mt-3">
            CHICAGOLAND EQUIPMENT SUPPLY
          </h3>
          <h5 className="text-center text-white">Vixxo &amp; Acumitica</h5>
        </div>
      ) : (
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="container-fluid">
            <a className="navbar-brand text-center" href="/">
              <img
                src={require("../images/Ces.png")}
                height={65}
                width={60}
                alt="Avatar"
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-md-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <a className="nav-link p-0" href="/dashboard">
                    <div className="h3 m-auto text-center text-white">
                      CHICAGOLAND EQUIPMENT SUPPLY
                    </div>
                    <div className="text-center h5 m-auto text-white">
                      Vixxo &amp; Acumitica
                    </div>
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav navbar-right">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/Logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
