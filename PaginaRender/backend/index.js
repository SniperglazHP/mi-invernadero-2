const express = require("express");
const admin = require("firebase-admin");

// Inicializar Firebase Admin SDK
const serviceAccount = require("./firebase-admin-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://practica-humedad-temperatura.firebaseio.com"
});

const db = admin.database();

// Configurar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para obtener datos del Realtime Database
app.get("/data", async (req, res) => {
  try {
    const snapshot = await db.ref("invernadero").once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error al obtener datos" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
