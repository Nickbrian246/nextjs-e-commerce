import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);
const smMdBreakpoint = Number.parseInt((twConfig.theme?.screens as any).smMd);
export { smMdBreakpoint };
