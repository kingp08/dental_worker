import { ReactNode } from "react";
import { IComponent } from "@/utils/interfaces";

interface IProps extends IComponent {
  children: ReactNode;
}

export default function LeftSection({ children, className = "" }: IProps) {
  return (
    <section className={`relative bg-primary ${className}`}>
      <div className="absolute left-48 -top-24 h-[70vh] w-[70vw] bg-gradient-to-r from-[#a78bfa] via-primary to-primary rotate-45 z-1" />
      <div className="absolute left-[70vh] -top-48 h-[40vh] w-[20vw] bg-gradient-to-r from-[#a78bfa]  to-primary rotate-45 z-2" />
      <div className="absolute left-[90vh] -top-48 h-[40vh] w-[18vw] bg-gradient-to-r from-[#a78bfa]  to-primary rotate-45 z-2" />
      <div className="absolute -left-[20vh] -bottom-36 h-[32vh] w-[28vw] bg-gradient-to-l from-[#a78bfa]  to-primary rotate-45 z-2" />
      {children}
    </section>
  );
}
