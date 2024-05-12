import React, { createContext, useState, useEffect, useContext } from 'react';
// import { auth, db } from './firebase'; // Assuming you have Firebase initialized

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      db.collection('users').doc(currentUser.email).get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, [currentUser]);

  const value = {
    currentUser,
    userData,
    signUp,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}