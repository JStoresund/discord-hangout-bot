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
      ),
  async execute(interaction) {
    console.log("Create even called")
  },
}