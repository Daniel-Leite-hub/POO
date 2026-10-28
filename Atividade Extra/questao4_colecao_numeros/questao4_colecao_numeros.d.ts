/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 *
 * Questão 4 - Classe ColecaoNumeros
 * Armazene números em um objeto e implemente operações estatísticas sobre os valores cadastrados.
 */
export declare class ColecaoNumeros {
    numeros: number[];
    /**
     * Construtor sem parâmetros, inicializando o array vazio.
     */
    constructor();
    /**
     * Acrescenta um valor ao array.
     * @param numero Número a ser adicionado
     */
    adicionar(numero: number): void;
    /**
     * Remove todos os valores do array.
     */
    limpar(): void;
    /**
     * Retorna a quantidade de elementos armazenados.
     */
    quantidade(): number;
    /**
     * Retorna a soma dos valores ou 0 no array vazio.
     */
    somar(): number;
    /**
     * Reutiliza somar() e quantidade(). Retorna 0 no array vazio.
     */
    calcularMedia(): number;
    /**
     * Retorna o maior valor ou undefined no array vazio.
     */
    maior(): number | undefined;
    /**
     * Retorna o menor valor ou undefined no array vazio.
     */
    menor(): number | undefined;
}
//# sourceMappingURL=questao4_colecao_numeros.d.ts.map