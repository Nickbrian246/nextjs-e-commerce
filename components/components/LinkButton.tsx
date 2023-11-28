import Link, { LinkProps } from "next/link";

interface LinkButtonProps extends LinkProps {
  children: string;
}

export function LinkButton({ children, ...linkProps }: LinkButtonProps) {
  return (
    <Link
      className="
      p-4
      px-6
      rounded-lg
      flex
      justify-center
      bg-science-blue-500
      font-semibold
      text-white
      active:bg-science-blue-700
      "
      {...linkProps}
    >
      <p>{children}</p>
    </Link>
  );
}
