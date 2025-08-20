"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormFields, AddEmployeeValidation } from "../services/validation";
import {
  getDepartments,
  getDepartmentPositions,
  getPositionSkills,
  createEmployee,
} from "../services/api";
import { SelectInput } from "@/components/Forms/SelectInput";
import TextInput from "@/components/Forms/TextInput";
import { MultiSelect } from "./MultiSelect";
import SubmitButton from "@/components/Forms/SubmitButton";
import MultiPhonesInput from "@/components/Forms/MultiPhone";

const EmployeeForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(AddEmployeeValidation),
    defaultValues: {
      phones: [],
      skills: [],
    },
    mode: "onChange",
  });

  const departmentId = watch("departments")?.[0]; // Watch departments array and get first item
  const positionId = watch("positions")?.[0]; // Watch positions array and get first item

  // Fetch departments
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    select: (data) => data.data.data,
  });

  // Fetch positions
  const { data: positions = [], isFetching: positionsLoading } = useQuery({
    queryKey: ["positions", departmentId],
    queryFn: () => getDepartmentPositions(departmentId),
    enabled: !!departmentId,
    select: (data) => data.data.data,
  });

  // Fetch skills
  const { data: skills = [], isFetching: skillsLoading } = useQuery({
    queryKey: ["skills", positionId],
    queryFn: () => getPositionSkills(positionId),
    enabled: !!positionId,
    select: (data) => data.data.data,
  });

  // Create employee mutation
  const { mutate, isError, error, isPending } = useMutation({
    mutationKey: ["Employee Create"],
    mutationFn: createEmployee,
    onSuccess: () => {
      // Reset form fields
      setValue("name", "");
      setValue("email", "");
      setValue("phones", []);
      setValue("departments", []);
      setValue("positions", []);
      setValue("skills", []);
      queryClient.invalidateQueries({
        queryKey: ["employees"],
        exact: true,
      });
    },
  });

  // Reset dependent fields when department changes
  useEffect(() => {
    if (departmentId) {
      setValue("positions", []);
      setValue("skills", []);
    }
  }, [departmentId, setValue]);

  const onSubmit = async (data: FormFields) => {
    mutate(data); // Data already matches backend expectations
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-[80%] mx-auto"
    >
      <TextInput
        label="Full Name"
        name="name"
        register={register}
        errors={errors}
        required
      />

      <TextInput
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        required
      />

      <MultiPhonesInput
        control={control}
        errors={errors}
        name="phones"
        register={register}
      />

      <SelectInput
        name="departments"
        label="Department"
        options={departments}
        register={register}
        errors={errors}
        required
        saveAsId
      />

      <SelectInput
        name="positions"
        label="Position"
        options={positions}
        register={register}
        errors={errors}
        required
        disabled={!departmentId || positionsLoading}
        saveAsId
      />

      <MultiSelect
        name="skills"
        label="Skills"
        options={skills}
        register={register}
        setValue={setValue}
        errors={errors}
        required
        disabled={!positionId || skillsLoading}
      />

      <SubmitButton
        error={errors}
        text="Submit"
        isPending={isPending}
        isError={isError}
      />
    </form>
  );
};

export default EmployeeForm;
