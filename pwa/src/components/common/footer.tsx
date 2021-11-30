import * as React from "react";

export default function Footer() {
  return (
    <footer className="utrecht-page-footer">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-sm-6">
            <h3 className="utrecht-heading-3 utrecht-heading-3--distanced">
              Contact
            </h3>
            <div>
              <i className="fas fa-phone-alt mr-2" />
              <a
                href="tel:14024"
                className="utrecht-link utrecht-link--telephone"
              >
                0229 25 22 00
              </a>
            </div>
            <div>
              <i className="fas fa-at mr-2" />
              <a
                href="mailto:gemeente@hoorn.nl"
                className="utrecht-link utrecht-link--telephone"
              >
                gemeente@hoorn.nl
              </a>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="float-right">
              <h3 className="utrecht-heading-3 utrecht-heading-3--distanced mb-2">
                Openingstijden:
              </h3>
              <p className="utrecht-paragraph utrecht-paragraph--distanced">
                <p className={"mb-0 mt-0"}>Maandag - Vrijdag: 8.00 - 17.00</p>
                <p className={"mb-0 mt-0"}>Donderdag: 8.00 - 20.00</p>
                <p className={"mb-0 mt-0"}>Vrijdag: 8.00 - 17.00</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
