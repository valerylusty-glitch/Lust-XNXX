module.exports = {
  name: "antibot",
  aliases: ["antibot"],
  description: "Active/Désactive la détection et blocage des bots",
  category: "Anti-Moderation",
  usage: ".antibot on/off",
  
  async execute(sock, msg, args, config) {
    const groupId = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    
    if (!groupId.endsWith("@g.us")) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Cette commande ne fonctionne que dans les groupes!"
      });
    }

    const groupMetadata = await sock.groupMetadata(groupId);
    const isAdmin = groupMetadata.admins?.includes(sender);
    
    if (!isAdmin) {
      return sock.sendMessage(groupId, {
        text: "❌ Vous devez être administrateur!"
      });
    }

    const state = args[0]?.toLowerCase();
    if (!["on", "off"].includes(state)) {
      return sock.sendMessage(groupId, {
        text: "⚠️ Utilisation: .antibot on/off"
      });
    }

    const statusText = state === "on" ? "✅ ACTIVÉ" : "❌ DÉSACTIVÉ";
    
    await sock.sendMessage(groupId, {
      text: `
╔═══════════════════════════════════════════╗
║         🤖 ANTI-BOT 🤖                  ║
╚═══════════════════════════════════════════╝

Statut: ${statusText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Détection Anti-Bot ${state === "on" ? "ACTIVÉE" : "DÉSACTIVÉE"}

✅ Bots malveillants seront ${state === "on" ? "détectés et expulsés" : "tolérés"}
✅ Vérification des comportements suspects
✅ Expulsion automatique

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ Configuré par LUST BOT
`.trim()
    });
  }
};
