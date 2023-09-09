import { MouseEventHandler, ReactNode, } from "react";

export type SnackbarProperties = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    snackbarPopState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

