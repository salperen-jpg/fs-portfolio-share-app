import  styled  from "styled-components";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardSharedLayout";

const MainSidebar = () => {
  const { isSidebarOpen } = useDashboardContext();

  return (
    <Wrapper>
      <aside className={isSidebarOpen ? "wide-open sidebar" : "sidebar"}>
        <div className='content'>
          <NavLinks DontCloseSidebar />
        </div>
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;
  @media (min-width: 992px) {
    & {
      display: block;
    }
    .sidebar {
      isolation: isolate;
      position: relative;
      transition: width 0.3s linear;
      min-height: 100vh;
      height: 100%;
      background: linear-gradient(
        to bottom,
        var(--sidebar-1) 20%,
        var(--sidebar-2) 60%,
        var(--sidebar-3)
      );
      width: 3rem;
    }
    .content {
      position: fixed;
      top: 0;
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      z-index: -1;
    }
    .wide-open {
      width: 7rem;
    }
    .wide-open .content {
      width: 7rem;
    }
    &:hover .content {
      width: 7rem;
    }
    &:hover .sidebar {
      width: 7rem;
    }

    .navlinks {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1rem;
      overflow: hidden;
    }
    .sidebar-link {
      width: 100%;
      color: var(--white);
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-size: 0.7rem;
      transition: var(--transition);
    }
    .sidebar-link:hover {
      padding-left: 0.3rem;
    }

    .text {
      display: none;
      flex: 1;
    }
    &:hover .text {
      display: block;
      flex: 1;
    }
    .wide-open .text {
      display: block;
      flex: 1;
    }
    .icon {
      height: 3rem;
      width: 3rem;
      display: grid;
      place-items: center;

      svg {
        font-size: 1.3rem;
      }
    }

    .active-link {
      /* background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(3px);
      font-size: 0.5rem; */
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(3px);
    }
  }
`;
export default MainSidebar;

// import  styled  from "styled-components";
// import NavLinks from "./NavLinks";
// import { useDashboardContext } from "../pages/DashboardSharedLayout";

// const MainSidebar = () => {
//   const { isSidebarOpen } = useDashboardContext();
//   return (
//     <Wrapper>
//       <div className='content'>
//         <NavLinks />
//       </div>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   display: none;
//   position: relative;
//   transition: width 0.3s linear;
//   @media (min-width: 992px) {
//     min-height: 100vh;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     background: linear-gradient(
//       to bottom,
//       var(--sidebar-1) 20%,
//       var(--sidebar-2) 60%,
//       var(--sidebar-3)
//     );
//     width: 3rem;
//     overflow: hidden;
//   }
//   .content {
//     position: fixed;
//     top: 0;
//     left: 0;
//     /* width: 100%; */
//     min-height: 100vh;
//     height: 100%;
//     display: flex;
//     align-items: center;
//   }
//   .navlinks {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
//   .sidebar-link {
//     width: 100%;
//     height: 3rem;
//     background-color: transparent;
//     display: grid;
//     grid-template-columns: 3rem 5rem;
//     place-items: center;
//     color: var(--white);
//   }
//   /* .sidebar-link:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//     backdrop-filter: blur(3px);
//     font-size: 0.5rem;
//   } */
//   .active-link {
//     background-color: rgba(255, 255, 255, 0.1);
//     backdrop-filter: blur(3px);
//     font-size: 0.5rem;
//   }
//   .text {
//     width: 100%;
//     visibility: hidden;
//     font-size: 0.75rem;
//     /* transition: var(--transition); */
//     text-transform: capitalize;
//     justify-self: flex-start;
//   }
//   .icon {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 1.1rem;
//   }
//   &:hover {
//     width: 7rem;
//   }
//   &:hover .text {
//     visibility: visible;
//   }
// `;
// export default MainSidebar;
