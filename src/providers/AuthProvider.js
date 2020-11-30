import React, { useState, useEffect } from "react";
import { FirebaseAuth } from "../config/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => {
    return FirebaseAuth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return FirebaseAuth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return FirebaseAuth.signOut();
  };

  const resetPassword = (email) => {
    return FirebaseAuth.sendPasswordResetEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
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
};
