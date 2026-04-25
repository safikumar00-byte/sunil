import { ArrowUpRight } from "lucide-react";
import { VButton } from "./Button";

export function VFooter() {
  const linkCls = "text-base hover:opacity-70 transition-opacity";
  return (
    <footer
      className="max-w-[1200px] mx-auto w-full py-12 px-6 flex flex-col md:flex-row gap-10 md:items-start md:justify-between"
      style={{ color: "#051A24" }}
    >
      <VButton variant="primary">Start a chat</VButton>
      <div className="flex items-start gap-8">
        <ArrowUpRight className="w-5 h-5 mt-1" />
        <div className="flex flex-col gap-2">
          <a href="#services" className={linkCls}>Services</a>
          <a href="#work" className={linkCls}>Work</a>
          <a href="#about" className={linkCls}>About</a>
        </div>
        <div className="flex flex-col gap-2">
          <a href="https://x.com" target="_blank" rel="noreferrer" className={linkCls}>x.com</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={linkCls}>LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
