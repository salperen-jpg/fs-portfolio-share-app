import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { useDashboardContext } from "./DashboardSharedLayout";
import { ILink } from "../models/LinkModel";
import LinkComponent from "../components/Link";

const Links = () => {
  const links = useLoaderData() as ILink[];
  const { user } = useDashboardContext();
  return (
    <Wrapper>
      <div className='info-container'>
        <span>hi {user?.name}!</span>
        <p>
          Make sure you created your application urls correctly,otherwise you
          might lead people go incorrect pages.
        </p>
        <button className='btn'>preview</button>
      </div>
      <div className='links'>
        <h3>your links</h3>
        {links.map((link: ILink) => {
          return <LinkComponent key={link._id} {...link} showButtons={true} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  .info-container {
    padding: 1rem;
    box-shadow: var(--shadow-1);
    width: 90vw;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: start;
    align-items: flex-start;
  }
  span {
    font-family: var(--secondary-font);
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
  }
  p {
    line-height: 2;
    letter-spacing: var(--spacing);
  }
  .links {
    h3 {
      font-family: var(--secondary-font);
      text-transform: capitalize;
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 992px) {
    & {
      align-items: flex-start;
      grid-template-columns: 30rem 1fr;
      gap: 5rem;
    }
  }
`;

export default Links;
