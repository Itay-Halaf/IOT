import { MouseEventHandler, ReactNode, } from "react";
import { BaseProperties } from "../../../Models/BaseProperties";

export interface SideMenuProperties extends BaseProperties {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    isOpen: boolean;
    closeEvent?: () => void;
};

