/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 * 
 * Questão 3 - Classe Impressora
 * Uma gráfica cobra R$ 0,25 por página em preto e branco e R$ 0,80 por página colorida.
 */

export class Impressora {
  paginas: number;
  colorida: boolean;
  totalPaginasImpressas: number;
  valorTotalImpresso: number;

  /**
   * Construtor sem parâmetros, inicializando os números com 0 e colorida com false.
   */
  constructor() {
    this.paginas = 0;
    this.colorida = false;
    this.totalPaginasImpressas = 0;
    this.valorTotalImpresso = 0;
  }

  /**
   * Configura o pedido sem alterar os totalizadores históricos.
   * Considera apenas páginas inteiras e não negativas.
   * @param paginas Quantidade de páginas do pedido
   * @param colorida Indica se o pedido é colorido (true) ou preto e branco (false)
   */
  inicializarPedido(paginas: number, colorida: boolean): void {
    if (paginas >= 0) {
      this.paginas = Math.floor(paginas);
      this.colorida = colorida;
    }
  }

  /**
   * Retorna o valor do pedido atual sem alterar os atributos da classe.
   * Preto e branco: R$ 0,25 / página
   * Colorida: R$ 0,80 / página
   */
  calcularValor(): number {
    const precoPorPagina = this.colorida ? 0.80 : 0.25;
    return this.paginas * precoPorPagina;
  }

  /**
   * Acumula as páginas e o valor do pedido nos totalizadores.
   * Reutiliza calcularValor(). Cada chamada representa uma nova impressão.
   */
  imprimir(): void {
    this.totalPaginasImpressas += this.paginas;
    this.valorTotalImpresso += this.calcularValor();
  }
}

// ==========================================
// Testes solicitados no enunciado:
// ==========================================
console.log("=== Questão 3: Testes da Classe Impressora ===");

const impressora1 = new Impressora();
console.log("Totais iniciais:", {
  totalPaginas: impressora1.totalPaginasImpressas,
  valorTotal: impressora1.valorTotalImpresso
});

// 1. Imprima 10 páginas em preto e branco e depois 10 coloridas:
//    totais esperados: 20 páginas e R$ 10,50
impressora1.inicializarPedido(10, false);
impressora1.imprimir();

impressora1.inicializarPedido(10, true);
impressora1.imprimir();

console.log("Após imprimir 10 P&B e 10 coloridas:", {
  totalPaginasImpressas: impressora1.totalPaginasImpressas,
  valorTotalImpresso: `R$ ${impressora1.valorTotalImpresso.toFixed(2).replace(".", ",")}`
});

// 2. Chame apenas calcularValor(): retorno de R$ 8,00, sem alterar os totais.
impressora1.inicializarPedido(10, true);
const valorCalculado = impressora1.calcularValor();
console.log(`calcularValor() para 10 páginas coloridas: R$ ${valorCalculado.toFixed(2).replace(".", ",")}`);
console.log("Totais continuam inalterados:", {
  totalPaginasImpressas: impressora1.totalPaginasImpressas,
  valorTotalImpresso: `R$ ${impressora1.valorTotalImpresso.toFixed(2).replace(".", ",")}`
});

// 3. Crie outra impressora e confira que seus totalizadores começam em zero.
const impressora2 = new Impressora();
console.log("Impressora 2 (nova instância):", {
  totalPaginasImpressas: impressora2.totalPaginasImpressas,
  valorTotalImpresso: `R$ ${impressora2.valorTotalImpresso.toFixed(2).replace(".", ",")}`
});
