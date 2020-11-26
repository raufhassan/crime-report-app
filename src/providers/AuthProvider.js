import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const signup = (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebaseAuth.signOut();
    history.push("/login");
  };

  const resetPassword = (email) => {
    return firebaseAuth.sendPasswordResetEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
