export const selectUser = (state) => state.user.user;
export const selectLogin = (state) => state.user.isLogged;

export const selectError = (state) => state.user.error;
export const selectStatus = (state) => state.user.status;
