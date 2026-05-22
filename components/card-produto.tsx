"use client";

import { useState } from "react";
import { Produto } from "lib/tbott";

export default function CardProduto({ produto }: { produto: Produto }) {
  const [hover, setHover] = useState(false);
  const [tbottAberto, setTbottAberto] = useState(false);
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);

  const descritivo = produto.titulo + ", de " + produto.autor + ". " + produto.descricao;

  async function enviarPergunta() {
    if (pergunta.trim() === "") return;
    setCarregando(true);
    setResposta("");
    try {
      const res = await fetch("/api/tbott", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: pergunta, titulo: produto.titulo, autor: produto.autor, descricao: produto.descricao, categoria: produto.categoria }),
      });
      const data = await res.json();
      setResposta(data.resposta);
    } catch (e) {
      setResposta("O Bibliotecario esta organizando as prateleiras. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div
      className="relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { if (tbottAberto === false) setHover(false); }}
    >
      <div className="overflow-hidden rounded-sm mb-4" style={{ aspectRatio: "2/3" }}>
        <img src={produto.imagem} alt={produto.titulo} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hover ? "scale(1.03)" : "scale(1)" }} />
      </div>
      <p className="text-xs tracking-widest text-neutral-400 uppercase mb-1">{produto.categoria}</p>
      <h3 className="font-serif text-lg text-neutral-800 leading-snug mb-1">{produto.titulo}</h3>
      <p className="text-sm text-neutral-500 mb-3">{produto.autor}</p>
      <p className="text-sm text-neutral-600">A partir de <span className="font-medium text-neutral-800">R$ {produto.preco_base.toFixed(2).replace(".", ",")}</span></p>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: hover || tbottAberto ? "700px" : "0px", opacity: hover || tbottAberto ? 1 : 0 }}>
        <p className="text-sm text-neutral-500 mt-3 mb-4 leading-relaxed">{produto.descricao}</p>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Capa Mole</span>
            <span className="text-neutral-800 font-medium">R$ {produto.preco_base.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Capa Dura Premium</span>
            <span className="text-neutral-800 font-medium">R$ {produto.preco_capa_dura.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <a href={produto.link_hotmart} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm tracking-widest uppercase py-3 px-4" style={{ backgroundColor: "#2C2C2C", color: "#FDFBF7" }}>Adquirir obra</a>
          <button onClick={(e) => { e.stopPropagation(); setTbottAberto(!tbottAberto); }} className="px-3 py-3 border border-neutral-300 text-sm hover:border-neutral-500 transition-colors" title="Consultar o T-Bott">🧠</button>
        </div>
        {tbottAberto && (
          <div className="border-t border-neutral-200 pt-4 mt-2">
            <p className="text-xs tracking-widest text-neutral-400 uppercase mb-2">T-Bott · Bibliotecario</p>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4" style={{ fontStyle: "italic" }}>{descritivo}</p>
            {resposta && (<p className="text-sm text-neutral-700 leading-relaxed mb-4 p-3" style={{ backgroundColor: "#F5F0E8" }}>{resposta}</p>)}
            <div className="flex gap-2">
              <input type="text" value={pergunta} onChange={(e) => setPergunta(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") enviarPergunta(); }} placeholder="Tire sua duvida sobre esta obra..." className="flex-1 text-sm px-3 py-2 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors" style={{ backgroundColor: "#F7F4EF" }} />
              <button onClick={enviarPergunta} disabled={carregando} className="px-4 py-2 text-sm transition-colors" style={{ backgroundColor: "#2C2C2C", color: "#FDFBF7" }}>{carregando ? "..." : "->"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}