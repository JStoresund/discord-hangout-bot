const { SlashCommandBuilder, italic } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { guildID } = require('../../config.json')
const { createDiscordEvent } = require('../../event.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createevent')
    .setDescription('Creates a new event!')

    .addStringOption(option => 
      option.
        setName('name')
        .setDescription('The name of the event')
        .setRequired(true)
      )

    .addStringOption(option => 
      option.
        setName('date')
        .setDescription('The date of the event in the format MM-DD OR MM-DD-YYYY')
        .setRequired(true)
      )

    .addStringOption(option => 
      option.
        setName('time')
        .setDescription('The time of the event in the format HH:MM')
        .setRequired(true)
      )

    .addStringOption(option =>
      option.
        setName('description')
        .setDescription('A description of the event')
        .setRequired(false)
      ),

  async execute(interaction) {
    const name = interaction.options.getString('name')
    let date = interaction.options.getString('date').split('-')
    if (date.length === 2) {
      const currentYear = new Date().getFullYear()
      date.push(date[0] > new Date().getMonth() ? currentYear : currentYear + 1)
    }
    let time = interaction.options.getString('time').split(':')

    const description = interaction.options.getString('description') || 'No description provided.'

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

    const startTime = new Date(2024, 3)
    const endTime = new Date(2024, 4)

    await createDiscordEvent(name, startTime, endTime, 'https://discord.com')

    await interaction.reply(`Code finished running!`)
  },
}