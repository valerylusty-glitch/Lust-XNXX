module.exports = {
  name: "meme",
  description: "Get a random meme",
  category: "fun",
  async execute(sock, msg, args, config) {
    try {
      // Implementation for meme fetching
      await sock.sendMessage(msg.key.remoteJid, { text: "😂 Here's a random meme for you!" });
    } catch (error) {
      console.error(error);
    }
  }
};
