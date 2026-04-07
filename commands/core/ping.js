module.exports = {
  name: 'ping',
  description: '🏓 Teste si le bot fonctionne',
  category: 'Core',
  usage: 'ping',
  execute: async (sock, msg, args, config) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🏓 Pong! Le bot fonctionne normalement ✅'
    });
  }
};
