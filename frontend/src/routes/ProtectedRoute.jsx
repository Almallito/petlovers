import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../contexts/Auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { verifyToken, signed } = useAuth()
    return (
        <Route
          {...rest}
          render={props => {
            if (verifyToken()) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location
                    }
                  }}
                />
              );
            }
          }}
        />
      );
}

export default ProtectedRoute