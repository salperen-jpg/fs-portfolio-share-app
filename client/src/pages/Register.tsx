import styled from "styled-components";
import { FormRow, Logo } from "../components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);
  try {
    await customAxios.post("/auth/register", registerData);
    toast.success("Registered successfully , please login!");
    return redirect("/login");
  } catch (error: AxiosError | any) {
    toast.error(error.response.data.msg);
    return null;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post'>
        <Logo white />
        <h5>register</h5>
        <FormRow type='text' name='name' placeHolder='e.g. john' />
        <FormRow
          type='text'
          name='lastName'
          labelText='last name'
          placeHolder='e.g. sanders'
        />
        <FormRow type='email' name='email' placeHolder='john@gmail.com' />
        <FormRow
          type='text'
          name='devRole'
          labelText='Role'
          placeHolder='e.g. full stack developer'
        />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn register' disabled={isSubmitting}>
          submit
        </button>
        <p>
          Already a member ?{" "}
          <Link to='/login' className='login-btn'>
            login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(to bottom, #fd9ee2 20%, #fe8594 60%, #fca977);
  display: grid;
  place-items: center;
  --bg-size: 400%;
  background: linear-gradient(90deg, #6c63ff, #ec008c, #6c63ff) 0 0 /
    var(--bg-size) 100%;
  animation: color-changer 20s linear infinite;
  form {
    padding: 1.5rem;
    border: 1px solid var(--white);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius);
    width: var(--fluid-width);
    max-width: 25rem;
    backdrop-filter: blur(5px);
  }
  img {
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  h5 {
    text-align: center;
    margin-bottom: 1rem;
    font-family: var(--secondary-font);
    text-transform: capitalize;
    color: var(--white);
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
  p {
    margin-top: 1rem;
    color: var(--white);
    letter-spacing: var(--spacing);
    font-size: 0.875rem;
  }
  .login-btn {
    color: var(--white);
    cursor: pointer;
    text-transform: capitalize;
    font-weight: 600;
  }
  .login-btn:hover {
    text-decoration: underline;
  }
  .register {
    background-color: transparent;
    width: 100%;
    border: 1px solid var(--white);
    padding: 0.75rem 1rem;
    text-transform: capitalize;
    font-weight: 600;
  }
  @keyframes color-changer {
    100% {
      background-position: var(--bg-size) 0;
    }
  }
`;

export default Register;
