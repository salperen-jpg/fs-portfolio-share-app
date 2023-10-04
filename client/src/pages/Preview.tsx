import styled from "styled-components";
import { useLoaderData, Link } from "react-router-dom";
import customAxios from "../utils/customAxios";
import { useDashboardContext } from "./DashboardSharedLayout";
import { ILink } from "../models/LinkModel";
import LinkComponent from "../components/Link";
import { toast } from "react-toastify";
import PageHero from "../components/PageHero";
import { LuImagePlus } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { PiCloudWarningFill } from "react-icons/pi";

export const loader = async () => {
  try {
    const { data } = await customAxios("/links");
    return data.links;
  } catch (error: any) {
    return toast.error(error?.response?.data?.msg);
  }
};

const Links = () => {
  const { user } = useDashboardContext();
  const links = useLoaderData() as ILink[];

  return (
    <Wrapper>
      <PageHero />
      <div className='outer-content'>
        <div className='profile'>
          <div className='img-container'>
            {user?.avatar ? (
              <img src={user?.avatar} className='image' alt={user?.name} />
            ) : (
              <FaUserAlt className='image' />
            )}
            <Link to='profile' className='add-image'>
              <LuImagePlus />
            </Link>
          </div>
          <h5>
            {user?.name} {user?.lastName}
          </h5>
          <span>{user?.devRole}</span>
        </div>
        {links.length > 0 ? (
          <div className='links'>
            {links.map((link: ILink) => {
              return <LinkComponent key={link._id} {...link} />;
            })}
          </div>
        ) : (
          <div className='no-link'>
            <span className='warning'>
              <PiCloudWarningFill />
            </span>
            <p>It seems you don't have any link yet , add some !</p>
            <Link to='./addLink' className='btn add-btn'>
              Add link
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: calc(100vh - var(--nav-height) - 8rem);
  margin-top: -4rem;

  .outer-content {
    display: grid;
    justify-content: center;
    background-color: var(--profile-container);
    border-radius: 10px;
    width: 80vw;
    padding: 2rem;
    max-width: 30rem;
    margin: 0 auto;
    margin-top: -10rem;
    box-shadow: var(--shadow-1);
  }
  .profile {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-transform: capitalize;
  }
  .img-container {
    position: relative;
    width: 100px;
    height: 100px;
    isolation: isolate;
  }
  .add-image {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--grey-700);
    color: var(--white);
    cursor: pointer;
  }
  .img-container::after {
    content: "";
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      var(--sidebar-1) 20%,
      var(--sidebar-2) 60%,
      var(--sidebar-3)
    );
  }
  .image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  img {
    object-fit: cover;
  }

  .no-link {
    padding: 1.5rem;
    text-align: center;
    border-radius: 10px;
    border: 1px solid var(--grey-300);
    position: relative;
    p {
      max-width: 15rem;
      margin-block: 1;
      line-height: 2;
      text-align: center;
    }
    .add-btn {
      display: inline-block;
      margin-top: 1rem;
    }
  }
  .warning {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    svg {
      font-size: 1.75rem;
      color: #bdbd55;
    }
  }
`;

export default Links;

/*


<div className='outer-content'>
        <div className='profile'>
          <div className='img-container'>
            <img src={user.avatar} alt={user.name} />
          </div>
          <h5>
            {user.name} {user.lastName}
          </h5>
          <span>{user.devRole}</span>
        </div>
        <div className='links'>
          {links.map((link: ILink) => {
            return <Link key={link._id} {...link} />;
          })}
        </div>
      </div>





      min-height: calc(100vh - var(--nav-height) - 8rem);
  display: grid;
  place-items: center;
  .outer-content {
    display: grid;
    justify-content: center;
    width: var(--fluid-width);
    max-width: 900px;
  }
  .profile {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-transform: capitalize;
  }
  .img-container {
    position: relative;
    width: 100px;
    height: 100px;
  }
  .img-container::after {
    content: "";
    position: absolute;
    top: -0.75rem;
    right: -0.75rem;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      var(--sidebar-1) 20%,
      var(--sidebar-2) 60%,
      var(--sidebar-3)
    );
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
  @media (min-width: 992px) {
    .outer-content {
      grid-template-columns: 400px 1fr;
      gap: 3rem;
    }
    .profile {
      margin: 0;
    }
  }

*/
