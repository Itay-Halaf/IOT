import { MouseEventHandler, ReactNode } from "react";
import { BaseProperties } from "../../../Models/BaseProperties";

export interface ButtonProperties extends BaseProperties {
    onClick: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
};

