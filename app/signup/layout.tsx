import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function SignupLayout({ children }: IProps) {
  return <>{children}</>;
}
