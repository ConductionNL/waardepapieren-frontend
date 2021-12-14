import * as React from "react";
import Layout from "../../components/common/layout";
import Certificates from "../../components/waardepapieren/certificates";
import { isLoggedIn } from "../../services/auth";

const IndexPage = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setContext({
        baseUrl: window.GATSBY_BASE_URL,
        frontendUrl: window.GATSBY_FRONTEND_URL,
      });
    }
  }, []);
  const [context, setContext] = React.useState({
    baseUrl: "",
    frontendUrl: "",
  });
  return (
    <Layout>
      <main>
        <title>Waardepapieren</title>
        <div className={"text-center mt-4"}>
          {isLoggedIn() ? (
            <>
              <Certificates />
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
                    "/handleLogin"
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
