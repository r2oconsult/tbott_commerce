import { getProdutos } from 'lib/tbott';
import CardProduto from 'components/card-produto';

export default async function HomePage() {
  const produtos = await getProdutos();

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FDFBF7' }}>
      {/* Header */}
      <header className="border-b border-neutral-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif tracking-widest text-neutral-800">T-BOTT</h1>
            <p className="text-xs tracking-widest text-neutral-400 uppercase mt-1">Mesa do Curador</p>
          </div>
          <nav className="flex gap-8 text-sm text-neutral-500 tracking-wide">
            <a href="#" className="hover:text-neutral-800 transition-colors">Acervo</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">Curador</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">Parcerias</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-4">Curadoria Editorial de Alto Padrão</p>
        <h2 className="text-4xl font-serif text-neutral-800 leading-tight max-w-xl">
          Obras selecionadas para mentes que exigem o melhor.
        </h2>
      </section>

      {/* Grade de Produtos */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-8 py-8">
        <div className="max-w-6xl mx-auto text-center text-xs text-neutral-400 tracking-wide">
          © 2026 T-BOTT · Mesa do Curador · Todos os direitos reservados
        </div>
      </footer>
    </main>
  );
}
