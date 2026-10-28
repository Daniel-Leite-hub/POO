/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 * 
 * Questão 1 - Classe Cronometro
 * Controle o tempo acumulado de uma atividade, sem utilizar relógio ou temporizadores.
 */

export class Cronometro {
  segundos: number;

  /**
   * Construtor sem parâmetros, inicializando segundos com 0.
   */
  constructor() {
    this.segundos = 0;
  }

  /**
   * Acumula apenas valores positivos. Ignora valores menores ou iguais a zero.
   * @param valor Tempo em segundos a ser adicionado
   */
  avancar(valor: number): void {
    if (valor > 0) {
      this.segundos += valor;
    }
  }

  /**
   * Reinicia a contagem zerando os segundos acumulados.
   */
  zerar(): void {
    this.segundos = 0;
  }

  /**
   * Retorna a duração em minutos (segundos / 60) sem alterar o objeto.
   */
  emMinutos(): number {
    return this.segundos / 60;
  }
}

// ==========================================
// Testes solicitados no enunciado:
// ==========================================
console.log("=== Questão 1: Testes da Classe Cronometro ===");

const cronometro1 = new Cronometro();
console.log("Inicialização do cronômetro 1:", cronometro1.segundos, "segundos");

// 1. Avance 90 e depois 30 segundos: resultados de 120 segundos e 2 minutos.
cronometro1.avancar(90);
cronometro1.avancar(30);
console.log(`Após avançar 90s e 30s: ${cronometro1.segundos} segundos | ${cronometro1.emMinutos()} minutos`);

// 2. Avançar -20 deve preservar a contagem
cronometro1.avancar(-20);
console.log(`Após tentar avançar -20s: ${cronometro1.segundos} segundos (contagem preservada)`);

// 3. Zere o cronômetro e confira os resultados
cronometro1.zerar();
console.log(`Após zerar cronômetro 1: ${cronometro1.segundos} segundos | ${cronometro1.emMinutos()} minutos`);

// 4. Crie outro objeto e verifique que as contagens são independentes
const cronometro2 = new Cronometro();
cronometro2.avancar(45);
console.log(`Cronômetro 2 avançado em 45s: ${cronometro2.segundos} segundos | ${cronometro2.emMinutos()} minutos`);
console.log(`Cronômetro 1 permanece: ${cronometro1.segundos} segundos (instâncias independentes)`);
