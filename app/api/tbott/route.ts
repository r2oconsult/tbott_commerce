import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pergunta, titulo, autor, descricao, categoria } = body;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const fallback = "Obra: " + titulo + ", de " + autor + ". " + descricao;
    return NextResponse.json({ resposta: fallback });
  }
  const sistema = "Voce e o T-Bott, Bibliotecario da tbott.com. Obra: " + titulo + ". Autor: " + autor + ". Categoria: " + categoria + ". Sinopse: " + descricao;
  const payload = JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 300, system: sistema, messages: [{ role: "user", content: pergunta }] });
  const headers = { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" };
  const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: headers, body: payload });
  const data = await res.json();
  const resposta = data.content[0].text;
  return NextResponse.json({ resposta: resposta });
}