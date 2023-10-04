import { useDashboardContext } from "../pages/DashboardSharedLayout";
import { navLinks } from "../utils/navLinks";
import { NavLink } from "react-router-dom";

interface INavLinks {
  DontCloseSidebar?: boolean;
}

const NavLinks: React.FC<INavLinks> = ({ DontCloseSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  return (
    <div className='navlinks'>
      {navLinks.map((link) => {
        const { id, path, text, icon } = link;
        if (path === "admin" && user?.role !== "admin") {
          return;
        }
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              isActive ? "active-link sidebar-link" : "sidebar-link"
            }
            end
            onClick={DontCloseSidebar ? undefined : toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            <p className='text'>{text}</p>
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
