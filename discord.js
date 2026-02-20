import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

bot.on('ready', () => {
  console.log(`Bot logado como ${bot.user.tag}`);
});

export async function enviarMensagem(canalId, conteudo, embedDados = null) {
  const canal = await bot.channels.fetch(canalId);
  if (!canal || !canal.isTextBased()) return;

  let mensagem = { content: conteudo };
  if (embedDados) {
    const embed = new EmbedBuilder()
      .setTitle(embedDados.titulo || '')
      .setDescription(embedDados.descricao || '')
      .setColor(embedDados.cor || '#0099ff')
      .setFooter({ text: embedDados.rodape || '' });
    mensagem.embeds = [embed];
  }

  await canal.send(mensagem);
}

bot.login(process.env.TOKEN_DISCORD);
