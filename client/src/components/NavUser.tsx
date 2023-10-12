import { styled } from "styled-components";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useDashboardContext } from "../pages/DashboardSharedLayout";
import { Link } from "react-router-dom";

const NavUser = () => {
  const { user, logout } = useDashboardContext();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <Wrapper onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
      {isDropDownOpen ? (
        <BiSolidUpArrow className='icon' />
      ) : (
        <BiSolidDownArrow className='icon' />
      )}
      {user?.name}
      {user!.avatar ? <img src={user?.avatar}></img> : <FaUserAlt />}
      <div className={isDropDownOpen ? "dropDown show-dropDown" : "dropDown"}>
        <Link to='profile' className='btn profile-btn'>
          profile
        </Link>
        <button className='btn logout-btn' onClick={logout}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 0.5rem;
  background-color: transparent;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: var(--spacing);
  gap: 1rem;
  border: 1px solid var(--grey-300);
  border-radius: 10px;
  font-size: 0.75rem;
  cursor: pointer;
  .icon {
    font-size: 0.5rem;
  }
  img {
    width: 1.75rem;
    height: 1.75rem;
    object-fit: cover;
    border-radius: 50%;
  }
  .dropDown {
    position: absolute;
    top: 3.5rem;
    left: 0;
    width: 100%;
    z-index: -1;
    visibility: hidden;
    display: none;
    border: 1px solid var(--grey-300);
    border-radius: 10px;
    background-color: var(--profile-container);
  }
  .show-dropDown {
    z-index: 99;
    visibility: visible;
    display: block;
    transition: all 0.3 ease-in-out;
  }
  .profile-btn,
  .logout-btn {
    display: block;
    width: 100%;
    padding: 0.75rem 0;
    border-radius: 0;
    width: 100%;
    font-size: 0.7rem;
    text-transform: capitalize;
    background-color: transparent;
    border: none;
    text-align: center;
    color: inherit;
  }

  .profile-btn {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .logout-btn {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .logout-btn:hover,
  .profile-btn:hover {
    border: none;
    background: var(--grey-300);
  }
`;
export default NavUser;
