import { Link as LinkProps } from "@/interfaces";
import Link from "next/link";
type Props = Pick<LinkProps, "icon" | "titleEs" | "id" | "route" | "titlesEn">;
export default function Category(props: Props) {
  const { icon, id, route, titleEs, titlesEn } = props;

  return (
    <Link href={route}>
      <div className="p-1 w-[100px]  h-[84px] bg-[#144278] flex flex-col items-center  rounded-md">
        <div className="w-full h-2/4  flex items-center justify-center ">
          <div className="text-4xl text-white">{icon}</div>
        </div>
        <div className="w-full h-2/4 ">
          <p className="text-white font-medium text-sm text-center">
            {titleEs}
          </p>
        </div>
      </div>
    </Link>
  );
}
