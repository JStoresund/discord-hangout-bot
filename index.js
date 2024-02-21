import { REST, Routes, SlashCommandBooleanOption, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}





import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    arguments: 0,
  },
  {
    name: 'hello',
    description: 'Lists all available commands',
    arguments: 0,
  },
  {
    name: 'help',
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
    if (command.name !== commandName) constinue
    if (command.arguments !== commandArgs.length) {
      console.log('Invalid number of arguments')
      return "ERROR: Invalid number of arguments"
    }
    return { commandName, commandArgs }
  }
  return "ERROR: Invalid command"
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, commandArgs } = decomposeCommand(interaction.commandName)

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
    return
  }

  if (commandName === 'help') {
    let reply = 'Here are all the available commands:\n\n'
    for(const command of commands) {
      reply += `**/${command.name}**\n ${command.description}\n\n`
    }
    await interaction.reply(reply);
    return
  }

  if (commandName === 'test') {
    await interaction.reply('Test command');
    return
  }

  if (commandName === 'hello') {
    await interaction.reply(`Hello, ${commandArgs[0]}!`);
    return
  }
  await interaction.reply('Invalid command');
});

client.login(process.env.DISCORD_TOKEN);