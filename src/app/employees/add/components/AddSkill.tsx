"use client";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSkill } from "../services/api";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  positionId: string;
  errors: FieldErrors;
  name: string;
  onSuccess?: () => void;
}

export default function AddSkill({ positionId, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
  }>({
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (skillName: string) =>
      createSkill(positionId, { name: skillName }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["skills", positionId]);
      onSuccess?.();
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = (data, event) => {
    event?.preventDefault(); // Prevent default form submission
    mutate(data.name);
  };

  return (
    <div className="w-full mt-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2"
        noValidate // Prevent browser validation
      >
        <input
          {...register("name", { required: "Skill name is required" })}
          type="text"
          className="flex-1 ring-1 ring-gray-400 rounded-[30px] border border-black-400 p-2 px-4"
          placeholder="Enter new skill name"
          disabled={isPending}
        />
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-[30px] px-4"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>
      {errors.name && (
        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
      )}
    </div>
  );
}
