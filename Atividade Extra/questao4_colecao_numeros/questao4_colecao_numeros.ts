/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 * 
 * Questão 4 - Classe ColecaoNumeros
 * Armazene números em um objeto e implemente operações estatísticas sobre os valores cadastrados.
 */

export class ColecaoNumeros {
  numeros: number[];

  /**
   * Construtor sem parâmetros, inicializando o array vazio.
   */
  constructor() {
    this.numeros = [];
  }

  /**
   * Acrescenta um valor ao array.
   * @param numero Número a ser adicionado
   */
  adicionar(numero: number): void {
    this.numeros.push(numero);
  }

  /**
   * Remove todos os valores do array.
   */
  limpar(): void {
    this.numeros = [];
  }

  /**
   * Retorna a quantidade de elementos armazenados.
   */
  quantidade(): number {
    return this.numeros.length;
  }

  /**
   * Retorna a soma dos valores ou 0 no array vazio.
   */
  somar(): number {
    return this.numeros.reduce((acumulador, numero) => acumulador + numero, 0);
  }

  /**
   * Reutiliza somar() e quantidade(). Retorna 0 no array vazio.
   */
  calcularMedia(): number {
    const qtd = this.quantidade();
    if (qtd === 0) {
      return 0;
    }
    return this.somar() / qtd;
  }

  /**
   * Retorna o maior valor ou undefined no array vazio.
   */
  maior(): number | undefined {
    if (this.numeros.length === 0) {
      return undefined;
    }
    return Math.max(...this.numeros);
  }

  /**
   * Retorna o menor valor ou undefined no array vazio.
   */
  menor(): number | undefined {
    if (this.numeros.length === 0) {
      return undefined;
    }
    return Math.min(...this.numeros);
  }
}

// ==========================================
// Testes solicitados no enunciado:
// ==========================================
console.log("=== Questão 4: Testes da Classe ColecaoNumeros ===");

const colecao = new ColecaoNumeros();

// 1. Adicione 10, 20 e 30: quantidade 3, soma 60, média 20, maior 30 e menor 10.
colecao.adicionar(10);
colecao.adicionar(20);
colecao.adicionar(30);

console.log("Após adicionar [10, 20, 30]:", {
  quantidade: colecao.quantidade(),
  soma: colecao.somar(),
  media: colecao.calcularMedia(),
  maior: colecao.maior(),
  menor: colecao.menor()
});

// 2. Limpe e adicione -8, -3 e -12: maior -3 e menor -12.
colecao.limpar();
colecao.adicionar(-8);
colecao.adicionar(-3);
colecao.adicionar(-12);

console.log("Após limpar e adicionar [-8, -3, -12]:", {
  maior: colecao.maior(),
  menor: colecao.menor()
});

// 3. Limpe novamente e confira os resultados definidos para o array vazio.
colecao.limpar();

console.log("Após limpar novamente (array vazio):", {
  quantidade: colecao.quantidade(),
  soma: colecao.somar(),
  media: colecao.calcularMedia(),
  maior: colecao.maior(),
  menor: colecao.menor()
});
