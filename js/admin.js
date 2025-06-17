import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const productosRef = collection(db, "productos");

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
  else cargarLista();
});

window.logout = () => signOut(auth);

window.agregarProducto = async function() {
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("imagen").value;
  if (nombre && imagen) {
    await addDoc(productosRef, { nombre, imagen });
    cargarLista();
  }
};

async function cargarLista() {
  const snapshot = await getDocs(productosRef);
  const cont = document.getElementById("lista-productos");
  cont.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    cont.innerHTML += `
      <div>
        <strong>${data.nombre}</strong>
        <img src="${data.imagen}" width="100">
        <button onclick="eliminarProducto('${docSnap.id}')">Eliminar</button>
      </div>`;
  });
}

window.eliminarProducto = async function(id) {
  await deleteDoc(doc(db, "productos", id));
  cargarLista();
};
