const { SlashCommandBuilder } = require('@discordjs/builders')
const { guildID } = require('../../config.json')
const { Routes, RESTPostAPIGuildScheduledEventJSONBody, RESTPostAPIGuildScheduledEventResult } = require('discord-api-types/v9');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('event')
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
      ),
  async execute(interaction) {
    const name = interaction.options.getString('name')
    let date = interaction.options.getString('date').split('-')
    if (date.length === 2) {
      const currentYear = new Date().getFullYear()
      date.push(date[0] > new Date().getMonth() ? currentYear : currentYear + 1)
    }
    let time = interaction.options.getString('time').split(':')

    console.log(`Name: ${name}`)
    console.log(`Date: ${date}`)
    console.log(`Time: ${time}`)
    await interaction.reply(`Event created: ${name} on ${date[0]}/${date[1]}/${date[2]} at ${time[0]}:${time[1]}`)
  },
}