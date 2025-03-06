import { createSelector } from '@reduxjs/toolkit';

// Selectează întreaga stare de autentificare din Redux
export const selectAuthState = state => state.auth;

// Selectează token-ul utilizatorului
export const selectToken = createSelector(selectAuthState, auth => auth.token);

// Selectează datele utilizatorului
export const selectUser = createSelector(selectAuthState, auth => auth.user);

// Verifică dacă utilizatorul este autentificat
export const selectIsLoggedIn = createSelector(
  selectToken,
  token => !!token // returnează true dacă token-ul există
);

// Verifică dacă datele utilizatorului sunt încărcate
export const selectIsUserLoaded = createSelector(
  selectUser,
  user => !!user // returnează true dacă user există
);
