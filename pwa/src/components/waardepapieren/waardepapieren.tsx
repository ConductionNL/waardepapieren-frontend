import Card from "@conductionnl/nl-design-system/lib/Card/src/card";
import * as React from "react";
import {
  WaardepapierenTable,
  SelectInputComponent,
} from "@conductionnl/nl-design-system";
import { documentDownload } from "../utility/DocumentDownload";
import { useUrlContext } from "../../context/urlContext";
import { getUser, isLoggedIn } from "../../services/auth";
import { navigate } from "gatsby-link";

export default function Waardepapieren() {
  const context = useUrlContext();

  const [waardepapieren, setWaardepapieren] = React.useState(null);

  React.useEffect(() => {
    if (isLoggedIn()) {
      fetch(
        `${context.apiUrl}/gateways/register/certificates?person=/ingeschrevenpersonen/900220855&limit=5000&order[dateCreated]=desc`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setWaardepapieren(data["hydra:member"]);
        });
    }
  }, []);

  const options = [
    {
      name: "Akte van geboorte",
      value: "akte_van_geboorte",
    },
    {
      name: "Verklaring van in leven zijn",
      value: "verklaring_van_in_leven_zijn",
    },
    {
      name: "Uitreksel basis registratie personen",
      value: "uitreksel_basis_registratie_personen",
    },
  ];

  const handleCertificate = (event) => {
    event.preventDefault();
    const type = event.target.waardepapier.value;

    let price = null;

    switch (type) {
      case "akte_van_geboorte":
        price = 1400;
        break;
      case "verklaring_van_in_leven_zijn":
        price = 1400;
        break;
      case "uitreksel_basis_registratie_personen":
        break;
      default:
        price = null;
        break;
    }

    if (price === null) {
      return;
    }

    const body = {
      organization: "001516814",
      price: price,
      type: type,
      person: "900220855",
      name: getUser().name,
      ingenicoUrl: `${context.frontendUrl}/pay-certificate`,
    };

    fetch(`${context.apiUrl}/gateways/service/payments`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("payment", JSON.stringify(data));
          navigate("/pay-certificate");
        }
      });
  };
  return (
    <>
      <div>
        <Card
          title={"Waardepapier"}
          cardHeader={function () {
            return <p></p>;
          }}
          cardBody={function () {
            return (
              <>
                <form onSubmit={handleCertificate} className={"mb-4"}>
                  <div className="row">
                    <div className="col-8">
                      <SelectInputComponent
                        required={true}
                        options={options}
                        name={"waardepapier"}
                        nameOverride={"Type Waardepapier"}
                        id={"waardepapieren"}
                      />
                    </div>
                    <div className="col-4 d-flex mt-auto mb-1">
                      <button className={"utrecht-button"}>Aanvragen</button>
                    </div>
                  </div>
                </form>
                <div>
                  {waardepapieren !== null ? (
                    <WaardepapierenTable
                      rows={waardepapieren}
                      fileFunction={documentDownload}
                    />
                  ) : (
                    <WaardepapierenTable
                      rows={[]}
                      fileFunction={documentDownload}
                    />
                  )}
                </div>
              </>
            );
          }}
        />
      </div>
    </>
  );
}
