module.exports = {
  name: "menu",
  description: "Afficher le menu principal avec une interface améliorée",
  category: "utility",
  async execute(sock, msg, args, config) {
    try {
      const menu = `
╔═══════════════════════════════════════════════════════════╗
║         ⚡ LUST BOT - MENU PRINCIPAL ⚡                ║
║   Au-delà des nuages, Au-delà des limites                ║
╚═══════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 *COMMANDES FUN* 🎮
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  🎨 ${config.prefix}sticker ─ Convertir image en sticker
┃  😂 ${config.prefix}meme ─ Mème aléatoire
┃  💭 ${config.prefix}quote ─ Citation inspirante
┃  😄 ${config.prefix}joke ─ Blague amusante
┃  🧠 ${config.prefix}fact ─ Fait intéressant
┃  🎭 ${config.prefix}truth ─ Question de vérité
┃  💪 ${config.prefix}dare ─ Défi audacieux
┃  💕 ${config.prefix}ship ─ Compatibilité
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👑 *COMMANDES ADMIN* 👑
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  📢 ${config.prefix}tagall ─ Mentionner tout le monde
┃  👢 ${config.prefix}kick ─ Expulser un membre
┃  ⬆️  ${config.prefix}promote ─ Faire administrateur
┃  ⬇️  ${config.prefix}demote ─ Retirer administrateur
┃  🔒 ${config.prefix}close ─ Fermer le groupe
┃  🔓 ${config.prefix}open ─ Ouvrir le groupe
┃  👋 ${config.prefix}leave ─ Le bot s'en va
┃  🔗 ${config.prefix}linkgc ─ Lien du groupe
┃  🔄 ${config.prefix}resetlink ─ Réinitialiser le lien
┃  👑 ${config.prefix}admins ─ Lister les admins
┃  📊 ${config.prefix}groupinfo ─ Informations du groupe
┃  ⚡ ${config.prefix}autopromote ─ Promouvoir le propriétaire
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ️ *INFO & STATUT* ℹ️
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  🏓 ${config.prefix}ping ─ Latence du bot
┃  ✅ ${config.prefix}alive ─ État du bot
┃  👑 ${config.prefix}owner ─ Propriétaire du bot
┃  🤖 ${config.prefix}bot ─ Infos du bot
┃  ⏱️  ${config.prefix}runtime ─ Temps d'exécution
┃  ⚡ ${config.prefix}speed ─ Test de vitesse
┃  📋 ${config.prefix}menu ─ Ce menu
┃  ❓ ${config.prefix}help ─ Aide complète
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ *CARACTÉRISTIQUES* ✨
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃  ⚡ Rapide et silencieux
┃  🔐 Sécurisé avec Baileys
┃  🎯 27+ commandes
┃  📌 Gestion de groupes
┃  🤖 Automatisation avancée
┃  🎨 Interface moderne
┃  💎 Premium features
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 *INFOS DU BOT*
┣ 🤖 Nom: ${config.botName}
┣ 📌 Version: ${config.version}
┣ ⚡ Préfixe: ${config.prefix}
┣ ⏱️  Cooldown: ${config.cooldown}s
┗ 📱 État: 🟢 EN LIGNE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 *Développé par LUST DEV* 💪
🌐 Au-delà des nuages, Au-delà des limites
⭐ https://i.postimg.cc/JznXjbWh/019e71fd-9461-7b7d-ac0e-b3341084a3e4.png

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
      
      // Envoyer le menu avec image
      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: "https://i.postimg.cc/JznXjbWh/019e71fd-9461-7b7d-ac0e-b3341084a3e4.png" },
        caption: menu
      });
      
    } catch (error) {
      console.error(error);
      await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Une erreur est survenue lors du chargement du menu"
      });
    }
  }
};
