import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCdTUzlHDXCRcwDuyY0VuEYxKk1iqsCvmk",
  authDomain: "chat-app-gs-1caf9.firebaseapp.com",
  projectId: "chat-app-gs-1caf9",
  storageBucket: "chat-app-gs-1caf9.appspot.com",
  messagingSenderId: "666543993587",
  appId: "1:666543993587:web:2affb8f4a8d23e9e633d86",
  measurementId: "G-N0YZ0P4JLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using Chat App.",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = async () =>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
  
}

export {signup,login,logout,auth,db}