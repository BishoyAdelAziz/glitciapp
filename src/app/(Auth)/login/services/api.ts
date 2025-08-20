import axiosInstance from "@/lib/axios";
import { FormFields } from "./validation";
export const Login = async (data: FormFields) => {
  return await axiosInstance.post("auth/login", data);
};
