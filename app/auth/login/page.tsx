"use client";

import { useState } from "react";
import { createSupabaseClient } from "lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  async function entrar() {
    setCarregando(true);
    setErro("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) { setErro("E-mail ou senha incorretos."); setCarregando(false); return; }
    router.push("/");
    setCarregando(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FDFBF7" }}>
      <div className="w-full max-w-md px-8 py-12">
        <h1 className="font-serif text-3xl text-neutral-800 mb-2">T-BOTT</h1>
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-8">Acessar sua conta</p>
        {erro && <p className="text-sm text-red-500 mb-4">{erro}</p>}
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <input type="password" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full text-sm px-4 py-3 border border-neutral-200 outline-none focus:border-neutral-400" style={{ backgroundColor: "#F7F4EF" }} />
          <button onClick={entrar} disabled={carregando} className="w-full text-sm tracking-widest uppercase py-3" style={{ backgroundColor: "#2C2C2C", color: "#FDFBF7" }}>{carregando ? "Entrando..." : "Entrar"}</button>
          <p className="text-center text-sm text-neutral-400">Nao tem conta? <a href="/auth/cadastro" className="text-neutral-700 underline">Criar conta</a></p>
        </div>
      </div>
    </main>
  );
}
