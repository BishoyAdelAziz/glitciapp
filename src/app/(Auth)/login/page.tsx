"use client";
import Input from "@/components/Forms/TextInput";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/Forms/SubmitButton";
import PasswordInput from "@/components/Forms/PasswordInput";
import { Login } from "./services/api";
import { FormFields, LoginSchema } from "./services/validation";
import authStore from "@/stores/AuthStore";
const LoginPage = () => {
  // Hooks Inits
  const Router = useRouter();
  const { setToken } = authStore();
  const queryClient = useQueryClient();

  // Login Api Calling
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: Login,
    onSuccess: async (data) => {
      console.log(data);
      setToken(data?.data?.accessToken);
      Router.push("/");
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
    },
  });
  // RHF Init
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate(data);
  };
  console.log(error);
  return (
    <div className="h-screen min-h-screen flex items-center justify-between">
      <div className="hidden h-full flex-col items-center justify-between py-48  bg-gray-700 dark:bg-zinc-800  text-white lg:flex lg:px-16 2xl:px-24">
        <Link href={"/"}>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={"/icons/Logo White.png"}
              width={125}
              height={125}
              alt="Glitci Logo"
              priority
            />
            <p className="text-xl text-nowrap">Where Glitches Turn To Gold</p>
          </div>
        </Link>
        <div className="space-y-2 text-center">
          <p className="font-noor-regular text-md text-nowrap">
            You Dont Have Account ?
          </p>
          <Link
            href="/registration"
            className="block font-noor-bold text-md hover:underline"
          >
            Create An Account
          </Link>
        </div>
      </div>
      <div className="flex h-full w-full items-center py-20 lg:py-40">
        <div className="mx-auto flex h-full w-10/12 flex-col justify-center gap-10 lg:w-9/12">
          <p className="font-noor-bold text-3xl lg:mb-2 lg:text-5xl">Login</p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              icon="./icons/email.svg"
              name="email"
              placeholder="Your Email"
              register={register}
              errors={errors}
            />

            <PasswordInput
              name="password"
              placeholder="Password"
              register={register}
              errors={errors}
            />

            <div className="flex items-center justify-between font-noor-regular font-medium">
              <div className="flex items-center gap-2">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="h-4 w-4 text-[#BE2726] focus:ring-[#BE2726]"
                />
                <label
                  htmlFor="checkbox"
                  className="text-sm text-gray-700 lg:text-base"
                >
                  Remeber Me
                </label>
              </div>

              <Link href="/reset-password" className="text-[#BE2726]">
                Forgot Password ?
              </Link>
            </div>

            <SubmitButton
              text="Login"
              isPending={isPending}
              isError={isError}
              error={error}
            />
          </form>
          <div className="flex flex-col items-center justify-center gap-2 lg:hidden">
            <p className="font-noor-regular">You Dont Have Account ?</p>
            <Link
              href="/registration"
              className="block font-noor-bold text-[#BE2726] hover:underline"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
