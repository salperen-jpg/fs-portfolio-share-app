import { toast } from "react-toastify";
import customAxios from "../utils/customAxios";
import { redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    try {
      await customAxios.delete(`/links/${params.id}`);
      await queryClient.invalidateQueries(["links"]);
      toast.success("Link deleted successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard");
  };
