import * as React from "react";
import Layout from "../components/common/layout";
import { useUrlContext } from "../context/urlContext";
import { isLoggedIn } from "../services/auth";

const IndexPage = () => {
  const context = useUrlContext();
  return (
    <Layout>
      <main>
        <title>Waardepapieren</title>
        <div className={"text-center"}>
          {isLoggedIn() ? (
            <>
              <h1 className="utrecht-heading-1 utrecht-heading-1--distanced">
                Welkom bij Waardepapieren
              </h1>
              <h4 className="utrecht-heading-4 utrecht-heading-4--distanced">
                Met deze applicatie kunt u uw waardepapieren bekijken en
                aanvragen.
              </h4>
              <a
                className={"utrecht-link mt-4"}
                href={
                  context.baseUrl +
                  "/digid/login?returnUrl=" +
                  context.frontendUrl +
                  "/redirect"
                }
              >
                <button className={"utrecht-button"}>Doorgaan</button>
              </a>
            </>
          ) : (
            <>
              <h1 className="utrecht-heading-1 utrecht-heading-1--distanced">
                Welkom bij Waardepapieren
              </h1>
              <h4 className="utrecht-heading-4 utrecht-heading-4--distanced">
                U dient ingelogd te zijn om door te gaan.
              </h4>
              <div className={"mt-4"}>
                <a
                  className={"utrecht-link"}
                  href={
                    context.baseUrl +
                    "/digid/login?returnUrl=" +
                    context.frontendUrl +
                    "/redirect"
                  }
                >
                  <button className={"utrecht-button"}>Inloggen</button>
                </a>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;
