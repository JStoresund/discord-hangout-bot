const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reply')
    .setDescription('Echos given command!')
		.addStringOption(option =>
			option
        .setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)),
  async execute(interaction) {
    // const target = interaction.options.getUser('target');
		const input = interaction.options.getString('input')
    console.log(`Input: ${input}`)
		await interaction.reply(`You wrote: ${input}`)
		// await interaction.guild.members.ban(target);
  }
}

// Path: commands/utility/help.js