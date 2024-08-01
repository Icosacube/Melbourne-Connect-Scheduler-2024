import React, { FC } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);
  const routeError = error as RouteError;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{routeError.statusText || routeError.message || "Unknown error"}</i>
      </p>
    </div>
  );
};
