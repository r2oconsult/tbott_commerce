'use client';

import { useState } from 'react';
import { Produto } from 'lib/tbott';

export default function CardProduto({ produto }: { produto: Produto }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="overflow-hidden rounded-sm mb-4" style={{ aspectRatio: '2/3' }}>
        <img
          src={produto.imagem}
          alt={produto.titulo}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hover ? 'scale(1.03)' : 'scale(1)' }}
        />
      </div>

      <p className="text-xs tracking-widest text-neutral-400 uppercase mb-1">
        {produto.categoria}
      </p>

      <h3 className="font-serif text-lg text-neutral-800 leading-snug mb-1">
        {produto.titulo}
      </h3>
      <p className="text-sm text-neutral-500 mb-3">{produto.autor}</p>

      <p className="text-sm text-neutral-600">
        A partir de{' '}
        <span className="font-medium text-neutral-800">
          R$ {produto.preco_base.toFixed(2).replace('.', ',')}
        </span>
      </p>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: hover ? '200px' : '0px', opacity: hover ? 1 : 0 }}
      >
        <p className="text-sm text-neutral-500 mt-3 mb-4 leading-relaxed">
          {produto.descricao}
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Capa Mole</span>
            <span className="text-neutral-800 font-medium">
              R$ {produto.preco_base.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Capa Dura Premium</span>
            <span className="text-neutral-800 font-medium">
              R$ {produto.preco_capa_dura.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        
          href={produto.link_hotmart}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-sm tracking-widest uppercase py-3 px-4 transition-colors duration-200"
          style={{
            backgroundColor: hover ? '#1a1a1a' : '#2C2C2C',
            color: '#FDFBF7',
          }}
        >
          Adquirir obra
        </a>
      </div>
    </div>
  );
}
