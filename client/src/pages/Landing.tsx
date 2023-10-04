import styled from "styled-components";
import mainImg from "../assets/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='hero'>
        <div className='info'>
          <h1>
            Portfolio <span className='colorful-text'>Sharing</span> App
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet id
            unde ea quasi consequuntur tempore libero ipsam. Voluptatibus
            consectetur ex dolores dolorum delectus, vel tempora ducimus.
            Pariatur magnam quisquam totam.
          </p>
          <div className='btn-container'>
            <Link to='/register' className='btn register-btn'>
              Register
            </Link>
            <Link to='/login' className='btn login-btn'>
              Login
            </Link>
          </div>
        </div>
        <img src={mainImg} alt='portfolio' />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .logo {
    width: 10rem;
  }
  nav {
    height: var(--nav-height);
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin-inline: auto;
    display: flex;
    align-items: center;
  }
  .hero {
    min-height: calc(100vh - var(--nav-height));
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin-inline: auto;
    display: grid;
    align-items: center;
    p {
      line-height: 2;
    }
  }
  .btn-container {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }
  .register-btn,
  .login-btn {
    padding: 0.7rem 1rem;
  }

  .colorful-text {
    --bg-size: 400%;
    background: linear-gradient(30deg, #6c63ff, #ec008c, #6c63ff) 0 0 /
      var(--bg-size) 100%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: color-changer 15s linear infinite;
  }

  img {
    display: none;
  }
  @media (min-width: 800px) {
    .hero {
      grid-template-columns: 1fr 1fr;
    }
    img {
      display: block;
    }
  }

  @keyframes color-changer {
    100% {
      background-position: var(--bg-size) 0;
    }
  }
`;

export default Landing;
