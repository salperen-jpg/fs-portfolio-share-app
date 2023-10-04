import styled from "styled-components";

const PageHero = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.section`
  height: 30vh;
  background: linear-gradient(to bottom, #fd9ee2 20%, #fe8594 60%, #fca977);
  --bg-size: 400%;
  background: linear-gradient(90deg, #6c63ff, #ec008c, #6c63ff) 0 0 /
    var(--bg-size) 100%;
  animation: color-changer 20s linear infinite;
  border-radius: 10px;
  @keyframes color-changer {
    100% {
      background-position: var(--bg-size) 0;
    }
  }
`;

export default PageHero;
