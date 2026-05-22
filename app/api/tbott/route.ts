import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { pergunta, titulo, autor, descricao, categoria } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;

    const fallback = 'Obra referenciada: ' + titulo + ', de ' + autor + ' — categoria ' + categoria + '. ' + descricao + ' Garanta sua copia pelo botao abaixo!';
    return NextResponse.json({ resposta: fallback });
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: 'Voce e o T-Bott, Bibliotecario Virtual da livraria tbott.com. Responda com sofisticacao e elegancia sobre a obra indicada. Baseie-se apenas na sinopse publica fornecida. Nao invente conteudo do livro. Ao final, convide o usuario a adquirir a obra. Obra: ' + titulo + '. Autor: ' + autor + '. Categoria: ' + categoria + '. Sinopse: ' + descricao,
        messages: [{ role: 'user', content: pergunta }]
      })
    });
    const data = await res.json();
    const resposta = data.content[0].text;
    return NextResponse.json({ resposta });
  } catch {
    return NextResponse.json({ resposta: 'O Bibliotecario esta organizando as prateleiras. Tente novamente em instantes.' });
  }
}