import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="flex justify-between text-[1.8rem] font-medium border-b-[1px] border-b-[rgb(0,0,0,0.5)] py-5 pl-[5%] pr-[5%]">
        <p className="">Tasks App</p>
        <div className="flex gap-8">
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Register
          </NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
