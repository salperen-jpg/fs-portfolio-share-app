import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardSharedLayout";
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
    z-index: -1;
    visibility: hidden;
    transform: scale(0);
    transition: var(--transition);
  }

  .show-sidebar {
    transform: scale(1);
    visibility: visible;
    z-index: 999;
  }
  .content {
    width: 90vw;
    height: 90vh;
    background-color: var(--profile-container);
    position: relative;
    display: grid;
    place-items: center;
  }
  .close-btn {
    position: absolute;
    top: 3rem;
    right: 3rem;
    background-color: transparent;
    border: transparent;
    font-size: 2rem;
    color: var(--primary-500);
    cursor: pointer;
  }
  .navlinks {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--grey-600);
    text-transform: capitalize;
    transition: var(--transition);
  }
  .sidebar-link:hover {
    padding-left: 0.5rem;
  }
  .icon {
    font-size: 1.4rem;
    color: var(--grey-600);
    display: flex;
    align-items: center;
  }
  .text {
    font-weight: 600;
  }
`;
export default Sidebar;
