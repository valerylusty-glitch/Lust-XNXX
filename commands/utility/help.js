module.exports = {
  name: "help",
  description: "Show help with enhanced UI",
  category: "utility",
  async execute(sock, msg, args, config) {
    try {
      const helpText = `
╔═══════════════════════════════════╗
║  ❓ AYUDA Y DOCUMENTACIÓN ❓    ║
║  LUST BOT - Centro de Ayuda      ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 *CÓMO USAR EL BOT*
┗━━━━━━━━━━━━━━━━━━━━━━
Escribe: ${config.prefix}<comando> [argumentos]

Ejemplo: ${config.prefix}ship Juan Maria

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 *CATEGORÍAS DE COMANDOS*
┗━━━━━━━━━━━━━━━━━━━━━━

1️⃣ *COMANDOS DE DIVERSIÓN*
   Para entretención e interacción
   Acceso: Público (Todos)

2️⃣ *COMANDOS DE ADMINISTRACIÓN*
   Para gestión de grupos
   Acceso: Solo administradores

3️⃣ *COMANDOS DE INFORMACIÓN*
   Para info del bot y estado
   Acceso: Público (Todos)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 *EJEMPLOS DE USO*
┗━━━━━━━━━━━━━━━━━━━━━━

🎯 Verificar latencia:
   ${config.prefix}ping

🎯 Obtener un chiste:
   ${config.prefix}joke

🎯 Ver el menú:
   ${config.prefix}menu

🎯 Emparejar nombres:
   ${config.prefix}ship nombre1 nombre2

🎯 Información del bot:
   ${config.prefix}bot

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ *CONSEJOS ÚTILES*
┗━━━━━━━━━━━━━━━━━━━━━━

✓ Usa ${config.prefix}menu para ver todos los comandos
✓ Los comandos de admin requieren ser admin del grupo
✓ Hay ${config.cooldown} segundos de espera entre comandos
✓ Responde a una imagen con ${config.prefix}sticker
✓ Los comandos son case-insensitive (mayúsculas/minúsculas)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ *ERRORES COMUNES*
┗━━━━━━━━━━━━━━━━━━━━━━

Error: "Comando no encontrado"
→ Verifica que escribiste bien el comando

Error: "No tienes permisos"
→ Solo admins pueden usar comandos de admin

Error: "Estoy en cooldown"
→ Espera ${config.cooldown} segundos entre comandos

Error: "Bot no es admin"
→ Pide al admin que promocione al bot

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 *REQUISITOS*
┗━━━━━━━━━━━━━━━━━━━━━━

✓ WhatsApp activo
✓ Bot vinculado al grupo
✓ Permisos necesarios
✓ Conexión a internet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 *CONTACTO & SOPORTE*
┗━━━━━━━━━━━━━━━━━━━━━━

¿Problemas? Contacta al dueño:
📱 +${config.owner}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 *Powered by LUST DEV*
🔥 Domination. Control. Automation.
      `.trim();
      
      await sock.sendMessage(msg.key.remoteJid, { text: helpText });
    } catch (error) {
      console.error(error);
    }
  }
};
