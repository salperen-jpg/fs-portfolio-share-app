import customAxios from "../utils/customAxios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { PiLinkSimpleHorizontalLight } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";
import AdminCart from "../components/AdminCart";
import { QueryClient, useQuery } from "@tanstack/react-query";

interface IAdmin {
  links: number;
  users: number;
}

const adminQuery = () => ({
  queryKey: ["admin"],
  queryFn: async (): Promise<IAdmin> => {
    const { data } = await customAxios.get("/user/admin");
    return { links: data.links, users: data.users };
  },
});

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(adminQuery());
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return redirect("/");
  }
};

const Admin = () => {
  const { data } = useQuery(adminQuery());

  return (
    <Wrapper>
      <h4>Admin</h4>
      <div className='content'>
        <AdminCart text='user' icon={<FaUserAlt />} amount={data!.users} />
        <AdminCart
          text='link'
          icon={<PiLinkSimpleHorizontalLight />}
          amount={data!.links}
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
