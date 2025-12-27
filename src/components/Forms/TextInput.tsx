"use client";
import ValidationError from "../Errors/validationError";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Label from "./Label";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  type?: string;
  numbersOnly?: boolean; // allow only digits 0-9
  textOnly?: boolean; // allow only letters and spaces
  valueAsNumber?: boolean; // register value as number instead of string
}

export default function TextInput({
  label,
  name,
  errors,
  type = "text",
  placeholder,
  register,
  required,
  numbersOnly = false,
  textOnly = false,
  valueAsNumber = false,
  ...rest
}: Props) {
  // Input handler to enforce numbersOnly or textOnly constraints
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filteredValue = e.target.value;

    if (numbersOnly) {
      // Allow only digits 0-9
      filteredValue = filteredValue.replace(/[^0-9]/g, "");
    } else if (textOnly) {
      // Allow only letters (a-z, case insensitive) and spaces
      filteredValue = filteredValue.replace(
        /[^a-zA-Z\u0600-\u06FF\s\/\\-]/g,
        ""
      );
    }

    if (filteredValue !== e.target.value) {
      e.target.value = filteredValue;
    }

    // Call any passed onInput handler
    if (rest.onInput) {
      rest.onInput(e);
    }
  };

  return (
    <div className="w-full">
      <Label label={label} name={name} required={required} />
      <input
        type={type}
        className={`focus:border-secondary w-full rounded-lg border border-[#CCCCCC] bg-white p-2 text-black outline-none placeholder:text-xs placeholder:opacity-35`}
        {...register(name, { valueAsNumber })}
        placeholder={placeholder}
        onInput={handleInput}
        {...rest}
      />
      <div className="min-h-5">
        <ValidationError errors={errors} name={name} />
      </div>
    </div>
  );
}
