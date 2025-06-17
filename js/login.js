import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from './firebaseConfig.js'; // Import correcto con ruta relativa

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch((error) => {
      document.getElementById("error").innerText = error.message;
      console.error(error);
    });
}

document.getElementById("loginBtn").addEventListener("click", login);
