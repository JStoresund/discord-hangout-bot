const { Routes, RESTPostAPIGuildScheduledEventJSONBody, RESTPostAPIGuildScheduledEventResult } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const { guildId, token } = require('./config.json')

const rest = new REST({ version: '10' }).setToken(token);

module.exports = {
  helloWorld: () => {
    console.log("Hello world from event.js!")
  },
 createDiscordEvent: 
  async (
    name,
    startTime,
    endTime,
    eventUrl
  ) =>  {
    const eventData = {
      name,
      entity_type: 3,
      scheduled_start_time: startTime,
      scheduled_end_time: endTime,
      privacy_level: 2,
      entity_metadata: {
        location: eventUrl,
      },
    };
    const event = (await rest.post(
      Routes.guildScheduledEvents(guildId),
      {
        body: eventData,
      }
    )) 
    return event.id;
  }
}
