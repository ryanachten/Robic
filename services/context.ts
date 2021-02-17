import { createContext } from "react";
import { AuthActions, AuthState } from "../reducers/auth";
import { UserActions, UserState } from "../reducers/user";
import {
  ExerciseDefinitionActions,
  ExerciseDefinitionState,
} from "../reducers/exerciseDefinition";
import { AnalyticsActions, AnalyticsState } from "../reducers/analytics";

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});

export const UserContext = createContext<{
  state: UserState;
  actions: UserActions;
}>({});

export const ExerciseDefintionContext = createContext<{
  state: ExerciseDefinitionState;
  actions: ExerciseDefinitionActions;
}>({});

export const AnalyticsContext = createContext<{
  state: AnalyticsState;
  actions: AnalyticsActions;
}>({});
