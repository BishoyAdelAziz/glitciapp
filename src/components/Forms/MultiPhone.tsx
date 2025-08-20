"use client";

import React from "react";
import {
  UseFormRegister,
  useFieldArray,
  Control,
  FieldErrors,
} from "react-hook-form";
import ValidationError from "../Errors/validationError";
import Label from "./Label";

interface Props {
  name: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export default function MultiPhonesInput({
  name,
  register,
  control,
  errors,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { minLength: 1 }, // Ensure at least one phone number remains
  });

  return (
    <div className="space-y-3">
      <Label id={`${name}-label`} label="Employee Phones" required />

      {/* Initial single phone input */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 rounded-[30px] border p-4 px-5 ring-black-400 focus-within:ring-1">
          <input
            type="tel"
            inputMode="tel"
            maxLength={13}
            {...register(`${name}.0`, {
              onChange: (e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9+]/g, "")
                  .replace(/(?!^)\+/g, "");
              },
              required: "Phone number is required",
            })}
            placeholder="Enter Phone"
            className="w-full outline-none"
          />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => append("")}
              className="flex h-6 w-6 items-center justify-center rounded-full text-quantary hover:text-primary"
              aria-label="Add phone number"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <ValidationError errors={errors} name={`${name}.0`} />
      </div>

      {/* Additional phone inputs (if any) */}
      {fields.slice(1).map((field, index) => (
        <div key={field.id} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 rounded-[30px] border p-4 px-5 ring-black-400 focus-within:ring-1">
            <input
              type="tel"
              inputMode="tel"
              maxLength={13}
              {...register(`${name}.${index + 1}`, {
                onChange: (e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9+]/g, "")
                    .replace(/(?!^)\+/g, "");
                },
                required: "Phone number is required",
              })}
              placeholder="Enter Phone"
              className="w-full outline-none"
            />

            <div className="flex items-center gap-1">
              {index === fields.length - 2 && (
                <button
                  type="button"
                  onClick={() => append("")}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-quantary hover:text-primary"
                  aria-label="Add phone number"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}

              <button
                type="button"
                onClick={() => remove(index + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
                aria-label="Remove phone number"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <ValidationError errors={errors} name={`${name}.${index + 1}`} />
        </div>
      ))}

      {errors?.[name]?.message && typeof errors[name]?.message === "string" && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
