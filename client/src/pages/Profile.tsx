import { Form } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import { useDashboardContext } from "./DashboardSharedLayout";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 800000) {
    toast.error("image is too big");
    return null;
  }

  try {
    await customAxios.patch("/user/updateUser", formData);
    toast.success("Profile update is success.");
  } catch (error: any) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useDashboardContext();
  const { name, lastName, email, devRole } = user;
  return (
    <Wrapper>
      <Form method='post' encType='multipart/form-data'>
        <h4>Profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar'>no more than 5MB avatar</label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              accept='image/*'
              className='form-input'
            />
          </div>
          <FormRow type='text' name='name' defaultValue={name} />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={lastName}
          />
          <FormRow
            type='email'
            name='email'
            labelText='email'
            defaultValue={email}
          />
          <FormRow
            type='text'
            name='devRole'
            labelText='Role'
            defaultValue={devRole}
          />
          <button type='submit' className='btn submit-btn'>
            submit
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  .submit-btn {
    width: 100%;
    text-transform: capitalize;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
  form {
    transition: var(--transition);
  }
  form:hover {
    box-shadow: var(--shadow-3);
  }
  input {
    width: 100%;
    align-self: stretch;
  }

  @media (min-width: 992px) {
    .submit-btn {
      align-self: flex-end;
    }
    input {
      height: 100%;
    }
    .form-row {
      align-self: stretch;
    }
  }
`;
export default Profile;
