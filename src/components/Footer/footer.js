import React from 'react';

const footer = () => (
    <footer className="bg-dark spacer-y-3" >
      <div className="container" >
        <div className="row align-items-center">
          <div className="col-auto mb-3 mb-md-0"> <a href="https://www.celera.com.gt">
            <img src="assets/img/logo-white.svg" alt="Celera" />
          </a>

          </div>
          <div className="col-12 col-md-auto">
            <ul className="list-unstyled d-md-flex mb-0">
              <li className="mx-md-2"><a href="#" className="text-white">Product Features</a>
              </li>
              <li className="mx-md-2"><a href="#" className="text-white">Why Celera?</a>
              </li>
              <li className="mx-md-2"><a href="#" className="text-white">Customers</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-between align-items-center mt-3 mt-md-4">
          <div className="col-lg-auto col-12 order-lg-2">
            <ul className="list-social-links d-flex mb-lg-0">
              <li className="text-white"><a href="#"><i className="socicon-facebook"></i></a>
              </li>
              <li className="text-white"><a href="#"><i className="socicon-twitter"></i></a>
              </li>
              <li className="text-white"><a href="#"><i className="socicon-youtube"></i></a>
              </li>
              <li className="text-white"><a href="#"><i className="socicon-linkedin"></i></a>
              </li>
              <li className="text-white"><a href="#"><i className="socicon-instagram"></i></a>
              </li>
            </ul>
          </div>
          <div className="col order-lg-1">
            <span className="text-small text-white opacity-50">&copy; 2019 Celera, S.A <br/> Made in <span role="img" aria-label="Guatemala-flag">🇬🇹</span></span>
          </div>
        </div>
      </div>
    </footer>
)

export default footer;
