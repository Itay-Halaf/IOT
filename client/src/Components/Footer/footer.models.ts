import { MouseEventHandler, ReactNode, } from "react";
import { BaseProperties } from "../../Models/BaseProperties";

export interface FooterProperties extends BaseProperties {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
};

