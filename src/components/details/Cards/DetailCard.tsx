"use client";
interface Props {
  title: string;
  details: string;
  isError: boolean | undefined;
}
export default function DetailsCard({ details, isError, title }: Props) {
  if (isError) return <div>Error</div>;
  return (
    <div className="bg-gray-300 rounded-3xl p-6">
      <h3>{title}</h3>
      <div>{details}</div>
    </div>
  );
}
