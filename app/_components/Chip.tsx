import { IoHeart } from "react-icons/io5";

export default function Chip() {
  return (
    <div className="flex items-center gap-x-2 px-5 py-2 bg-neutral-900 rounded-full select-none mx-[1rem]">
      <IoHeart />
      <p className="text-xs xs:text-sm text-center">
        Over 1.3 million interviews conducted.
      </p>
    </div>
  );
}
