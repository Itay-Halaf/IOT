import { MouseEventHandler, ReactNode, } from "react";

export type CardProperties = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
};

