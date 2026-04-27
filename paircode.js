import { default as makeWASocket, fetchLatestBaileysVersion, useMultiFileAuthState } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8000;

let qrCodeData = null;
let pairingCode = null;

app.use(express.static('public'));

// Route pour afficher la page d'appairage
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

// Route API QR Code
app.get('/api/qr', (req, res) => {
  if (qrCodeData) {
    res.json({ qr: qrCodeData, type: 'qr' });
  } else {
    res.json({ message: 'En attente du code QR...' });
  }
});

// Route API Pair Code
app.get('/api/paircode', (req, res) => {
  if (pairingCode) {
    res.json({ paircode: pairingCode, type: 'paircode' });
  } else {
    res.json({ message: 'En attente du code d\'appairage...' });
  }
});

// Initialiser le bot
async function initBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrCodeData = await QRCode.toDataURL(qr);
      console.log('✅ QR Code généré');
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
      if (shouldReconnect) {
        initBot();
      }
    } else if (connection === 'open') {
      console.log('✅ Bot connecté avec succès!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // Générer le code d'appairage (pour téléphones sans numéro)
  if (!state.creds?.me?.id) {
    pairingCode = await sock.requestPairingCode('+1234567890');
    console.log(`📱 Code d'appairage: ${pairingCode}`);
  }
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  initBot();
});
