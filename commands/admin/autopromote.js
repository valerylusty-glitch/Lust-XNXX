module.exports = {
  name: "autopromote",
  description: "Auto promote owner in group",
  category: "admin",
  async execute(sock, msg, args, config) {
    try {
      const groupId = msg.key.remoteJid;
      const sender = msg.key.participant;
      const ownerNumber = config.owner + "1(849) 444-4305@s.whatsapp.net";
      
      // Check if sender is group admin
      const groupMetadata = await sock.groupMetadata(groupId);
      const isAdmin = groupMetadata.admins?.includes(sender);
      
      if (!isAdmin) {
        return await sock.sendMessage(groupId, { 
          text: `
╔═══════════════════════════════════╗
║  ❌ AUTOPROMOTE ERROR ❌        ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ *PERMISO DENEGADO*

📌 Error: No tienes permisos suficientes
👤 Requerido: Ser administrador del grupo
🚫 Tu estado: Usuario normal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Solución:
   Pídele a un admin que ejecute este comando

💪 Powered by LUST DEV
          `.trim() 
        });
      }

      // Check if owner is in group
      const members = groupMetadata.participants.map(p => p.id);
      if (!members.includes(ownerNumber)) {
        return await sock.sendMessage(groupId, { 
          text: `
╔═══════════════════════════════════╗
║  ⚠️ AUTOPROMOTE INFO ⚠️         ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 *EL DUEÑO NO ESTÁ EN EL GRUPO*

👤 Dueño: +${config.owner}
🏘️ Grupo: ${groupMetadata.subject}
📍 Estado: No miembro

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Solución:
   Invita primero al dueño al grupo

💪 Powered by LUST DEV
          `.trim() 
        });
      }

      // Check if owner is already admin
      if (groupMetadata.admins?.includes(ownerNumber)) {
        return await sock.sendMessage(groupId, { 
          text: `
╔═══════════════════════════════════╗
║  ℹ️ AUTOPROMOTE INFO ℹ️          ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ️ *YA ES ADMINISTRADOR*

👑 Usuario: +${config.owner}
📌 Estado: Ya es admin
🏘️ Grupo: ${groupMetadata.subject}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Info:
   El dueño ya tiene permisos completos

💪 Powered by LUST DEV
          `.trim() 
        });
      }

      // Promote owner
      await sock.groupParticipantsUpdate(groupId, [ownerNumber], "promote");
      
      await sock.sendMessage(groupId, { 
        text: `
╔═══════════════════════════════════╗
║  ⬆️ AUTOPROMOTE SUCCESS ⬆️       ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ *PROMOCIÓN EXITOSA*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👑 Usuario: +${config.owner}
📌 Estado: ✅ Ahora es ADMIN
🏘️ Grupo: ${groupMetadata.subject}
⚡ Acción: Completada
🤖 Bot: ${config.botName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 ¡El dueño ahora tiene permisos!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 Powered by LUST DEV
🌐 Beyond The Clouds, Beyond Limits
        `.trim() 
      });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `
╔═══════════════════════════════════╗
║  ❌ ERROR ❌                     ║
╚═══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Error en autopromote: ${error.message}

💪 Powered by LUST DEV
        `.trim() 
      });
    }
  }
};
