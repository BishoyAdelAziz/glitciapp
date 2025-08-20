import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import ValidationError from "../Errors/validationError";
import Label from "./Label";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  label: string;
  required: boolean;
}

const TextInput = ({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  required,
  register,
  errors,

  ...rest
}: Props) => {
  return (
    <div className="w-full">
      <Label required={required} id={name} label={label} />
      <div className="flex gap-2 rounded-[30px] border border-black-400 p-4 px-5">
        {icon && <Image src={icon} alt="image" width={24} height={24} />}
        <input
          type={type}
          className="w-full outline-none"
          {...register(name)}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      <ValidationError errors={errors} name={name} />
    </div>
  );
};

export default TextInput;
