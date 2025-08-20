import React from "react";

interface Props {
  id: string;
  label: string;
  required?: boolean;
}
const Label = ({ id, label, required }: Props) => {
  return (
    <label htmlFor={id} className="mb-2 mx-2 block font-bold text-sm ">
      {label}
      {required ? (
        <span className="mx-[2px] text-red-500">*</span>
      ) : (
        <span className="text-xs text-gray-400">optional</span>
      )}
    </label>
  );
};

export default Label;
