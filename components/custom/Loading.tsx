import { BarLoader } from "@/libraries/react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-full grow-1 flex flex-col justify-center items-center">
      <BarLoader color="#7c3aed" />
    </div>
  );
}
