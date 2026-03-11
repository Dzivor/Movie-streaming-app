import { createContext } from "react";

//Defining what context will hold
interface AuthModalContextType {
    isOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

//Creating the context
export const AuthModalContext = createContext<AuthModalContextType |  undefined>(undefined);