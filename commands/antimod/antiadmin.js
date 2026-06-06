module.exports = {
  name: "antiadmin",
  aliases: ["antiadmin"],
  description: "Active/Désactive la protection anti-promotion d'admin du groupe",
  category: "Anti-Moderation",
  usage: ".antiadmin on/off",
  
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
        text: "⚠️ Utilisation: .antiadmin on/off"
      });
    }

    const statusText = state === "on" ? "✅ ACTIVÉ" : "❌ DÉSACTIVÉ";
    
    await sock.sendMessage(groupId, {
      text: `
╔═══════════════════════════════════════════╗
║       👑 ANTI-PROMOTION ADMIN 👑        ║
╚═══════════════════════════════════════════╝

Statut: ${statusText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Protection Anti-Promotion ${state === "on" ? "ACTIVÉE" : "DÉSACTIVÉE"}

✅ Promotions non autorisées seront ${state === "on" ? "bloquées" : "tolérées"}
✅ Rétrogradation automatique
✅ Alerte aux admins

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ Configuré par LUST BOT
`.trim()
    });
  }
};
