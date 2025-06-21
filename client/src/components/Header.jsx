import { User, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Header = () => {

  const user = useSelector(info => info.authReducer.auth)
//   console.log("User Info:", user);

  return (
    <header className=" shadow-lg ">
      <div className="mx-auto px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Project Name */}
          <Link to="/" className="flex-shrink-0">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              FlashCrowd
            </h1>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* User Profile */}
            <Link to="/profile">
              <div className="flex items-center hover:cursor-pointer">
                {user?.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar}
                    alt="User profile"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                {user?.fullName && (
                  <span className="ml-2 text-sm font-medium text-white ">
                    {user.fullName}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* User Profile */}
            <Link to="/profile" className="flex items-center">

              <span className="sr-only">User profile</span>
              {user?.avatar ? (
                  <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar}
                  alt="User profile"
                  />
                ) : (
                    <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
              )}
              </Link>
            
          </div>
        </div>
      </div>
      <hr></hr>
    </header>
  );
};

export default Header;