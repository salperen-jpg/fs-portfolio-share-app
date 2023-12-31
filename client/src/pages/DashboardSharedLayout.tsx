import { createContext, useContext, useState, useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { Sidebar, MainSidebar, Navbar } from "../components";
import styled from "styled-components";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import { getInitialDarkTheme } from "../App";
import { IUser } from "../models/UserModels";
import { QueryClient, useQuery } from "@tanstack/react-query";

const linksQuery = () => {
  return {
    queryKey: ["user"],
    queryFn: async (): Promise<IUser> => {
      const response = await customAxios("/user/getUser");
      return response.data.user;
    },
  };
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(linksQuery());
  } catch (error) {
    toast.error("Please login");
    return redirect("/");
  }
};

const initialState = {
  isSidebarOpen: false,
  toggleSidebar() {},
  isDarkTheme: false,
  toggleTheme() {},
  user: {} as IUser | undefined,
  logout() {},
};

const DashboardContext = createContext(initialState);

const DashboardSharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkTheme());
  const navigation = useNavigate();
  const { data: user } = useQuery(linksQuery());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const logout = async () => {
    navigation("/login");
    await customAxios.get("/auth/logout");
    toast.success("Logged out!");
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isDarkTheme,
        toggleTheme,
        user,
        logout,
      }}
    >
      <Wrapper>
        <div className='dashboard'>
          <Sidebar />
          <MainSidebar />
          <div className='right-content'>
            <Navbar />
            <div className='outlet'>
              <Outlet />
            </div>
          </div>
        </div>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

const Wrapper = styled.main`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .outlet {
    width: 90vw;
    margin: 0 auto;
    padding: 4rem 0;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .outlet {
      width: 90%;
    }
  }
`;

export default DashboardSharedLayout;
