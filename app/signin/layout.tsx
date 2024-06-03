import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function SigninLayout({ children }: IProps) {
  return <>{children}</>;
}
