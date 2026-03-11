import { useState } from "react";
import { AuthModalContext } from "./AuthModalContext";

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = () => setIsOpen(true);
  const closeLoginModal = () => setIsOpen(false);
  return (
    <AuthModalContext.Provider
      value={{ isOpen, openLoginModal, closeLoginModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}
