import { useRouteError, Link } from "react-router-dom";
import styled from "styled-components";
import errorImg from "../assets/error.svg";

const Error = () => {
  const error = useRouteError() as { status: number };
  if (error?.status === 404) {
    return (
      <Wrapper>
        <div className='banner'>
          <img src={errorImg} alt='404' />
          <h4>Page does not exist</h4>
          <p>It seems we can not find the page you look for !</p>
          <Link to='/dashboard' className='btn error-btn'>
            go dashboard
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>Error !!</h3>
    </Wrapper>
  );
};

// FIX CUSTOMIZE LINK PAGE

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .banner {
    width: var(--fluid-width);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  img {
    max-width: 40rem;
  }
`;

export default Error;
