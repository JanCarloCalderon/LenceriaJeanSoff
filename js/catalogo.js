import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cargarProductos() {
  const productosRef = collection(db, "productos");
  const snapshot = await getDocs(productosRef);
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    contenedor.innerHTML += `
      <div>
        <h3>${data.nombre}</h3>
        <img src="${data.imagen}" width="150">
      </div>`;
  });
}

cargarProductos();
