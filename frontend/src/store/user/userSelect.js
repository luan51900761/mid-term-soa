import { createSelector } from "reselect";

export const selectUser = (state) => state.user.user;
export const selectLogin = (state) => state.user.isLogged;

export const selectError = (state) => state.user.error;
export const selectStatus = (state) => state.user.status;

export const selectBalance = createSelector([selectUser], (user) => {
  let x = user.balance * 1;
  x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  return x;
});
