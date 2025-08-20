"use client";
import { Controller, Control, FieldErrors } from "react-hook-form";
import Label from "./Label";
import ValidationError from "../Errors/validationError";

interface Option {
  id: string | number;
  name: string;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  required?: boolean;
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
}

export default function MultiCheckInput({
  label,
  name,
  options,
  control,
  required = false,
  errors,
  disabled,
}: Props) {
  return (
    <div className="space-y-2">
      <Label label={label} required={required} id={name} />
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) =>
            required && (!value || value.length === 0)
              ? "اختر واحد على الأقل"
              : true,
        }}
        render={({ field }) => (
          <div className="flex flex-wrap gap-3">
            {options.map((option) => {
              const isChecked = field.value?.includes(option.name);
              return (
                <label
                  key={`${option.id}-${option.name}`} // Unique key combination
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={option.name}
                    checked={isChecked}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        field.onChange([...(field.value || []), option.name]);
                      } else {
                        field.onChange(
                          field.value?.filter(
                            (v: string) => v !== option.name
                          ) || []
                        );
                      }
                    }}
                    disabled={disabled}
                  />
                  <span>{option.name}</span>
                </label>
              );
            })}
          </div>
        )}
      />
      <ValidationError errors={errors} name={name} />
    </div>
  );
}
