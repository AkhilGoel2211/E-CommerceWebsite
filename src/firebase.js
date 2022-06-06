import {initializeApp} from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
// import {useState} from "react";
// import {useEffect} from "react";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
  where,
  addDoc,
  updateDoc,
  increment,
  deleteField,
  getDoc,
} from "firebase/firestore";
// import {useNavigate} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAVN_YnxE5pTGUEdwg2aKpl2jdM5GzsOZs",
  authDomain: "ecommerce-website-52011.firebaseapp.com",
  projectId: "ecommerce-website-52011",
  storageBucket: "ecommerce-website-52011.appspot.com",
  messagingSenderId: "800509104855",
  appId: "1:800509104855:web:16153e35e4e3af0c561692",
  measurementId: "G-EF7VB2JNCZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, money) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      money: Number(money),
    });
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch(err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

// const inventory = async (db) => {
//   const inventory = collection(db, 'inventory');
//   const inventorySnapshot = await getDocs(inventory);
//   const inventoryList = inventorySnapshot.docs.map(doc => doc.data());
//   return inventoryList;
// };

async function getInventory(db) {
  const inventory = collection(db, "inventory");
  const inventorySnapshot = await getDocs(inventory);
  const inventoryList = inventorySnapshot.docs.map((doc) => doc.data());
  return inventoryList;
}

const getUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if(user) {
    return user.uid;
  }
};

async function getCartList(db) {
  let uid = getUserId();
  const orders = query(collection(db, "cartList"), where("user", "==", uid));
  const ordersSnapshot = await getDocs(orders);
  const cartList = ordersSnapshot.docs.map((doc) => doc.data());
  return cartList;
}

// function getUserId() {
//   const [uid, setUid] = useState(null);
//   useEffect(() => {
//     auth.onAuthStateChanged(user => {
//       if(user) {
//         setUid(user.uid);
//       }
//     });
//   }, []);
//   return uid;
// }

async function addToCart(item, uid) {

  // const inventoryItemRef = doc(collection(db, "inventory", item.id));
  // console.log(inventoryItemRef);
  // updateDoc(inventoryItemRef, {
  //   count: increment(-1),
  // });

  // const cartRef = doc(db, "cartList", "Dc33w0kWs5T1axoEY7fd");
  // console.log(cartRef, "DOC CALLED");
  // const potential_items = query(collection(db, "cartList"), where("id", "==", item.id));
  // console.log(potential_items);
  // for(var key in potential_items) {
  //   console.log(key);
  // }
  // console.log(potential_items[0]);
  // await updateDoc(potential_items[0], {
  //   count: increment(1)
  // });

  // if(potential_items != null) {

  // }

  const cartRef = doc(db, "cartList", `${item.id + uid}`);
  const docSnap = await getDoc(cartRef);
  if(docSnap.exists()) {
    updateDoc(cartRef, {
      count: increment(1),
    });
  } else {
    console.log("hello");
    await setDoc(doc(db, "cartList", `${item.id + uid}`), {
      id: item.id,
      title: item.title,
      count: 1,
      image: item.image,
      price: item.price,
      user: uid,
    });
  }
}

// async function addToCart(item, uid) {
//   const cartRef = collection(db, "cartList");
//   await setDoc(doc(cartRef, `${item.id + uid}`), {
//     id: item.id,
//     title: item.title,
//     count: 1,
//     image: item.image,
//     price: item.price,
//     user: uid,
//   });
// }

async function removeFromCart(item, uid) {
  const cartRef = doc(db, "cartList", `${item.id + uid}`);
  await deleteDoc(cartRef);
}

async function favouriteItem(item, uid) {
  await setDoc(doc(db, "favourite", `favourite${item.id + uid}`), {
    id: item.id,
    title: item.title,
    favourite: true,
    user: uid,
  });
}

async function addMoney(money) {
  const usersRef = doc(collection(db, "users"));
  await setDoc(usersRef, {
    money: money,
  });
}

async function orderConfirmed(cart, price, uid) {

}

// const inventory = collection(db, "inventory");
// console.log(inventory);

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getInventory,
  getCartList,
  addToCart,
  favouriteItem,
  addMoney,
  removeFromCart,
  orderConfirmed,
};
