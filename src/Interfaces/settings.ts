import { ReactNode } from "react";

export enum ToggleState {
	on = "ON",
	off = "OFF",
}

export interface DarkModeState {
	toggleStateStatus: ToggleState;
	display: ReactNode;
}
