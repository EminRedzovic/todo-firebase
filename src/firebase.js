import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const getTodoList = async () => {
  const todoListCollection = collection(db, "todo-list");
  const quoteResults = await getDocs(todoListCollection);
  const quoteList = quoteResults.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { ...data, id: id };
  });
  return quoteList;
};
export const getTodoItemById = async (id) => {
  const docRef = doc(db, "todo-list", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data);
  return { ...data, id: id };
};

export const updateTodoItemData = async (id, data) => {
  const docRef = doc(db, "todo-list", id);
  return await updateDoc(docRef, data);
};
export const deleteTodoItem = async (id) => {
  const docRef = doc(db, "todo-list", id);
  return await deleteDoc(docRef);
};
export const addTodoItem = async (data) => {
  const result = await addDoc(collection(db, "todo-list"), data);
  return result;
};

export const logout = async () => {
  const result = await signOut(auth);
  return result;
};

export const deleteAllToDoItems = async () => {
  const collectionRef = collection(db, "todo-list");
  const querySnapshot = await getDocs(collectionRef);

  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
  });
};
