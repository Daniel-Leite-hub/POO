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

export class Estacionamento {
  placa: string;
  horas: number;

  /**
   * Construtor que recebe a placa e inicializa horas com 0.
   * @param placa Identificador do veículo
   */
  constructor(placa: string) {
    this.placa = placa;
    this.horas = 0;
  }

  /**
   * Substitui a permanência atual. Ignora valores negativos.
   * @param horas Tempo de permanência em horas
   */
  registrarPermanencia(horas: number): void {
    if (horas >= 0) {
      this.horas = horas;
    }
  }

  /**
   * Retorna as horas arredondadas para a próxima hora inteira (Math.ceil).
   */
  calcularHorasCobradas(): number {
    return Math.ceil(this.horas);
  }

  /**
   * Aplica a regra de cobrança reutilizando calcularHorasCobradas().
   * Permanência 0 não gera cobrança.
   * 1ª hora = R$ 8,00. Horas adicionais = R$ 5,00 cada.
   */
  calcularValor(): number {
    const horasCobradas = this.calcularHorasCobradas();
    if (horasCobradas === 0) {
      return 0;
    }
    return 8 + (horasCobradas - 1) * 5;
  }

  /**
   * Retorna placa, horas cobradas e valor, reutilizando os métodos de cálculo.
   */
  emitirTicket(): string {
    const horasCobradas = this.calcularHorasCobradas();
    const valorFormatado = this.calcularValor().toFixed(2).replace(".", ",");
    return `Placa: ${this.placa} | Horas cobradas: ${horasCobradas} | Valor: R$ ${valorFormatado}`;
  }
}

// ==========================================
// Testes solicitados no enunciado:
// ==========================================
console.log("=== Questão 2: Testes da Classe Estacionamento ===");

const estacionamento = new Estacionamento("PIE-2026");
console.log("Ticket inicial:", estacionamento.emitirTicket());

// 1. Registre, em sequência, permanências de 0, 1, 1.2 e 3.5 horas.
//    Os valores esperados: R$ 0,00, R$ 8,00, R$ 13,00 e R$ 23,00.
const permanencias = [0, 1, 1.2, 3.5];

permanencias.forEach((tempo) => {
  estacionamento.registrarPermanencia(tempo);
  console.log(`Permanência de ${tempo}h -> ${estacionamento.emitirTicket()}`);
});

// 2. Tente registrar -2 horas e confira que a última permanência foi preservada.
estacionamento.registrarPermanencia(-2);
console.log(`Após tentar registrar -2h -> ${estacionamento.emitirTicket()} (permanência de 3.5h preservada)`);
