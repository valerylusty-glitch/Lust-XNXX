const { default: makeWASocket } = require("@whiskeysockets/baileys");
const fs = require("fs");
const config = require("./config");

const commands = new Map();
const cooldown = new Map();
const startTime = Date.now();

// charger commandes récursivement
function loadCommands(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = dir + "/" + file;
    if (fs.lstatSync(full).isDirectory()) return loadCommands(full);

    const cmd = require(full);
    commands.set(cmd.name, cmd);
  });
}

loadCommands("./commands");

async function startBot() {
  const sock = makeWASocket();

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || "";
    const sender = msg.key.participant || msg.key.remoteJid;

    if (!text.startsWith(config.prefix)) return;

    // anti spam
    if (cooldown.has(sender)) return;
    cooldown.set(sender, true);
    setTimeout(() => cooldown.delete(sender), config.cooldown * 1000);

    const args = text.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (commands.has(command)) {
      commands.get(command).execute(sock, msg, args, config, startTime);
    }
  });
}

startBot();
