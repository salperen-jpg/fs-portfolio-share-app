import { toast } from "react-toastify";
import customAxios from "../utils/customAxios";
import { redirect } from "react-router-dom";

export const action = async ({ params }: any) => {
  console.log(params);
  try {
    await customAxios.delete(`/links/${params.id}`);
    toast.success("Link deleted successfully!");
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard");
};
