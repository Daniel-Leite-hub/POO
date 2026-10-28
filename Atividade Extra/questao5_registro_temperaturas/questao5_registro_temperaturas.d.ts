/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 *
 * Questão 5 - Classe RegistroTemperaturas
 * Registre leituras em graus Celsius e produza informações sem alterar as medições cadastradas.
 */
export declare class RegistroTemperaturas {
    temperaturas: number[];
    limiteAlerta: number;
    /**
     * Construtor sem parâmetros, inicializando o array vazio e o limite com 30.
     */
    constructor();
    /**
     * Atualiza as medições adicionando uma nova leitura em Celsius.
     * @param temperatura Leitura da temperatura em graus Celsius
     */
    adicionar(temperatura: number): void;
    /**
     * Atualiza o limite de alerta em graus Celsius.
     * @param limite Novo limite de alerta
     */
    alterarLimite(limite: number): void;
    /**
     * Usa forEach() para montar uma linha por leitura, como "Dia 1: 28 °C".
     * Em um registro vazio, retorna uma string vazia "".
     */
    listar(): string;
    /**
     * Usa filter() e arrow function para retornar temperaturas estritamente
     * superiores ao limite atual. Retorna [] se vazio.
     */
    acimaDoLimite(): number[];
    /**
     * Usa map() e arrow function para converter Celsius para Fahrenheit.
     * Fórmula: F = C * 1.8 + 32. Retorna [] se vazio.
     */
    converterParaFahrenheit(): number[];
    /**
     * Usa reduce() com valor inicial 0 para calcular a média.
     * Retorna 0 no array vazio.
     */
    calcularMedia(): number;
}
//# sourceMappingURL=questao5_registro_temperaturas.d.ts.map