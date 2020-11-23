import React, { useContext, useState, useEffect } from "react";
import { auth } from "./Firebase/firebase";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
