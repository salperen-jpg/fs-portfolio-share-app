import styled from "styled-components";

interface IAdminCarts {
  text: string;
  icon: React.ReactNode;
  amount: number;
}

const AdminCarts: React.FC<IAdminCarts> = ({ text, icon, amount }) => {
  return (
    <Wrapper>
      <span>{icon}</span>

      <small>
        {amount}
        {amount > 1 ? ` ${text} have been` : `  ${text} has been`} created so
        far
      </small>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  max-width: 20rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  box-shadow: var(--shadow-1);
  border-radius: 10px;
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
  color: var(--white);
  span {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    svg {
      font-size: 1.2rem;
    }
  }
`;
export default AdminCarts;
