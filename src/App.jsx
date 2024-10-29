import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./service/authservice";
import { login, logout } from "./slice/authSlice";
import { Header, Footer } from "./components/index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);


  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setIsLoading(false));
      console.log(authStatus);
  }, [dispatch]);

  return isLoading ? null : (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
