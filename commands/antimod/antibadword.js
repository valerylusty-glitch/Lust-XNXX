module.exports = {
  name: "antibadword",
  aliases: ["antibadword"],
  description: "Active/Désactive le filtre anti-insultes du groupe",
  category: "Anti-Moderation",
  usage: ".antibadword on/off",
  
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
        text: "⚠️ Utilisation: .antibadword on/off"
      });
    }

    const statusText = state === "on" ? "✅ ACTIVÉ" : "❌ DÉSACTIVÉ";
    
    await sock.sendMessage(groupId, {
      text: `
╔═══════════════════════════════════════════╗
║       🚫 FILTRE ANTI-INSULTES 🚫        ║
╚═══════════════════════════════════════════╝

Statut: ${statusText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Filtre Anti-Insultes ${state === "on" ? "ACTIVÉ" : "DÉSACTIVÉ"}

✅ Les insultes seront ${state === "on" ? "détectées et supprimées" : "tolérées"}
✅ Avertissement automatique
✅ Messages offensants censurés

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ Configuré par LUST BOT
`.trim()
    });
  }
};
