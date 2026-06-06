module.exports = {
  name: "close",
  description: "Fermer le groupe (seuls les admins peuvent écrire)",
  category: "admin",
  async execute(sock, msg, args, config) {
    try {
      const groupId = msg.key.remoteJid;
      
      if (!groupId.endsWith("@g.us")) {
        return await sock.sendMessage(groupId, {
          text: "❌ Cette commande fonctionne uniquement dans les groupes!"
        });
      }
      
      const response = `
╔═══════════════════════════════════════════════════════════╗
║           🔒 FERMETURE DU GROUPE 🔒                    ║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *STATUT*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  🔒 Groupe: FERMÉ
┃  ✍️  Mode: Admins uniquement
┃  👥 Membres: Peuvent lire, pas d'écriture
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *QU'EST-CE QUI CHANGE?*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  ✅ Seuls les admins peuvent écrire
┃  ✅ Seuls les admins peuvent envoyer des messages
┃  ❌ Les membres ne peuvent pas converser
┃  ✅ Les membres peuvent toujours lire
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 *POUR RÉOUVRIR*
Utilisez: ${config.prefix}open

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 Powered by LUST DEV
      `.trim();
      
      await sock.sendMessage(groupId, { text: response });
    } catch (error) {
      console.error(error);
    }
  }
};
