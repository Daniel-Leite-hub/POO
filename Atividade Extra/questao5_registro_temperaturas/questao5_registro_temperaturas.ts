/**
 * Instituto Federal do Piauí (IFPI) - ADS
 * Disciplina: Programação Orientada a Objetos
 * Professor: Ely
 * Exercício de Revisão (Atividade Extra)
 * 
 * Questão 5 - Classe RegistroTemperaturas
 * Registre leituras em graus Celsius e produza informações sem alterar as medições cadastradas.
 */

export class RegistroTemperaturas {
  temperaturas: number[];
  limiteAlerta: number;

  /**
   * Construtor sem parâmetros, inicializando o array vazio e o limite com 30.
   */
  constructor() {
    this.temperaturas = [];
    this.limiteAlerta = 30;
  }

  /**
   * Atualiza as medições adicionando uma nova leitura em Celsius.
   * @param temperatura Leitura da temperatura em graus Celsius
   */
  adicionar(temperatura: number): void {
    this.temperaturas.push(temperatura);
  }

  /**
   * Atualiza o limite de alerta em graus Celsius.
   * @param limite Novo limite de alerta
   */
  alterarLimite(limite: number): void {
    this.limiteAlerta = limite;
  }

  /**
   * Usa forEach() para montar uma linha por leitura, como "Dia 1: 28 °C".
   * Em um registro vazio, retorna uma string vazia "".
   */
  listar(): string {
    const linhas: string[] = [];
    this.temperaturas.forEach((temperatura, indice) => {
      linhas.push(`Dia ${indice + 1}: ${temperatura} °C`);
    });
    return linhas.join("\n");
  }

  /**
   * Usa filter() e arrow function para retornar temperaturas estritamente
   * superiores ao limite atual. Retorna [] se vazio.
   */
  acimaDoLimite(): number[] {
    return this.temperaturas.filter((temperatura) => temperatura > this.limiteAlerta);
  }

  /**
   * Usa map() e arrow function para converter Celsius para Fahrenheit.
   * Fórmula: F = C * 1.8 + 32. Retorna [] se vazio.
   */
  converterParaFahrenheit(): number[] {
    return this.temperaturas.map((celsius) => celsius * 1.8 + 32);
  }

  /**
   * Usa reduce() com valor inicial 0 para calcular a média.
   * Retorna 0 no array vazio.
   */
  calcularMedia(): number {
    if (this.temperaturas.length === 0) {
      return 0;
    }
    const soma = this.temperaturas.reduce((acumulador, temp) => acumulador + temp, 0);
    return soma / this.temperaturas.length;
  }
}

// ==========================================
// Testes solicitados no enunciado:
// ==========================================
console.log("=== Questão 5: Testes da Classe RegistroTemperaturas ===");

const registro = new RegistroTemperaturas();

// 1. Adicione 28, 31, 29, 35, 32, 27 e 30
const leituras = [28, 31, 29, 35, 32, 27, 30];
leituras.forEach((temp) => registro.adicionar(temp));

console.log("Listagem de leituras:");
console.log(registro.listar());

// Média aproximada de 30,29 °C
const media = registro.calcularMedia();
console.log(`Média das temperaturas: ${media.toFixed(2)} °C (aproximadamente 30,29 °C)`);

// Alertas [31, 35, 32] com limite 30
console.log("Alertas acima do limite (30 °C):", registro.acimaDoLimite());

// Converter para Fahrenheit (28 °C = 82,40 °F)
const emFahrenheit = registro.converterParaFahrenheit();
console.log("Temperaturas em Fahrenheit:", emFahrenheit.map((f) => Number(f.toFixed(2))));
console.log(`Primeira leitura: ${registro.temperaturas[0]} °C equivale a ${emFahrenheit[0]?.toFixed(2)} °F`);

// 2. Altere o limite para 32: os alertas devem conter apenas [35]
registro.alterarLimite(32);
console.log("Alertas após alterar limite para 32 °C:", registro.acimaDoLimite());

// As leituras originais devem permanecer iguais
console.log("Leituras originais permanecem inalteradas:", registro.temperaturas);

// 3. Em um registro vazio: listar() retorna "" e os métodos que retornam arrays retornam []
const registroVazio = new RegistroTemperaturas();
console.log("Registro vazio:", {
  listarRetorno: JSON.stringify(registroVazio.listar()), // ""
  acimaDoLimite: registroVazio.acimaDoLimite(),          // []
  converterParaFahrenheit: registroVazio.converterParaFahrenheit(), // []
  calcularMedia: registroVazio.calcularMedia()           // 0
});
