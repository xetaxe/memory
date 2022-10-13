import {ChangeEventHandler } from "react";
import * as t from "../types/types";

export interface OptionsMenuProps {
	NumCards: number,
	HandleNumCards: (numCards: number) => void;
}