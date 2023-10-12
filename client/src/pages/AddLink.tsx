import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";
import { platforms } from "../utils/platforms";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";

interface IValidate {
  url: string;
  platform: string;
}

// https://www.udemy.com/ https://github.com/salperen-jpg
// https://www.youtube.com/channel/UCx4dwHVHdIM50rVyF4XjhKA

export const validatePlatformAndLink = ({ url, platform }: IValidate) => {
  console.log("here");
  console.log(url, platform);
  if (
    url.startsWith(`https://${platform}`) ||
    url.startsWith(`http://${platform}`) ||
    url.startsWith(`https://www.${platform}`)
  ) {
    return true;
  } else {
    return false;
  }
};

export const action = async ({ request }: any) => {
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  const isLinkValid = validatePlatformAndLink({
    url: data.url,
    platform: data.platform,
  });
  console.log(data);
  if (!isLinkValid) {
    return toast.error("Please provide a valid link!");
  }
  try {
    await customAxios.post("/links", data);
    toast.success("Link created!");
    return redirect("/dashboard");
  } catch (error: any) {
    return toast.error(error.response.data.msg);
  }
};

const AddLink = () => {
  const [platform, setPlatform] = useState(platforms[0]);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
  const [handleHiddenInput, setHandleHiddenInput] = useState(platform.platform);

  const handlePlatform = (id?: number) => {
    const specificPlatform = platforms.find((p) => p.id === id);
    if (specificPlatform) {
      setPlatform(specificPlatform);
      setHandleHiddenInput(specificPlatform?.platform);
    }
    setIsPlatformsOpen(!isPlatformsOpen);
  };

  return (
    <Wrapper>
      <Form method='post'>
        <h4>Add link</h4>
        <div className='form-center'>
          <div className='form-row hidden-platform'>
            <input
              type='text'
              name='platform'
              hidden
              value={handleHiddenInput}
              onChange={() => handlePlatform()}
            />
          </div>
          <div className='form-row'>
            <label>platform</label>
            <div
              className='platform-container'
              onClick={() => {
                setIsPlatformsOpen(!isPlatformsOpen);
              }}
            >
              {platform.icons}
              <p className='platform'>{platform.platform}</p>
              <span>
                {isPlatformsOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
              </span>
              <ul
                className={
                  isPlatformsOpen
                    ? "platform-values-container show"
                    : "platform-values-container"
                }
              >
                {platforms.map((p) => {
                  const { id, platform, icons } = p;
                  return (
                    <li
                      key={id}
                      className='platform-link'
                      onClick={() => handlePlatform(id)}
                    >
                      {icons}
                      <p className='platform'>{platform}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <FormRow
            type='text'
            name='url'
            placeHolder='https://github.com/salperen-jpg'
          />
          <button className='btn submit-btn'>submit</button>
        </div>
      </Form>
    </Wrapper>
  );
};

export const Wrapper = styled.section`
  .form-center {
    display: grid;
    align-items: flex-end;
    padding: 1rem;
  }
  .submit-btn {
    width: 100%;
    text-transform: capitalize;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
    align-self: flex-end;
  }

  .platform-container {
    position: relative;
    background: var(--grey-300);
    font-size: 1rem;
    padding: 0.75rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    span {
      font-size: 0.6rem;
    }
  }

  .platform {
    flex: 1;
    margin-left: 2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
  }

  .platform-values-container {
    position: absolute;
    top: 103%;
    width: 100%;
    left: 0;
    height: 15rem;
    overflow-y: scroll;
    background-color: var(--profile-container);
    display: none;
    z-index: -1;
    visibility: hidden;
    cursor: pointer;
  }

  .show {
    display: block;
    visibility: visible;
    z-index: 99;
  }
  .platform-link {
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    transition: var(--transition);
  }
  .platform-link:hover {
    padding: 1rem 0.75rem;
    background-color: var(--grey-100);
  }
  .hidden-platform {
    display: none;
    flex: 0;
  }
`;
export default AddLink;
