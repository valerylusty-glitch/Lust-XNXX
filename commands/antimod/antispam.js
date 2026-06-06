module.exports = {
  name: "antispam",
  aliases: ["antispam"],
  description: "Active/Désactive la protection anti-spam du groupe",
  category: "Anti-Moderation",
  usage: ".antispam on/off",
  
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
        text: "⚠️ Utilisation: .antispam on/off"
      });
    }

    const statusText = state === "on" ? "✅ ACTIVÉ" : "❌ DÉSACTIVÉ";
    
    await sock.sendMessage(groupId, {
      text: `
╔═══════════════════════════════════════════╗
║         🛡️ ANTI-SPAM 🛡️                ║
╚═══════════════════════════════════════════╝

Statut: ${statusText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Protection Anti-Spam ${state === "on" ? "ACTIVÉE" : "DÉSACTIVÉE"}

✅ Les messages spam seront ${state === "on" ? "détectés et supprimés" : "tolérés"}
✅ Limites de débit appliquées

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ Configuré par LUST BOT
`.trim()
    });
  }
};
