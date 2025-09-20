import Image from 'next/image';
import Icon from '@/public/images/icon.png';

export default function ReportLoading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center px-2">
      <Image src={Icon} alt="Loading..." height={50} width={50} />

      <p className="text-2xl text-neutral-200 font-medium mt-2">
        Preparing Report...
      </p>

      <p className="mt-1 max-w-xs text-neutral-600">
        Take a deep breath and brace yourself for the insights ahead!
      </p>
    </div>
  );
}
