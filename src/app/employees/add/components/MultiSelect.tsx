"use client";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import Label from "@/components/Forms/Label";
import ValidationError from "@/components/Errors/validationError";
// import AddSkill from "./AddSkill";

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  name: string;
  label: string;
  options: Option[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
  required?: boolean;
  disabled?: boolean;
}

export const MultiSelect = ({
  name,
  label,
  options,
  register,
  setValue,
  errors,
  required = false,
  disabled = false,
}: MultiSelectProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(name, selectedIds);
  }, [selectedIds, name, setValue]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  const selectedOptions = options.filter((option) =>
    selectedIds.includes(option.id)
  );
  const availableOptions = options.filter(
    (option) => !selectedIds.includes(option.id)
  );

  return (
    <div className="w-full space-y-2" ref={dropdownRef}>
      <div className="flex justify-between items-center">
        <Label id={name} label={label} required={required} />
        {selectedOptions.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-blue-500 hover:text-blue-700"
            disabled={disabled}
          >
            Clear all
          </button>
        )}
      </div>

      <input type="hidden" {...register(name)} />

      {/* Selected options container */}
      <div
        className={`flex flex-wrap justify-start items-center gap-2 min-h-12 p-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md cursor-pointer ${disabled ? "bg-gray-100" : "bg-lablebg"}`}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option) => (
            <div
              key={option.id}
              className="flex  items-center gap-1 px-3 py-1 bg-lable text-blue-400 rounded-full"
            >
              <span>{option.name}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelection(option.id);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label={`Remove ${option.name}`}
                >
                  ×
                </button>
              )}
            </div>
          ))
        ) : (
          <span className="text-gray-400">Select options...</span>
        )}
      </div>

      {/* Available options dropdown */}
      {!disabled && (
        <div className="mt-1 flex gap-1 flex-wrap border border-gray-300 rounded-md p-2 max-h-60  shadow-lg bg-white z-10">
          {availableOptions.length > 0 ? (
            availableOptions.map((option) => (
              <div
                key={option.id}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelection(option.id);
                }}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400">No more options available</div>
          )}
        </div>
      )}

      <ValidationError errors={errors} name={name} />
    </div>
  );
};
