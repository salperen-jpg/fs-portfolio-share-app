import { styled } from "styled-components";
import ToggleTheme from "./ToggleTheme";
import NavUser from "./NavUser";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { useDashboardContext } from "../pages/DashboardSharedLayout";
import { Logo } from ".";
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='btn hamburger-btn'
          onClick={toggleSidebar}
        >
          <HiOutlineBars3CenterLeft />
        </button>
        <Logo />
        <div>
          <ToggleTheme />
          <NavUser />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  .nav-center {
    width: var(--fluid-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hamburger-btn {
    background-color: transparent;
    color: var(--grey-500);
    padding-inline: 0;
    border: none;

    svg {
      font-size: 1.75rem;
      transition: var(--transition);
    }
  }
  .hamburger-btn:hover {
    svg {
      scale: 1.5;
    }
  }
  .nav-center > div {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    .nav-center {
      width: 90%;
    }
  }
`;
export default Navbar;
