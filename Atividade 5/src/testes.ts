// Exercício 05 - Parte 1, item 5: testes de todos os métodos do Banco
// Se algum assert falhar, o programa para e mostra o erro.

import assert from "node:assert/strict";
import { Banco, Cliente, Conta } from "./banco";

const b = new Banco();
const ana = new Cliente(1, "Ana", "111", new Date(1995, 2, 10));
const bruno = new Cliente(2, "Bruno", "222", new Date(1990, 6, 25));

// inserirCliente / consultarCliente (não repete id nem cpf)
b.inserirCliente(ana);
b.inserirCliente(bruno);
b.inserirCliente(new Cliente(1, "Id repetido", "999", new Date()));
b.inserirCliente(new Cliente(3, "CPF repetido", "111", new Date()));
assert.equal(b.clientes.length, 2);
assert.equal(b.consultarCliente("111"), ana);
assert.equal(b.consultarCliente("000"), undefined);
console.log("OK - inserirCliente e consultarCliente");

// inserirConta / consultar (não repete id nem número)
const c1 = new Conta(1, "1-1", 1000);
const c2 = new Conta(2, "2-2", 500);
const c3 = new Conta(3, "3-3", 300);
b.inserirConta(c1);
b.inserirConta(c2);
b.inserirConta(c3);
b.inserirConta(new Conta(1, "9-9", 0)); // id repetido
b.inserirConta(new Conta(4, "1-1", 0)); // número repetido
assert.equal(b.quantidadeContas(), 3);
assert.equal(b.consultar("1-1"), c1);
console.log("OK - inserirConta, consultar e quantidadeContas");

// associarContaCliente (regras 4a e 4b)
b.associarContaCliente("1-1", "111");
b.associarContaCliente("2-2", "111");
b.associarContaCliente("1-1", "111"); // 4a: mesma conta de novo
b.associarContaCliente("1-1", "222"); // 4b: conta já tem dono
assert.equal(ana.contas.length, 2);
assert.equal(bruno.contas.length, 0);
assert.equal(c1.cliente, ana);
console.log("OK - associarContaCliente");

// listarContasCliente / totalizarSaldoCliente / listarContasSemCliente
assert.deepEqual(b.listarContasCliente("111"), [c1, c2]);
assert.equal(b.totalizarSaldoCliente("111"), 1500);
assert.deepEqual(b.listarContasSemCliente(), [c3]);
console.log("OK - listarContasCliente, totalizarSaldoCliente e listarContasSemCliente");

// sacar / depositar / transferir
assert.equal(b.sacar("1-1", 200), true);     // 1000 -> 800
assert.equal(b.sacar("1-1", 5000), false);   // sem saldo
assert.equal(b.depositar("2-2", 100), true); // 500 -> 600
assert.equal(b.depositar("2-2", -5), false);
assert.equal(b.transferir("1-1", "3-3", 100), true); // 800 -> 700 | 300 -> 400
assert.deepEqual([c1.saldo, c2.saldo, c3.saldo], [700, 600, 400]);
console.log("OK - sacar, depositar e transferir");

// ordemBancaria
assert.equal(b.ordemBancaria("1-1", ["2-2", "3-3"], 100), true); // 700 -> 500
assert.equal(b.ordemBancaria("1-1", ["2-2", "3-3"], 300), false); // precisa de 600
assert.deepEqual([c1.saldo, c2.saldo, c3.saldo], [500, 700, 500]);
console.log("OK - ordemBancaria");

// totalDinheiroDepositado / mediaSaldoContas
assert.equal(b.totalDinheiroDepositado(), 1700);
assert.equal(b.mediaSaldoContas(), 1700 / 3);
assert.equal(new Banco().mediaSaldoContas(), 0); // banco vazio
console.log("OK - totalDinheiroDepositado e mediaSaldoContas");

// atualizar
assert.equal(b.atualizar("2-2", 900), true);
assert.equal(c2.saldo, 900);
assert.equal(b.atualizar("x", 10), false);
console.log("OK - atualizar");

// mudarTitularidade
assert.equal(b.mudarTitularidade("2-2", "222"), true);
assert.deepEqual(ana.contas, [c1]);
assert.deepEqual(bruno.contas, [c2]);
console.log("OK - mudarTitularidade");

// excluir conta (cliente continua, só perde a conta)
assert.equal(b.excluir("1-1"), true);
assert.equal(b.consultar("1-1"), undefined);
assert.equal(ana.contas.length, 0);
assert.equal(b.consultarCliente("111"), ana);
console.log("OK - excluir");

// excluirCliente (contas ficam sem dono)
assert.equal(b.excluirCliente("222"), true);
assert.equal(b.consultarCliente("222"), undefined);
assert.equal(c2.cliente, undefined);
assert.equal(b.listarContasSemCliente().length, 2);
console.log("OK - excluirCliente");

// carregarDados
b.carregarDados();
assert.equal(b.clientes.length, 5);
assert.equal(b.quantidadeContas(), 6);
assert.equal(b.listarContasCliente("111").length, 2);
assert.equal(b.listarContasSemCliente().length, 1);
console.log("OK - carregarDados");

console.log("\nTodos os testes passaram!");
