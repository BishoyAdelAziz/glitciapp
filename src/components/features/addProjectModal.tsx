import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../modal/Modal";
import TextInput from "../Forms/TextInput";
import DateInput from "../Forms/DateInput";
import {
  ProjectSchema,
  ProjectFieldValues,
} from "@/services/validations/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "../Forms/SelectInput";
import UseClients from "@/hooks/useClients";
import useEmployees from "@/hooks/useEmployyes";
import {
  transformEmployeesForSelect,
  transformServicesForSelect,
} from "@/utils/functions";
import { MultiSelect } from "@/app/employees/add/components/MultiSelect";
import useServices from "@/hooks/useServices";
import { error } from "console";
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export default function AddProjectModal({ isOpen, setIsOpen }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(ProjectSchema),
  });
  const DepartmentId = watch("department");
  const { getClients } = UseClients();
  const { services, servicesError, servicesIsError, servicesIsPending } =
    useServices();
  console.log(getClients);
  const onSubmit: SubmitHandler<ProjectFieldValues> = (data) => {
    console.log(data);
  };
  const departments = [
    { id: "1", name: "Marketing" },
    { id: "2", name: "Software" },
  ];
  const { allEmployees } = useEmployees({
    departmentId: DepartmentId,
  });
  const employeesOptions = transformEmployeesForSelect(allEmployees);
  const ServicesOptions = transformServicesForSelect(services);
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => console.log("close")}
    >
      <form
        className="flex flex-col items-center justify-center gap-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          errors={errors}
          register={register}
          label="Project Name"
          name="name"
          required
          textOnly
        />
        <TextInput
          errors={errors}
          label="description"
          name="description"
          register={register}
          required
          textOnly
        />
        <TextInput
          errors={errors}
          label="budget"
          name="budget"
          register={register}
          required
          numbersOnly
        />
        <DateInput
          control={control}
          errors={errors}
          label="Start Date"
          name="startDate"
        />
        <DateInput
          control={control}
          errors={errors}
          label="End Date"
          name="endDate"
        />
        <SelectInput
          errors={errors}
          label="department"
          name="department"
          options={departments}
          register={register}
          saveAsId
        />
        <MultiSelect
          errors={errors}
          label="employees"
          name="employees"
          options={employeesOptions}
          register={register}
          setValue={setValue}
          required
        />
        <MultiSelect
          errors={errors}
          label="services"
          name="services"
          options={ServicesOptions}
          register={register}
          setValue={setValue}
          required
        />
        <div className="flex justify-evenly w-full items-center">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white font-bold capitalize px-4 py-1 rounded-2xl cursor-pointer"
          >
            Add Project
          </button>
        </div>
      </form>
    </Modal>
  );
}
