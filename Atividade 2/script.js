"use strict";
/* =========================================================
   PARTE 1 – FUNÇÕES E ARRAYS
   ========================================================= */
Object.defineProperty(exports, "__esModule", { value: true });
// ---------------------------------------------------------
// 1. Função com parâmetro padrão (pronome de tratamento)
// ---------------------------------------------------------
function saudar(nome, pronome = "Sr") {
    console.log(`${pronome}. ${nome}`);
}
console.log("--- Questão 1 ---");
saudar("Sávia", "Sra"); // Sra. Sávia
saudar("João"); // Sr. João (usa o valor padrão)
// ---------------------------------------------------------
// 2. Array em string separado por traço, usando forEach
// ---------------------------------------------------------
function arrayParaString(numeros) {
    let resultado = "";
    numeros.forEach((numero, indice) => {
        resultado += indice === 0 ? `${numero}` : `-${numero}`;
    });
    return resultado;
}
console.log("--- Questão 2 ---");
console.log(arrayParaString([10, 20, 30, 40])); // "10-20-30-40"
// ---------------------------------------------------------
// 3. Testando a função soma com diferentes argumentos
// ---------------------------------------------------------
function soma(x, y) {
    return x + y;
}
console.log("--- Questão 3 ---");
console.log(soma(1, 2)); // a) 3           -> soma numérica normal
console.log(soma(1, "2")); // b) "12"        -> "y" é string, o "+" concatena (coerção de tipo)
console.log(soma(1)); // c) NaN         -> "y" é undefined, 1 + undefined = NaN
// ---------------------------------------------------------
// 4. Função com rest parameter
// ---------------------------------------------------------
function exibir(...itens) {
    itens.forEach((item) => console.log(item));
}
console.log("--- Questão 4 ---");
exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");
// ---------------------------------------------------------
// 5. Conversão para arrow functions
// ---------------------------------------------------------
const ola = () => {
    console.log("Olá");
};
const dobro = (numero) => numero * 2;
const saudacao = (nome) => `Olá, ${nome}!`;
console.log("--- Questão 5 ---");
ola();
console.log(dobro(5));
console.log(saudacao("Daniel"));
// ---------------------------------------------------------
// 6. filter() com arrow function -> números pares
// ---------------------------------------------------------
const arrayNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const pares = arrayNumeros.filter((numero) => numero % 2 === 0);
console.log("--- Questão 6 ---");
console.log(pares);
// ---------------------------------------------------------
// 7. map() e reduce()
// ---------------------------------------------------------
const numeros = [2, 4, 6, 8, 10];
const numerosDobrados = numeros.map((numero) => numero * 2);
const somaDobrados = numerosDobrados.reduce((acumulador, numero) => acumulador + numero, 0);
console.log("--- Questão 7 ---");
console.log("Array original:", numeros);
console.log("Array dobrado:", numerosDobrados);
console.log("Soma dos elementos do novo array:", somaDobrados);
// ---------------------------------------------------------
// 8. Exemplo próprio combinando map + reduce
// ---------------------------------------------------------
const valores = [3, 6, 9, 12];
const valoresDobrados = valores.map((valor) => valor * 2);
const totalValores = valoresDobrados.reduce((acumulador, valor) => acumulador + valor, 0);
console.log("--- Questão 8 ---");
console.log("Valores dobrados:", valoresDobrados);
console.log("Soma total:", totalValores);
// ---------------------------------------------------------
// 9. Sorteio de um nome dentro de um array
// ---------------------------------------------------------
function sortearNome(nomes) {
    if (nomes.length === 0) {
        throw new Error("Não há nomes para sortear.");
    }
    const indiceSorteado = Math.floor(Math.random() * nomes.length);
    const nomeSorteado = nomes[indiceSorteado];
    if (nomeSorteado === undefined) {
        throw new Error("Nome sorteado inválido.");
    }
    return nomeSorteado;
}
console.log("--- Questão 9 ---");
console.log(sortearNome(["Ana", "Bruno", "Carlos"]));
/* =========================================================
   PARTE 2 – PENSANDO EM CLASSES E OBJETOS
   ========================================================= */
// ---------------------------------------------------------
// 10. Classe Autenticacao
// ---------------------------------------------------------
class Autenticacao {
    usuario;
    senha;
    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
    validar() {
        return this.usuario === "admin" && this.senha === "1234";
    }
}
console.log("--- Questão 10 ---");
const login1 = new Autenticacao("admin", "1234");
const login2 = new Autenticacao("daniel", "senha123");
console.log("admin/1234 ->", login1.validar()); // true
console.log("daniel/senha123 ->", login2.validar()); // false
// ---------------------------------------------------------
// 11. Classe Sorteio
// ---------------------------------------------------------
class Sorteio {
    participantes = [];
    adicionar(nome) {
        this.participantes.push(nome);
    }
    sortear() {
        if (this.participantes.length === 0) {
            throw new Error("Não há participantes para sortear.");
        }
        const indiceSorteado = Math.floor(Math.random() * this.participantes.length);
        const participanteSorteado = this.participantes[indiceSorteado];
        if (participanteSorteado === undefined) {
            throw new Error("Participante sorteado inválido.");
        }
        return participanteSorteado;
    }
}
console.log("--- Questão 11 ---");
const sorteio = new Sorteio();
sorteio.adicionar("Ana");
sorteio.adicionar("Bruno");
sorteio.adicionar("Carlos");
console.log("Participantes:", sorteio.participantes);
console.log("Sorteado:", sorteio.sortear());
// ---------------------------------------------------------
// 12. Classe JogoParImpar
// ---------------------------------------------------------
class JogoParImpar {
    numeroJogador = 0;
    numeroMaquina = 0;
    sortearMaquina() {
        this.numeroMaquina = Math.floor(Math.random() * 10) + 1; // 1 a 10
    }
    resultado() {
        const total = this.numeroJogador + this.numeroMaquina;
        return total % 2 === 0 ? "Par" : "Ímpar";
    }
    vencedor() {
        return this.resultado() === "Par" ? "Jogador" : "Máquina";
    }
}
console.log("--- Questão 12 ---");
const jogo = new JogoParImpar();
jogo.numeroJogador = 4; // jogador escolhe um número (PAR)
jogo.sortearMaquina(); // máquina sorteia o dela (ÍMPAR)
console.log("Número do jogador:", jogo.numeroJogador);
console.log("Número da máquina:", jogo.numeroMaquina);
console.log("Resultado:", jogo.resultado());
console.log("Vencedor:", jogo.vencedor());
// ---------------------------------------------------------
// 13. Classe TradutorEmojis
// ---------------------------------------------------------
class TradutorEmojis {
    dicionario = {
        amor: "❤️",
        futebol: "⚽",
        cachorro: "🐶",
        gato: "🐱",
        sol: "☀️",
        lua: "🌙",
        brasil: "🇧🇷",
        livro: "📚",
        musica: "🎵",
        carro: "🚗",
    };
    traduzir(frase) {
        return frase
            .split(" ")
            .map((palavra) => {
            const chave = palavra.toLowerCase();
            return this.dicionario[chave] ?? palavra;
        })
            .join(" ");
    }
}
console.log("--- Questão 13 ---");
const tradutor = new TradutorEmojis();
console.log(tradutor.traduzir("O amor do brasileiro é o futebol"));
console.log(tradutor.traduzir("Meu cachorro e meu gato dormem sob a lua"));
//# sourceMappingURL=script.js.map