import Card from "@conductionnl/nl-design-system/lib/Card/src/card";
import * as React from "react";
import {
  WaardepapierenTable,
  SelectInputComponent,
} from "@conductionnl/nl-design-system";
import { documentDownload } from "../utility/DocumentDownload";
import { useUrlContext } from "../../context/urlContext";
import { getUser, isLoggedIn } from "../../services/auth";

export default function Waardepapieren() {
  const context = useUrlContext();

  const [waardepapieren, setWaardepapieren] = React.useState(null);

  React.useEffect(() => {
    if (isLoggedIn()) {
      fetch(
        `${
          context.apiUrl
        }/gateways/register/certificates?person=/ingeschrevenpersonen/uuid/${
          getUser().id
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("jwt"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //   setWaardepapieren(data["hydra:member"]);
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
                <form className={"mb-4"}>
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
