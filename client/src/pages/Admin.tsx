import customAxios from "../utils/customAxios";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { PiLinkSimpleHorizontalLight } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import AdminCart from "../components/AdminCart";
export const loader = async () => {
  try {
    const { data } = await customAxios.get("/user/admin");
    return data;
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return redirect("/");
  }
};

const Admin = () => {
  const { links, users } = useLoaderData() as { links: number; users: number };

  return (
    <Wrapper>
      <h4>Admin</h4>
      <div className='content'>
        <AdminCart text='user' icon={<FaUserAlt />} amount={users} />
        <AdminCart
          text='link'
          icon={<PiLinkSimpleHorizontalLight />}
          amount={links}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4 {
    font-family: var(--secondary-font);
    margin: 1rem 1rem;
  }
  .content {
    display: grid;
    gap: 2rem;
  }
  @media (min-width: 800px) {
    .content {
      grid-template-columns: 20rem 20rem;
    }
  }
`;

export default Admin;
