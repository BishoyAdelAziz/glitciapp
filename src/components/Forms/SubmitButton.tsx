import React from "react";
import ButtonLoader from "../Loaders/ButtonLoader";
import SubmitError from "../Errors/SubmitError";

interface Props {
  text: string;
  isPending: boolean;
  isError: boolean;
  error: any;
}

const SubmitButton = ({ text, isPending, isError, error }: Props) => {
  return (
    <div className="w-full space-y-2">
      <button
        type="submit"
        disabled={isPending}
        className="flex w-full justify-center rounded-[30px] bg-[#BE2726] p-4 font-noor-bold text-white hover:bg-black"
      >
        {isPending ? <ButtonLoader /> : text}
      </button>

      <SubmitError isError={isError} error={error} />
    </div>
  );
};

export default SubmitButton;
