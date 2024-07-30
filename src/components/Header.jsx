import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const login = useSelector((state) => state.value);
  console.log(login);

  return (
    <>
      <header className="fixed left-0 top-0 w-[24rem] h-screen bg-[#4E2775] flex flex-col text-white">
        <div className="h-[6.5rem] w-[80%] mx-auto flex items-center justify-center">
          <h2 className="text-[1.7rem] font-medium">Tasks App</h2>
        </div>
        <div className="flex flex-col h-[100%] gap-[1rem] p-[2.2rem]">
          <NavLink
            to="/"
            className="text-[1.6rem] font-[500] p-[0.7rem] hover:bg-[#ffffff1a] hover:rounded-[4px]"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#ffffff1a" : "",
                borderRadius: isActive ? "4px" : "",
              };
            }}
          >
            Home
          </NavLink>

          {!login && (
            <div className="flex flex-col gap-[1rem] mt-auto">
              <NavLink
                to="/login"
                className="text-[1.6rem] font-[500] p-[0.7rem] hover:bg-[#ffffff1a] hover:rounded-[4px]"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#ffffff1a" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-[1.6rem] font-[500] p-[0.7rem] hover:bg-[#ffffff1a] hover:rounded-[4px]"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#ffffff1a" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                Register
              </NavLink>
            </div>
          )}
          {login && (
            <div className="header__nav-profile">
              <NavLink
                to="/profile"
                className="text-[1.6rem] font-[500] p-[0.7rem] hover:bg-[#ffffff1a] hover:rounded-[4px]"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#ffffff1a" : "",
                    borderRadius: isActive ? "4px" : "",
                  };
                }}
              >
                My Profile
              </NavLink>
            </div>
          )}
        </div>
        {/* <div className="header__logout">
          {login && (
            <div className="header__logout-container">
              <div>
                <div className="header__logout-name-container">
                  <p className="header__logout-name">
                    {actualUser.name?.toUpperCase()}{" "}
                    {actualUser.surname?.charAt(0).toUpperCase()}.
                  </p>
                </div>
                <div className="header__logout-email">{actualUser.email}</div>
              </div>
              <LogoutIcon
                fontSize="large"
                className="header__logout-icon"
                onClick={logoutHandler}
              />
            </div>
          )}
        </div> */}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
