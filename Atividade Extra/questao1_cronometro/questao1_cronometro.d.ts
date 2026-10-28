/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 *
 * Questão 1 - Classe Cronometro
 * Controle o tempo acumulado de uma atividade, sem utilizar relógio ou temporizadores.
 */
export declare class Cronometro {
    segundos: number;
    /**
     * Construtor sem parâmetros, inicializando segundos com 0.
     */
    constructor();
    /**
     * Acumula apenas valores positivos. Ignora valores menores ou iguais a zero.
     * @param valor Tempo em segundos a ser adicionado
     */
    avancar(valor: number): void;
    /**
     * Reinicia a contagem zerando os segundos acumulados.
     */
    zerar(): void;
    /**
     * Retorna a duração em minutos (segundos / 60) sem alterar o objeto.
     */
    emMinutos(): number;
}
//# sourceMappingURL=questao1_cronometro.d.ts.map