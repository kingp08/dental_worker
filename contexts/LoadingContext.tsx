import { ReactNode, createContext, useState } from "react";

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
