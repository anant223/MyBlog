import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading  from "./components/Loading";

const AuthValidation = ({ authentication = true, children }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authStatus === authentication) {
      setLoader(false);
    } else {
      navigate(authentication ? "/login" : "/");
    }
  }, [navigate, authStatus, authentication]);

  return loader ? <Loading /> : <>{children}</>;
};

export default AuthValidation;
