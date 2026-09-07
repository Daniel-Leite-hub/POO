"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello, World!");
// Questão 2
// let idade: number = "2"; não aceita string, pois a variável idade é do tipo number
let idade = 2;
// Questão 3
// let nome: "Ely"; da erro, pois a variavel nao foi declarada com o tipo string
let nome = "Ely";
console.log(typeof (nome));
// Questão 4
// A
let a = 10;
let b = "5";
console.log(a + b); // em ts é 105, pois a variável b é uma string, então o operador + concatena os valores,
//  mas em js é 15, pois o operador + faz a conversão de tipos antes de somar os valores
// B
let x = true;
let y = 2;
console.log(x + y); // o typescript não aceita a soma de booleano com number, mas o javascript converte o booleano para number
// C
console.log(0 == false); // em ts é false,pois number ebo booleano são tipos diferentes,
//  mas em js é true, pois o operador == faz a conversão de tipos antes de comparar os valores
console.log("" == false); // em ts é false, pois string e booleano são tipos diferentes,
//  mas em js é true, pois o operador == faz a conversão de tipos antes de comparar os valores
console.log(null == undefined); // em ts é true, pois null e undefined são tipos compatíveis,
//  mas em js é true, pois o operador == faz a conversão de tipos antes de comparar os valores
// Questão 5 Comentário acima de cada linha de código explicando o que cada linha faz
// Questão 6
let nome1 = "Ely";
let salario = 2000;
let linguagem = "TypeScript";
console.log(`${nome1}\nMy salary is ${salario}\nand \nmy preffered langue is ${linguagem}`);
// Questão 7
let mensagem = "TypeScript é muito legal!";
console.log(mensagem.length); // Retorna o tamanho da string
console.log(mensagem.toUpperCase()); // Retorna a string em maiúsculo
console.log(mensagem.toLowerCase()); // Retorna a string em minúsculo
let pi = 3.14159;
console.log(pi.toFixed(2)); // Retorna o número com 2 casas decimais
// Questão 8
class retangulo {
    l1 = 0;
    l2 = 0;
    calculararea() {
        return this.l1 * this.l2;
    }
    calcularperimetro() {
        return 2 * (this.l1 + this.l2);
    }
}
const retangulo1 = new retangulo();
retangulo1.l1 = 5;
retangulo1.l2 = 10;
console.log(retangulo1.calculararea()); // Retorna a área do retângulo
console.log(retangulo1.calcularperimetro()); // Retorna o perímetro do retângulo
// Questão 9
class circulo {
    raio = 0;
    calculararea() {
        return Math.PI * this.raio * this.raio;
    }
    calcularcircunferencia() {
        return 2 * Math.PI * this.raio;
    }
}
const circulo1 = new circulo();
circulo1.raio = 5;
console.log(circulo1.calculararea());
console.log(circulo1.calcularcircunferencia());
// Questão 10
//# sourceMappingURL=script.js.map