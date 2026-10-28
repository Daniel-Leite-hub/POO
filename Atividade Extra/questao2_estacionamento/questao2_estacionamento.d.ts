/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 *
 * Questão 2 - Classe Estacionamento
 * A primeira hora custa R$ 8,00 e cada hora adicional custa R$ 5,00.
 * Arredonde frações para a próxima hora inteira.
 * Permanência zero não gera cobrança.
 */
export declare class Estacionamento {
    placa: string;
    horas: number;
    /**
     * Construtor que recebe a placa e inicializa horas com 0.
     * @param placa Identificador do veículo
     */
    constructor(placa: string);
    /**
     * Substitui a permanência atual. Ignora valores negativos.
     * @param horas Tempo de permanência em horas
     */
    registrarPermanencia(horas: number): void;
    /**
     * Retorna as horas arredondadas para a próxima hora inteira (Math.ceil).
     */
    calcularHorasCobradas(): number;
    /**
     * Aplica a regra de cobrança reutilizando calcularHorasCobradas().
     * Permanência 0 não gera cobrança.
     * 1ª hora = R$ 8,00. Horas adicionais = R$ 5,00 cada.
     */
    calcularValor(): number;
    /**
     * Retorna placa, horas cobradas e valor, reutilizando os métodos de cálculo.
     */
    emitirTicket(): string;
}
//# sourceMappingURL=questao2_estacionamento.d.ts.map