export default function CheckBoxesQuery({
  roleId,
  register,
  control,
}: {
  roleId: number;
  register: any;
  control: any;
}) {
  const { data: skills, isLoading } = useQuery({
    queryKey: [`role-skills`, roleId],
    queryFn: () => getRoleSkills(roleId),
    enabled: !!roleId,
  });

  if (isLoading) return <div className="p-4">Loading skills...</div>;
  if (!skills?.data?.data?.length)
    return <div className="p-4">No skills available for this role</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      {skills.data.data.map((skill: any) => (
        <div key={skill.id} className="flex items-center">
          <input
            type="checkbox"
            id={`skill-${skill.id}`}
            value={skill.id}
            {...register("skills")}
            className="mr-2"
          />
          <label htmlFor={`skill-${skill.id}`}>{skill.name}</label>
        </div>
      ))}
    </div>
  );
}
