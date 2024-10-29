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
    { name: "Home", slug: "/" },
    { name: "About", slug: "/about" },
    { name: "Contact", slug: "/contact" },
  ];

  const handleLogoutClick = async () => {
    try {
      const logoutService = await authService.logout();
      if (logoutService) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error(error.message); // Log the error to console instead of throwing it
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="text-2xl font-bold text-gray-800" to="/">
            MyBlog
          </Link>
        </div>
        <nav>
          <ul className="hidden md:flex justify-center text-lg font-semibold space-x-6">
            {navItems.map((item) => (
              <li
                key={item.slug}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Link to={item.slug}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {!authStatus ? (
            <Link
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              to="/login"
            >
              <User2Icon className="h-4 w-4 inline-block" />
            </Link>
          ) : (
            <>
              <Link
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                to="/addpost"
              >
                <PenSquareIcon className="mr-2 h-4 w-4" />
                Write
              </Link>
              <button
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleLogoutClick}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
