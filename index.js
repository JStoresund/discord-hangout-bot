import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle} from 'discord.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ]
})

client.on("messageCreate", async (message) => {
  console.log(message)

  if (message.author.bot) return
  message.author.send({
    content: "Hello!",
    components: [
      new ButtonBuilder()
        .setStyle(ButtonStyle.PRIMARY)
        .setLabel("Click me!")
        .setCustomId("click_me")
        .toJSON()
    ]
  })
})