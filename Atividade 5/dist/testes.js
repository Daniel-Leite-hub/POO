"use strict";
// Exercício 05 - Parte 1, item 5: testes de todos os métodos do Banco
// Se algum assert falhar, o programa para e mostra o erro.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const banco_1 = require("./banco");
const b = new banco_1.Banco();
const ana = new banco_1.Cliente(1, "Ana", "111", new Date(1995, 2, 10));
const bruno = new banco_1.Cliente(2, "Bruno", "222", new Date(1990, 6, 25));
// inserirCliente / consultarCliente (não repete id nem cpf)
b.inserirCliente(ana);
b.inserirCliente(bruno);
b.inserirCliente(new banco_1.Cliente(1, "Id repetido", "999", new Date()));
b.inserirCliente(new banco_1.Cliente(3, "CPF repetido", "111", new Date()));
strict_1.default.equal(b.clientes.length, 2);
strict_1.default.equal(b.consultarCliente("111"), ana);
strict_1.default.equal(b.consultarCliente("000"), undefined);
console.log("OK - inserirCliente e consultarCliente");
// inserirConta / consultar (não repete id nem número)
const c1 = new banco_1.Conta(1, "1-1", 1000);
const c2 = new banco_1.Conta(2, "2-2", 500);
const c3 = new banco_1.Conta(3, "3-3", 300);
b.inserirConta(c1);
b.inserirConta(c2);
b.inserirConta(c3);
b.inserirConta(new banco_1.Conta(1, "9-9", 0)); // id repetido
b.inserirConta(new banco_1.Conta(4, "1-1", 0)); // número repetido
strict_1.default.equal(b.quantidadeContas(), 3);
strict_1.default.equal(b.consultar("1-1"), c1);
console.log("OK - inserirConta, consultar e quantidadeContas");
// associarContaCliente (regras 4a e 4b)
b.associarContaCliente("1-1", "111");
b.associarContaCliente("2-2", "111");
b.associarContaCliente("1-1", "111"); // 4a: mesma conta de novo
b.associarContaCliente("1-1", "222"); // 4b: conta já tem dono
strict_1.default.equal(ana.contas.length, 2);
strict_1.default.equal(bruno.contas.length, 0);
strict_1.default.equal(c1.cliente, ana);
console.log("OK - associarContaCliente");
// listarContasCliente / totalizarSaldoCliente / listarContasSemCliente
strict_1.default.deepEqual(b.listarContasCliente("111"), [c1, c2]);
strict_1.default.equal(b.totalizarSaldoCliente("111"), 1500);
strict_1.default.deepEqual(b.listarContasSemCliente(), [c3]);
console.log("OK - listarContasCliente, totalizarSaldoCliente e listarContasSemCliente");
// sacar / depositar / transferir
strict_1.default.equal(b.sacar("1-1", 200), true); // 1000 -> 800
strict_1.default.equal(b.sacar("1-1", 5000), false); // sem saldo
strict_1.default.equal(b.depositar("2-2", 100), true); // 500 -> 600
strict_1.default.equal(b.depositar("2-2", -5), false);
strict_1.default.equal(b.transferir("1-1", "3-3", 100), true); // 800 -> 700 | 300 -> 400
strict_1.default.deepEqual([c1.saldo, c2.saldo, c3.saldo], [700, 600, 400]);
console.log("OK - sacar, depositar e transferir");
// ordemBancaria
strict_1.default.equal(b.ordemBancaria("1-1", ["2-2", "3-3"], 100), true); // 700 -> 500
strict_1.default.equal(b.ordemBancaria("1-1", ["2-2", "3-3"], 300), false); // precisa de 600
strict_1.default.deepEqual([c1.saldo, c2.saldo, c3.saldo], [500, 700, 500]);
console.log("OK - ordemBancaria");
// totalDinheiroDepositado / mediaSaldoContas
strict_1.default.equal(b.totalDinheiroDepositado(), 1700);
strict_1.default.equal(b.mediaSaldoContas(), 1700 / 3);
strict_1.default.equal(new banco_1.Banco().mediaSaldoContas(), 0); // banco vazio
console.log("OK - totalDinheiroDepositado e mediaSaldoContas");
// atualizar
strict_1.default.equal(b.atualizar("2-2", 900), true);
strict_1.default.equal(c2.saldo, 900);
strict_1.default.equal(b.atualizar("x", 10), false);
console.log("OK - atualizar");
// mudarTitularidade
strict_1.default.equal(b.mudarTitularidade("2-2", "222"), true);
strict_1.default.deepEqual(ana.contas, [c1]);
strict_1.default.deepEqual(bruno.contas, [c2]);
console.log("OK - mudarTitularidade");
// excluir conta (cliente continua, só perde a conta)
strict_1.default.equal(b.excluir("1-1"), true);
strict_1.default.equal(b.consultar("1-1"), undefined);
strict_1.default.equal(ana.contas.length, 0);
strict_1.default.equal(b.consultarCliente("111"), ana);
console.log("OK - excluir");
// excluirCliente (contas ficam sem dono)
strict_1.default.equal(b.excluirCliente("222"), true);
strict_1.default.equal(b.consultarCliente("222"), undefined);
strict_1.default.equal(c2.cliente, undefined);
strict_1.default.equal(b.listarContasSemCliente().length, 2);
console.log("OK - excluirCliente");
// carregarDados
b.carregarDados();
strict_1.default.equal(b.clientes.length, 5);
strict_1.default.equal(b.quantidadeContas(), 6);
strict_1.default.equal(b.listarContasCliente("111").length, 2);
strict_1.default.equal(b.listarContasSemCliente().length, 1);
console.log("OK - carregarDados");
console.log("\nTodos os testes passaram!");
//# sourceMappingURL=testes.js.map