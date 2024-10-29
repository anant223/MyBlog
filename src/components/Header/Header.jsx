import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../service/authservice";
import { logout } from "../../slice/authSlice";
import { PenSquareIcon, LogOutIcon, User2Icon } from "lucide-react";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: "Contact",
      slug: "/contact",
    },
  ];

  const handleLogoutClick = async () => {
    try {
      const logoutService = await authService.logout();
      if (logoutService) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      throw error.message;
    }
  };
  return (
    <header className="bg-white shadow sticky">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-2xl font-bold" to={"/"}>
            <h1>MyBlog</h1>
          </Link>
        </div>
        <nav className="">
          <ul className="hidden md:flex justify-center text-xl font-semibold space-x-4">
            {navItems.map((item) => (
              <li key={item.slug} className="text-gray-600 hover:text-gray-900">
                <Link to={item.slug}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {!authStatus ? (
            <>
              <Link
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-offset-2 focus:ring-black"
                to="/login"
              >
                <User2Icon className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <Link
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center"
                to="/addpost"
              >
                <PenSquareIcon className="mr-2 h-4 w-4" />
                Write
              </Link>
              <Link className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center">
                <LogOutIcon
                  className="mr-2 h-4 w-4"
                  onClick={handleLogoutClick}
                />
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
