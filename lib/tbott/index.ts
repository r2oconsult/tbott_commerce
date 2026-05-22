import productsData from './products.json';

export type Produto = {
  id: string;
  titulo: string;
  autor: string;
  descricao: string;
  preco_base: number;
  preco_capa_dura: number;
  categoria: string;
  imagem: string;
  link_hotmart: string;
  isbn: string;
  badge_cashback: boolean;
};

export async function getProdutos(): Promise<Produto[]> {
  return productsData.products as Produto[];
}

export async function getProdutoPorId(id: string): Promise<Produto | undefined> {
  return (productsData.products as Produto[]).find((p) => p.id === id);
}

export async function getProdutosPorCategoria(categoria: string): Promise<Produto[]> {
  return (productsData.products as Produto[]).filter((p) => p.categoria === categoria);
}
