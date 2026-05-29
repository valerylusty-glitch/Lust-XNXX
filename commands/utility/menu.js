module.exports = {
  name: "menu",
  description: "Display main menu with enhanced UI",
  category: "utility",
  async execute(sock, msg, args, config) {
    try {
      const menu = `
╔═══════════════════════════════════╗
║  ⚡ LUST BOT - MAIN MENU ⚡    ║
║  Beyond The Clouds, Beyond Limits ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 *FUN COMMANDS*
┗━━━━━━━━━━━━━━━━━━━━━━
  🎨 ${config.prefix}sticker ─ Convertir imagen a sticker
  😂 ${config.prefix}meme ─ Meme aleatorio
  💭 ${config.prefix}quote ─ Cita inspiradora
  😄 ${config.prefix}joke ─ Chiste divertido
  🧠 ${config.prefix}fact ─ Hecho interesante
  🎭 ${config.prefix}truth ─ Pregunta de verdad
  💪 ${config.prefix}dare ─ Reto atrevido
  💕 ${config.prefix}ship ─ Compatibilidad

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👑 *ADMIN COMMANDS*
┗━━━━━━━━━━━━━━━━━━━━━━
  📢 ${config.prefix}tagall ─ Mencionar a todos
  👢 ${config.prefix}kick ─ Expulsar miembro
  ⬆️ ${config.prefix}promote ─ Hacer admin
  ⬇️ ${config.prefix}demote ─ Remover admin
  🔒 ${config.prefix}close ─ Cerrar grupo
  🔓 ${config.prefix}open ─ Abrir grupo
  👋 ${config.prefix}leave ─ Bot se va
  🔗 ${config.prefix}linkgc ─ Link del grupo
  🔄 ${config.prefix}resetlink ─ Resetear link
  👑 ${config.prefix}admins ─ Listar admins
  📊 ${config.prefix}groupe ─ Info del grupo
  ⚡ ${config.prefix}autopromote ─ Promocionar dueño

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ️ *INFO & STATUS*
┗━━━━━━━━━━━━━━━━━━━━━━
  🏓 ${config.prefix}ping ─ Latencia del bot
  ✅ ${config.prefix}alive ─ Estado del bot
  👑 ${config.prefix}owner ─ Dueño del bot
  🤖 ${config.prefix}bot ─ Info del bot
  ⏱️ ${config.prefix}runtime ─ Tiempo de ejecución
  ⚡ ${config.prefix}speed ─ Test de velocidad
  📋 ${config.prefix}menu ─ Este menú
  ❓ ${config.prefix}help ─ Ayuda completa

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ *CARACTERÍSTICAS*
┗━━━━━━━━━━━━━━━━━━━━━━
  ⚡ Rápido y silencioso
  🔐 Seguro con Baileys
  🎯 27+ comandos
  📌 Gestión de grupos
  🤖 Automatización
  🎨 Interfaz moderna

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 BOT INFO
┣ 🤖 Nombre: ${config.botName}
┣ 📌 Versión: ${config.version}
┣ ⚡ Prefix: ${config.prefix}
┣ ⏱️ Cooldown: ${config.cooldown}s
┗ 📱 Estado: 🟢 ONLINE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 *Powered by LUST DEV*
🌐 Beyond The Clouds, Beyond Limits
      `.trim();
      
      await sock.sendMessage(msg.key.remoteJid, { text: menu });
    } catch (error) {
      console.error(error);
    }
  }
};
