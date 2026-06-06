module.exports = {
  name: "antilink",
  description: "Activer/Désactiver la suppression des liens",
  category: "antisystem",
  async execute(sock, msg, args, config) {
    try {
      const groupId = msg.key.remoteJid;
      const sender = msg.key.participant;
      
      if (!groupId.endsWith("@g.us")) {
        return await sock.sendMessage(groupId, {
          text: "❌ Cette commande fonctionne uniquement dans les groupes!"
        });
      }
      
      const groupMetadata = await sock.groupMetadata(groupId);
      const isAdmin = groupMetadata.admins?.includes(sender);
      
      if (!isAdmin) {
        return await sock.sendMessage(groupId, {
          text: `❌ Seuls les administrateurs peuvent utiliser cette commande!`
        });
      }

      const status = args[0]?.toLowerCase();
      
      if (!status || !["on", "off"].includes(status)) {
        return await sock.sendMessage(groupId, {
          text: `
╔═══════════════════════════════════════════════════════════╗
║          🔗 ANTILINK - UTILISATION 🔗                  ║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *COMMANDE*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  ${config.prefix}antilink on  → Activer
┃  ${config.prefix}antilink off → Désactiver
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ *EFFET*
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  ✅ Supprime automatiquement les liens
┃  ✅ Prévient le spam de liens
┃  ✅ Protège le groupe
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 Powered by LUST DEV
          `.trim()
        });
      }

      const response = `
╔═══════════════════════════════════════════════════════════╗
║          🔗 ANTILINK - ${status.toUpperCase()} 🔗${status === "on" ? "      " : "        "}║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *STATUT CHANGÉ*

📊 État: ${status === "on" ? "🟢 ACTIVÉ" : "🔴 DÉSACTIVÉ"}
🏘️  Groupe: ${groupMetadata.subject}
⏰ Timestamp: ${new Date().toLocaleString('fr-FR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *EFFET*
${status === "on" ? "✅ Tous les liens seront supprimés automatiquement" : "✅ Les liens sont maintenant autorisés"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 Powered by LUST DEV
      `.trim();

      await sock.sendMessage(groupId, { text: response });
    } catch (error) {
      console.error(error);
    }
  }
};
