import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "typesafe-actions";
import { AppState } from "./reducer";

export type CustomThunkAction = ThunkAction<Promise<any>, AppState, null, Action<string>>

export type CustomThunkDispatch = ThunkDispatch<AppState, null, Action<string>>