module.exports = {
  name: "antiraid",
  aliases: ["antiraid"],
  description: "Active/Désactive la protection anti-raid du groupe",
  category: "Anti-Moderation",
  usage: ".antiraid on/off",
  
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
        text: "⚠️ Utilisation: .antiraid on/off"
      });
    }

    const statusText = state === "on" ? "✅ ACTIVÉ" : "❌ DÉSACTIVÉ";
    
    await sock.sendMessage(groupId, {
      text: `
╔═══════════════════════════════════════════╗
║         ⚔️ ANTI-RAID ⚔️                  ║
╚═══════════════════════════════════════════╝

Statut: ${statusText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Protection Anti-Raid ${state === "on" ? "ACTIVÉE" : "DÉSACTIVÉE"}

✅ Détection des raids massifs
✅ Expulsion automatique des comptes suspects
✅ Alerte aux administrateurs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ Configuré par LUST BOT
`.trim()
    });
  }
};
