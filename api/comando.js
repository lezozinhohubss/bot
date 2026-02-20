import { enviarMensagem } from '../../bot.js';
import { verificaJWT } from '../../utils/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  const token = req.headers.authorization;
  if (!verificaJWT(token)) return res.status(401).json({ error: 'Não autorizado' });

  const { canalId, conteudo, embed } = req.body;

  try {
    await enviarMensagem(canalId, conteudo, embed);
    res.status(200).json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
