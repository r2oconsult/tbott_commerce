"use client";

import { useState } from "react";
import { createSupabaseClient } from "lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  async function cadastrar() {
    setCarregando(true);
    setErro("");
    const { data, error } = await supabase.auth.signUp({ email, password: senha, options: { data: { nome, telefone } } });
    if (error) { setErro(error.message); setCarregando(false); return; }
    if (data.user) {
      await supabase.from("perfis").insert({ id: data.user.id, nome, email, telefone });
      router.push("/");
    }
    setCarregando(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FDFBF7" }}>
      <div className="w-full max-w-md px-8 py-12">
        <h1 className="font-serif text-3xl text-neutral-800 mb-2">T-BOTT</h1>
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-8">Criar sua conta</p>
        {erro && <p className="text-sm text-red-500 mb-4">{erro}</p>}
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Seu nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <input type="tel" placeholder="Seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <input type="password" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <button onClick={cadastrar} disabled={carregando} className="w-full text-sm tracking-widest uppercase py-3" style={{ backgroundColor: "#2C2C2C", color: "#FDFBF7" }}>{carregando ? "Criando conta..." : "Criar conta"}</button>
          <p className="text-center text-sm text-neutral-400">Ja tem conta? <a href="/auth/login" className="text-neutral-700 underline">Entrar</a></p>
        </div>
      </div>
    </main>
  );
}
