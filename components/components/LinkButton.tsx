import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";
interface LinkButtonProps extends LinkProps {
  children: string;
  className?: string;
}

export function LinkButton({
  children,
  className,
  ...linkProps
}: LinkButtonProps) {
  return (
    <Link
      className={twMerge(
        `      p-4
      px-6
      rounded-lg
      flex
      justify-center
      bg-science-blue-500
      font-semibold
      text-white
      active:bg-science-blue-700`,
        className
      )}
      {...linkProps}
    >
      <p className="tracking-wide">{children}</p>
    </Link>
  );
}
