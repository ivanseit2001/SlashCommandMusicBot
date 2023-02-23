const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("repeat")
        .setDescription("Repeat songs")
        .addSubcommand(subcommand =>
			subcommand
            .setName("all")
            .setDescription("Repeats the whole queue")
            )
        .addSubcommand(subcommand =>
			subcommand
            .setName("one")
            .setDescription("Repeats one song"))
        .addSubcommand(subcommand =>
                subcommand
                .setName("off")
                .setDescription("Turns off repeat")),
	execute: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) return interaction.reply("No one's here!\r\nhttps://tenor.com/view/boowomp-nijika-ijichi-nijika-ichiji-boowomp-gif-27229601");
        // Get the current queue
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("There are no songs in the queue\r\nhttps://tenor.com/view/boowomp-nijika-ijichi-nijika-ichiji-boowomp-gif-27229601")
			return;
		}
        let embed=new EmbedBuilder()
		if (interaction.options.getSubcommand()==="all"){
        // Repeats everything
		queue.setRepeatMode(2);
        await interaction.reply("Loop the queue")
    }
        if (interaction.options.getSubcommand()==="one"){
            queue.setRepeatMode(1)
            await interaction.reply("Looping one song")
        }
        if (interaction.options.getSubcommand()==="off"){
            queue.setRepeatMode(0)
            await interaction.reply("Loop off")
        }

        
	},
}