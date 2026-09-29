"use strict";
// Exercício 04 — Programação Orientada a Objetos
Object.defineProperty(exports, "__esModule", { value: true });
/*
1. Verdadeiro ou falso:
   a) F — Classes são modelos para objetos, e não o contrário.
   b) F como afirmação universal: atributos opcionais, tipos que incluem undefined
      ou uma asserção de atribuição definitiva (!) são exceções à exigência.
      Para atributos obrigatórios como number, com strictPropertyInitialization
      ativo neste projeto, exige-se inicialização na declaração ou no construtor.
   c) F — Uma variável local pode ser declarada sem inicialização; porém não pode
      ser lida antes de receber um valor, quando a análise estrita detectar isso.
   d) V quanto ao valor em execução: após let objeto: Classe, sem atribuição,
      a variável contém undefined; nenhum objeto é criado automaticamente.
      Isso não constitui uma inicialização válida para o tipo Classe no modo
      estrito: TypeScript impede a leitura antes de uma atribuição válida.
      Para instanciar um objeto, usamos new Classe(...).
   e) V — Construtores inicializam e configuram os objetos na instanciação.
   f) V — Construtores não declaram tipo de retorno e podem ter parâmetros ou não.
   g) V — Uma classe pode originar várias instâncias independentes.

2. Sim, na configuração deste projeto (strict: true), quantReservas: number
   sem inicialização causa erro de compilação. Com essa verificação desativada,
   o código poderia compilar, mas o atributo seria undefined e seu incremento
   produziria NaN. TypeScript usa number, não um tipo inteiro separado.
   O construtor da questão 3 resolve o problema.
*/
// 3. Inicialização da quantidade de reservas pelo construtor.
class Hotel {
    quantReservas;
    constructor(quantReservas) {
        this.quantReservas = quantReservas;
    }
    adicionarReserva() {
        this.quantReservas++;
    }
}
const hotel = new Hotel(2);
console.log("3. Reservas iniciais:", hotel.quantReservas); // 2
hotel.adicionarReserva();
console.log("Reservas após adicionar:", hotel.quantReservas); // 3
/*
4. new Radio() não fornece o argumento obrigatório volume. A atribuição
   r.volume = 10 depois da instanciação não corrige essa chamada inválida.
   Solução: passar 10 ao construtor, como abaixo.
*/
class Radio {
    volume;
    constructor(volume) {
        this.volume = volume;
    }
}
const r = new Radio(10);
console.log("4. Volume:", r.volume);
/*
5. a) O trecho tem três prints, apesar de o enunciado mencionar dois.
      Todos mostram 90. Após c1 = c2 e c3 = c1, as três variáveis apontam
      para a mesma conta. O saque reduz seu saldo de 100 para 90.
      Transferir 50 para essa mesma conta retira e devolve os 50, mantendo 90.
      Isso considera a transferência como saque na origem e depósito no destino,
      implementação apresentada abaixo, já com as alterações da questão 8.
   b) A conta originalmente referenciada por c1 fica sem referências nesse trecho
      e torna-se elegível para a coleta de lixo; não é necessariamente removida
      da memória imediatamente.
*/
// 8. Conta com retorno lógico para indicar o sucesso das operações.
class Conta {
    numero;
    saldo;
    constructor(numero, saldo) {
        this.numero = numero;
        this.saldo = saldo;
    }
    consultarSaldo() {
        return this.saldo;
    }
    depositar(valor) {
        if (Number.isFinite(valor) && valor > 0) {
            this.saldo += valor;
        }
    }
    sacar(valor) {
        if (!Number.isFinite(valor) || valor <= 0 || valor > this.saldo) {
            return false;
        }
        this.saldo -= valor;
        return true;
    }
    transferir(destino, valor) {
        if (!this.sacar(valor)) {
            return false;
        }
        destino.depositar(valor);
        return true;
    }
}
let c1 = new Conta("1", 100);
let c2 = new Conta("2", 100);
let c3;
c1 = c2;
c3 = c1;
c1.sacar(10);
c1.transferir(c2, 50);
console.log("5. Saldo de c1:", c1.consultarSaldo()); // 90
console.log("Saldo de c2:", c2.consultarSaldo()); // 90
console.log("Saldo de c3:", c3.consultarSaldo()); // 90
// 6. Verificação e classificação de triângulos.
class Triangulo {
    a;
    b;
    c;
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    ehTriangulo() {
        return Number.isInteger(this.a) && Number.isInteger(this.b)
            && Number.isInteger(this.c)
            && this.a > 0 && this.b > 0 && this.c > 0
            && Math.abs(this.b - this.c) < this.a
            && this.a < this.b + this.c;
    }
    ehIsoceles() {
        if (!this.ehTriangulo()) {
            return false;
        }
        // Convenção inclusiva: pelo menos dois lados iguais.
        // Assim, um equilátero também é isósceles.
        return this.a === this.b || this.a === this.c || this.b === this.c;
    }
    ehEquilatero() {
        if (!this.ehTriangulo()) {
            return false;
        }
        return this.a === this.b && this.b === this.c;
    }
    ehEscaleno() {
        if (!this.ehTriangulo()) {
            return false;
        }
        return this.a !== this.b && this.a !== this.c && this.b !== this.c;
    }
}
console.log("6. Triângulos:");
for (const triangulo of [
    new Triangulo(3, 3, 3), // Equilátero e isósceles.
    new Triangulo(3, 3, 4), // Isósceles.
    new Triangulo(3, 4, 5), // Escaleno.
    new Triangulo(1, 2, 3), // Inválido: igualdade no limite.
    new Triangulo(0, 2, 2), // Inválido: lado nulo.
]) {
    console.log({
        lados: [triangulo.a, triangulo.b, triangulo.c],
        valido: triangulo.ehTriangulo(),
        isoceles: triangulo.ehIsoceles(),
        equilatero: triangulo.ehEquilatero(),
        escaleno: triangulo.ehEscaleno(),
    });
}
// 7. Controle de um equipamento.
class Equipamento {
    ligado = false;
    ligar() {
        if (!this.ligado) {
            this.ligado = true;
        }
    }
    desligar() {
        if (this.ligado) {
            this.ligado = false;
        }
    }
    inverter() {
        this.ligado = !this.ligado;
    }
    estaLigado() {
        return this.ligado;
    }
}
const equipamento = new Equipamento();
console.log("7. Estado inicial:", equipamento.estaLigado()); // false
equipamento.ligar();
console.log("Após ligar:", equipamento.estaLigado()); // true
equipamento.ligar();
console.log("Após ligar novamente:", equipamento.estaLigado()); // true
equipamento.desligar();
console.log("Após desligar:", equipamento.estaLigado()); // false
equipamento.desligar();
console.log("Após desligar novamente:", equipamento.estaLigado()); // false
equipamento.inverter();
console.log("Após inverter:", equipamento.estaLigado()); // true
equipamento.inverter();
console.log("Após inverter novamente:", equipamento.estaLigado()); // false
// 8. Exemplos de saque e transferência aceitos e recusados.
const origem = new Conta("3", 100);
const destino = new Conta("4", 20);
console.log("8. Saque de 150:", origem.sacar(150)); // false; saldo 100
console.log("Saque de 10:", origem.sacar(10)); // true; saldo 90
console.log("Transferência de 200:", origem.transferir(destino, 200)); // false
console.log("Transferência de 50:", origem.transferir(destino, 50)); // true
console.log("Saldos finais:", origem.consultarSaldo(), destino.consultarSaldo()); // 40, 70
/*
9. Prefiro retornar um resultado lógico, como na questão 8: quem chamou o método
   consegue saber se a operação ocorreu e pode informar o usuário ou tentar outra
   ação. Ignorar uma operação sem indicar o resultado pode esconder uma falha.
   Desconsiderar o ataque a um jogador sem vida pode ser uma regra válida do jogo,
   mas retornar false também permitiria comunicar que o ataque não aconteceu.
*/
// 10. Jogadores e ataques.
class Jogador {
    forca;
    nivel;
    pontos;
    constructor(forca, nivel, pontos) {
        this.forca = forca;
        this.nivel = nivel;
        this.pontos = pontos;
    }
    calcularAtaque() {
        return this.forca * this.nivel;
    }
    atacar(atacado) {
        if (!atacado.estaVivo()) {
            return;
        }
        atacado.pontos -= this.calcularAtaque();
    }
    estaVivo() {
        return this.pontos > 0;
    }
}
const jogador1 = new Jogador(10, 2, 100);
const jogador2 = new Jogador(15, 2, 60);
console.log("10. Danos de ataque:", jogador1.calcularAtaque(), jogador2.calcularAtaque()); // 20, 30
jogador1.atacar(jogador2); // Jogador 2: 40 pontos.
jogador2.atacar(jogador1); // Jogador 1: 70 pontos.
jogador1.atacar(jogador2); // Jogador 2: 20 pontos.
jogador1.atacar(jogador2); // Jogador 2: 0 pontos.
jogador1.atacar(jogador2); // Ataque ignorado: jogador 2 continua com 0 pontos.
console.log("Pontos finais:", jogador1.pontos, jogador2.pontos); // 70, 0
console.log("Jogadores vivos:", jogador1.estaVivo(), jogador2.estaVivo()); // true, false
if (jogador1.pontos > jogador2.pontos) {
    console.log("O jogador 1 tem mais pontos.");
}
else if (jogador2.pontos > jogador1.pontos) {
    console.log("O jogador 2 tem mais pontos.");
}
else {
    console.log("Os jogadores têm a mesma quantidade de pontos.");
}
//# sourceMappingURL=atividade_4.js.map