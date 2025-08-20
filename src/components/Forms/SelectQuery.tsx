// components/Forms/SelectQuery.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import Label from "./Label";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  queryKey: string;
  saveAsId: boolean;
  name: Path<T>;
  queryFun: (params?: any) => Promise<any>;
  placeHolder: string;
  disabled?: boolean;
  queryEnabled?: boolean;
  params?: string | number | string[] | number[];
  label: string;
  required?: boolean;
  errors?: any;
}

export default function SelectQuery<T extends FieldValues>({
  queryKey,
  register,
  name,
  saveAsId,
  queryFun,
  placeHolder,
  disabled = false,
  queryEnabled = true,
  params,
  label,
  required = false,
  errors,
}: Props<T>) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey, params],
    queryFn: () => queryFun(params),
    enabled: queryEnabled,
  });

  return (
    <div className="space-y-2">
      <Label id={name} label={label} required={required} />
      <div className="rounded-[30px] border border-black-400 px-4">
        <select
          {...register(name, {
            setValueAs: (value) => (saveAsId ? Number(value) : value),
            disabled: disabled || isLoading || isError,
          })}
          className="w-full p-4 px-5 outline-0 border-0"
        >
          <option className="text-black/40" value="">
            {isLoading
              ? "Loading..."
              : isError
              ? "Error loading data"
              : placeHolder}
          </option>
          {data?.data?.data?.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {errors && errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}
