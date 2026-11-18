"use strict";
// Exercício 05 - POO (IFPI) - Classes Cliente, Conta e Banco
// Parte 2, item 3: as classes ficam neste arquivo e são exportadas.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = exports.Conta = exports.Cliente = void 0;
// ===================== Parte 1, item 1: Cliente =====================
class Cliente {
    id;
    nome;
    cpf;
    dataNascimento;
    contas = []; // contas do cliente
    constructor(id, nome, cpf, dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }
}
exports.Cliente = Cliente;
// ===================== Parte 1, item 2: Conta =====================
class Conta {
    id;
    numero;
    saldo;
    cliente; // começa sem dono
    dataDeAbertura;
    constructor(id, numero, saldo = 0, dataDeAbertura = new Date()) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = undefined;
        this.dataDeAbertura = dataDeAbertura;
    }
    sacar(valor) {
        if (valor <= 0 || valor > this.saldo)
            return false;
        this.saldo -= valor;
        return true;
    }
    depositar(valor) {
        if (valor <= 0)
            return false;
        this.saldo += valor;
        return true;
    }
    consultarSaldo() {
        return this.saldo;
    }
    transferir(destino, valor) {
        if (!this.sacar(valor))
            return false; // só deposita se o saque der certo
        destino.depositar(valor);
        return true;
    }
}
exports.Conta = Conta;
// ===================== Parte 1, item 3: Banco =====================
// O banco recebe números de conta e CPFs (strings) e ele mesmo busca os objetos.
class Banco {
    contas = [];
    clientes = [];
    // ---------- Clientes ----------
    // 3a e 3f: insere cliente, sem repetir id ou cpf (regra 4c.i)
    inserirCliente(cliente) {
        const repetido = this.clientes.some(c => c.id === cliente.id || c.cpf === cliente.cpf);
        if (!repetido)
            this.clientes.push(cliente);
    }
    // 3b: busca cliente pelo cpf
    consultarCliente(cpf) {
        return this.clientes.find(c => c.cpf === cpf);
    }
    // ---------- Contas ----------
    // 3g: insere conta, sem repetir id ou número (regra 4c.ii)
    inserirConta(conta) {
        const repetida = this.contas.some(c => c.id === conta.id || c.numero === conta.numero);
        if (!repetida)
            this.contas.push(conta);
    }
    consultar(numero) {
        return this.contas.find(c => c.numero === numero);
    }
    // ---------- Associação ----------
    // 3c: liga conta e cliente (regras 4a e 4b)
    associarContaCliente(numeroConta, cpfCliente) {
        const conta = this.consultar(numeroConta);
        const cliente = this.consultarCliente(cpfCliente);
        if (!conta || !cliente)
            return;
        if (conta.cliente)
            return; // 4b: conta já tem dono
        if (cliente.contas.includes(conta))
            return; // 4a: não repete no mesmo cliente
        conta.cliente = cliente;
        cliente.contas.push(conta);
    }
    // 3d: contas de um cliente
    listarContasCliente(cpf) {
        return this.consultarCliente(cpf)?.contas ?? [];
    }
    // 3e: soma dos saldos de um cliente
    totalizarSaldoCliente(cpf) {
        return this.listarContasCliente(cpf).reduce((soma, c) => soma + c.saldo, 0);
    }
    // ===================== Parte 2 =====================
    // 1: atualizar, excluir, sacar, depositar e transferir
    atualizar(numero, novoSaldo) {
        const conta = this.consultar(numero);
        if (!conta || novoSaldo < 0)
            return false;
        conta.saldo = novoSaldo;
        return true;
    }
    // 2g: ao excluir a conta, o cliente continua, só perde a conta da lista
    excluir(numero) {
        const indice = this.contas.findIndex(c => c.numero === numero);
        if (indice === -1)
            return false;
        this.desvincular(this.contas[indice]);
        this.contas.splice(indice, 1);
        return true;
    }
    sacar(numero, valor) {
        const conta = this.consultar(numero);
        return conta ? conta.sacar(valor) : false;
    }
    depositar(numero, valor) {
        const conta = this.consultar(numero);
        return conta ? conta.depositar(valor) : false;
    }
    transferir(numeroOrigem, numeroDestino, valor) {
        const origem = this.consultar(numeroOrigem);
        const destino = this.consultar(numeroDestino);
        if (!origem || !destino)
            return false;
        return origem.transferir(destino, valor);
    }
    // 2a: ordem bancária (mesmo valor para várias contas)
    // Primeiro confere tudo; se algo falhar, nenhuma transferência é feita.
    ordemBancaria(numeroOrigem, numerosDestino, valor) {
        const origem = this.consultar(numeroOrigem);
        const destinos = numerosDestino.map(n => this.consultar(n));
        if (!origem || valor <= 0 || destinos.length === 0)
            return false;
        if (destinos.some(d => !d || d === origem))
            return false;
        if (origem.saldo < valor * destinos.length)
            return false;
        for (const destino of destinos)
            origem.transferir(destino, valor);
        return true;
    }
    // 2b
    quantidadeContas() {
        return this.contas.length;
    }
    // 2c
    totalDinheiroDepositado() {
        return this.contas.reduce((soma, c) => soma + c.saldo, 0);
    }
    // 2d: usa os dois métodos anteriores
    mediaSaldoContas() {
        const qtd = this.quantidadeContas();
        return qtd === 0 ? 0 : this.totalDinheiroDepositado() / qtd;
    }
    // 2e: troca o dono da conta
    mudarTitularidade(numeroConta, cpfNovoCliente) {
        const conta = this.consultar(numeroConta);
        const novoCliente = this.consultarCliente(cpfNovoCliente);
        if (!conta || !novoCliente)
            return false;
        this.desvincular(conta);
        conta.cliente = novoCliente;
        novoCliente.contas.push(conta);
        return true;
    }
    // 2f: ao excluir o cliente, as contas NÃO são apagadas, só ficam sem dono
    excluirCliente(cpf) {
        const indice = this.clientes.findIndex(c => c.cpf === cpf);
        if (indice === -1)
            return false;
        const cliente = this.clientes[indice];
        for (const conta of cliente.contas)
            conta.cliente = undefined;
        cliente.contas = [];
        this.clientes.splice(indice, 1);
        return true;
    }
    // 2h: contas sem dono (a atribuição é feita depois com associarContaCliente)
    listarContasSemCliente() {
        return this.contas.filter(c => c.cliente === undefined);
    }
    // 4: dados iniciais (5 clientes, 6 contas, uma conta fica sem dono)
    carregarDados() {
        this.contas = [];
        this.clientes = [];
        this.inserirCliente(new Cliente(1, "Ana Silva", "111", new Date(1995, 2, 10)));
        this.inserirCliente(new Cliente(2, "Bruno Souza", "222", new Date(1990, 6, 25)));
        this.inserirCliente(new Cliente(3, "Carla Mendes", "333", new Date(1998, 10, 4)));
        this.inserirCliente(new Cliente(4, "Diego Lima", "444", new Date(1987, 0, 18)));
        this.inserirCliente(new Cliente(5, "Eduarda Costa", "555", new Date(2001, 4, 30)));
        this.inserirConta(new Conta(1, "1-1", 1000));
        this.inserirConta(new Conta(2, "2-2", 500));
        this.inserirConta(new Conta(3, "3-3", 750));
        this.inserirConta(new Conta(4, "4-4", 1200));
        this.inserirConta(new Conta(5, "5-5", 300));
        this.inserirConta(new Conta(6, "6-6", 200)); // fica sem dono
        this.associarContaCliente("1-1", "111");
        this.associarContaCliente("2-2", "111"); // Ana tem 2 contas
        this.associarContaCliente("3-3", "222");
        this.associarContaCliente("4-4", "333");
        this.associarContaCliente("5-5", "444");
    }
    // Tira a conta da lista do dono atual (usado em excluir e mudarTitularidade)
    desvincular(conta) {
        if (!conta.cliente)
            return;
        conta.cliente.contas = conta.cliente.contas.filter(c => c !== conta);
        conta.cliente = undefined;
    }
}
exports.Banco = Banco;
//# sourceMappingURL=banco.js.map