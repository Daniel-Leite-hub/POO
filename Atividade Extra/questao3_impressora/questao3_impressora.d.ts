/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 *
 * Questão 3 - Classe Impressora
 * Uma gráfica cobra R$ 0,25 por página em preto e branco e R$ 0,80 por página colorida.
 */
export declare class Impressora {
    paginas: number;
    colorida: boolean;
    totalPaginasImpressas: number;
    valorTotalImpresso: number;
    /**
     * Construtor sem parâmetros, inicializando os números com 0 e colorida com false.
     */
    constructor();
    /**
     * Configura o pedido sem alterar os totalizadores históricos.
     * Considera apenas páginas inteiras e não negativas.
     * @param paginas Quantidade de páginas do pedido
     * @param colorida Indica se o pedido é colorido (true) ou preto e branco (false)
     */
    inicializarPedido(paginas: number, colorida: boolean): void;
    /**
     * Retorna o valor do pedido atual sem alterar os atributos da classe.
     * Preto e branco: R$ 0,25 / página
     * Colorida: R$ 0,80 / página
     */
    calcularValor(): number;
    /**
     * Acumula as páginas e o valor do pedido nos totalizadores.
     * Reutiliza calcularValor(). Cada chamada representa uma nova impressão.
     */
    imprimir(): void;
}
//# sourceMappingURL=questao3_impressora.d.ts.map