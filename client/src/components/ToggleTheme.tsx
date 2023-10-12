import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardSharedLayout";
import styled from "styled-components";

const ToggleTheme = () => {
  const { isDarkTheme, toggleTheme } = useDashboardContext();

  return (
    <ThemeButton className='btn toggle-theme' onClick={toggleTheme}>
      {isDarkTheme ? <BsFillMoonFill /> : <BsFillSunFill />}
    </ThemeButton>
  );
};

const ThemeButton = styled.button`
  border: none;
  background: none;
  color: var(--primary-500);
  svg {
    font-size: 1.2rem;
  }
  &:hover {
    background-color: transparent;
    transform: scale(1.5);
  }
`;

export default ToggleTheme;
