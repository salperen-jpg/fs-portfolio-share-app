import { styled } from "styled-components";
import { FormRow, Logo } from "../components";
import { Form, redirect, useNavigation } from "react-router-dom";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customAxios.post("/auth/login", data);
    toast.success("Successfully logged in!");
    return redirect("/dashboard");
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post'>
        <Logo white />
        <h5>login</h5>
        <FormRow type='email' name='email' defaultValue='sal123@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className='btn register' disabled={isSubmitting}>
          submit
        </button>
        <p>
          You don't have an account yet ?
          <Link to='/register' className='register-btn'>
            register
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
  label {
    text-transform: capitalize;
    font-size: 0.8rem;
    letter-spacing: var(--spacing);
    color: var(--white);
    font-weight: 600;
  }
  input {
    border: none;
    outline: none;
    appearance: none;
    padding: 0.75rem 0.5rem;
    font-family: inherit;
    letter-spacing: var(--spacing);
    border-radius: var(--radius);
  }
  input[type="text"]::first-letter {
    text-transform: capitalize;
  }
  .register {
    background-color: transparent;
    width: 100%;
    border: 1px solid var(--white);
    padding: 0.75rem 1rem;
    text-transform: capitalize;
    font-weight: 600;
  }
  p {
    margin-top: 1rem;
    color: var(--white);
    letter-spacing: var(--spacing);
    font-size: 0.875rem;
  }
  .register-btn {
    color: var(--white);
    cursor: pointer;
    text-transform: capitalize;
    font-weight: 600;
    margin-left: 0.5rem;
  }
  .register-btn:hover {
    text-decoration: underline;
  }
  @keyframes color-changer {
    100% {
      background-position: var(--bg-size) 0;
    }
  }
`;

export default Login;
