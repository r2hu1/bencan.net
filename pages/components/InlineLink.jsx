import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

export default function InlineLink({ to, children, className, underlineDisabled, arrowRotate }) {
  return (
    <Link className={twMerge(
      '!text-sm flex items-center hover:opacity-60 duration-300 ease-in-out transition-opacity w-max',
      className
    )} href={to ?? ''}>
      <span className={twMerge(
        underlineDisabled !== true && 'custom-underline'
      )}>{children}</span>
      <LuArrowRight className={twMerge(
        'inline-flex ml-1',
        arrowRotate !== false && '-rotate-45'
      )} />
    </Link>
  );
};