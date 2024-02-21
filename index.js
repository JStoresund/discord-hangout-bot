require("dotenv").config()

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds, 
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
] });

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    arguments: 0,
  },
  {
    name: 'help',
    description: 'Lists all available commands',
    arguments: 0,
  },
  {
    name: 'hello',
    description: 'Says hello to the given name',
    arguments: 1,
  },
  {
    name: 'test',
    description: 'Test command',
    arguments: 0,
  }
]

const decomposeCommand = (command) => {
  const splitCommands = command.split(' ')
  let commandName = splitCommands[0]
  let commandArgs = splitCommands.slice(1)
  for(const command of commands) {
    if (command.name !== commandName) 
      continue
    if (command.arguments !== commandArgs.length) {
      console.log('Invalid number of arguments')
      throw "ERROR: Invalid number of arguments"
    }
    return { commandName, commandArgs }
  }
  throw "ERROR: Invalid command"
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  
  const { commandName, commandArgs } = decomposeCommand(msg.content)
  
  
})


client.login(process.env.DISCORD_TOKEN);