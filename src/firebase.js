import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA8oEAnPqimpp8xZs5q4Cvbl4nTae86Jno",
  authDomain: "netflix-clone-81147.firebaseapp.com",
  projectId: "netflix-clone-81147",
  storageBucket: "netflix-clone-81147.appspot.com",
  messagingSenderId: "183084034268",
  appId: "1:183084034268:web:d1d0130f1b64719224ac19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password); 
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid, 
            name, 
            authProvider: "local",
            email, 
        }); 
    } catch (error) {
        console.log(error); 
        toast.error(error.code.split("/")[1].split('-').join(" "));  
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password); 
    } catch (error) {
        console.log(error); 
        toast.error(error.code.split("/")[1].split('-').join(" ")); 
    }
}

const logout = async () => {
    signOut(auth); 
}

export {auth, db, login, signup, logout}; 