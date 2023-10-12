import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { FormRow } from "../components";
import { platforms } from "../utils/platforms";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import { Wrapper } from "./AddLink";
import { validatePlatformAndLink } from "./AddLink";
import { ILink } from "../models/LinkModel";
import { QueryClient, useQuery } from "@tanstack/react-query";

const linkQuery = (id: string) => ({
  queryKey: ["link", id],
  queryFn: async (): Promise<ILink> => {
    const { data } = await customAxios(`/links/${id}`);
    return data.link;
  },
});

export const loader =
  (queryClient: QueryClient) =>
  async (data: any): Promise<number | any> => {
    const {
      params: { id },
    } = data;
    try {
      await queryClient.ensureQueryData(linkQuery(id));
      return id;
    } catch (error: any) {
      return error;
    }
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: any) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const isLinkValid = validatePlatformAndLink({
      url: data.url,
      platform: data.platform,
    });
    if (!isLinkValid) {
      return toast.error("Please provide a valid link!");
    }
    try {
      await customAxios.patch(`/links/${params.id}`, data);
      await queryClient.invalidateQueries(["link"]);
      toast.success("Edited successfully!");
      return redirect("/dashboard");
    } catch (error: any) {
      toast.success(error?.response?.data?.msg);
      return error;
    }
  };

const EditLink = () => {
  const id = useLoaderData() as string;
  const { data: link } = useQuery(linkQuery(id));
  const specificPlatform = platforms.find((p) => p.platform === link!.platform);
  const url = link?.url;
  const [platform, setPlatform] = useState(specificPlatform);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
  const [handleHiddenInput, setHandleHiddenInput] = useState(
    platform?.platform
  );

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
        <h4>Edit link</h4>
        <div className='form-center'>
          <div className='form-row hidden-platform'>
            <input
              type='text'
              name='platform'
              hidden
              value={handleHiddenInput}
              onChange={() => handlePlatform}
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
              {platform!.icons}
              <p className='platform'>{platform!.platform}</p>
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
            defaultValue={url}
          />
          <button className='btn submit-btn'>submit</button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditLink;
