import { Middleware } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../../store/store";

export type AppMiddleware = Middleware<object, State, AppDispatch>;
