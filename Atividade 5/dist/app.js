"use strict";
// Exercício 05 - Parte 2, itens 5 e 6: menu no console dentro da classe App
// Contas: opções 01 a 11 | Clientes: opções 20 a 25
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const banco_1 = require("./banco");
const input = (0, prompt_sync_1.default)();
class App {
    banco = new banco_1.Banco();
    menu() {
        let opcao = "";
        do {
            console.log("\nBem vindo! Digite uma opção:");
            console.log("Contas:");
            console.log("01 - Inserir      02 - Consultar     03 - Sacar");
            console.log("04 - Depositar    05 - Excluir       06 - Transferir");
            console.log("07 - Totalizações 08 - Atualizar     09 - Ordem bancária");
            console.log("10 - Mudar titular 11 - Contas sem cliente");
            console.log("Clientes:");
            console.log("20 - Inserir      21 - Consultar     22 - Associar");
            console.log("23 - Excluir      24 - Listar contas 25 - Saldo total");
            console.log("0 - Sair");
            const lido = input("Opção: ");
            if (lido === null)
                break; // fim da entrada (Ctrl+D / arquivo)
            opcao = lido.trim().padStart(2, "0"); // "1" vira "01"
            switch (opcao) {
                case "01":
                    this.inserirConta();
                    break;
                case "02":
                    this.consultarConta();
                    break;
                case "03":
                    this.sacar();
                    break;
                case "04":
                    this.depositar();
                    break;
                case "05":
                    this.excluirConta();
                    break;
                case "06":
                    this.transferir();
                    break;
                case "07":
                    this.totalizacoes();
                    break;
                case "08":
                    this.atualizarConta();
                    break;
                case "09":
                    this.ordemBancaria();
                    break;
                case "10":
                    this.mudarTitularidade();
                    break;
                case "11":
                    this.contasSemCliente();
                    break;
                case "20":
                    this.inserirCliente();
                    break;
                case "21":
                    this.consultarCliente();
                    break;
                case "22":
                    this.associar();
                    break;
                case "23":
                    this.excluirCliente();
                    break;
                case "24":
                    this.listarContasCliente();
                    break;
                case "25":
                    this.saldoCliente();
                    break;
                case "00": break;
                default: console.log("Opção inválida.");
            }
            if (opcao !== "00")
                input("Operação finalizada. Digite <enter>");
        } while (opcao !== "00");
        console.log("Aplicação encerrada");
    }
    // ---------- Contas ----------
    inserirConta() {
        const id = Number(input("Id da conta: "));
        const numero = input("Número da conta: ");
        const saldo = Number(input("Saldo inicial: "));
        const antes = this.banco.quantidadeContas();
        this.banco.inserirConta(new banco_1.Conta(id, numero, saldo));
        this.mostrar(this.banco.quantidadeContas() > antes, "Conta cadastrada.", "Id ou número já existe.");
    }
    consultarConta() {
        const conta = this.banco.consultar(input("Número da conta: "));
        if (!conta)
            return console.log("Conta não encontrada.");
        const dono = conta.cliente ? conta.cliente.nome : "sem cliente";
        console.log(`Conta ${conta.numero} | Saldo: R$ ${conta.saldo.toFixed(2)} | Dono: ${dono}`);
    }
    sacar() {
        const ok = this.banco.sacar(input("Número da conta: "), Number(input("Valor: ")));
        this.mostrar(ok, "Saque feito.", "Saque não realizado.");
    }
    depositar() {
        const ok = this.banco.depositar(input("Número da conta: "), Number(input("Valor: ")));
        this.mostrar(ok, "Depósito feito.", "Depósito não realizado.");
    }
    excluirConta() {
        this.mostrar(this.banco.excluir(input("Número da conta: ")), "Conta excluída.", "Conta não encontrada.");
    }
    transferir() {
        const origem = input("Conta de origem: ");
        const destino = input("Conta de destino: ");
        const ok = this.banco.transferir(origem, destino, Number(input("Valor: ")));
        this.mostrar(ok, "Transferência feita.", "Transferência não realizada.");
    }
    totalizacoes() {
        console.log(`Quantidade de contas: ${this.banco.quantidadeContas()}`);
        console.log(`Total depositado: R$ ${this.banco.totalDinheiroDepositado().toFixed(2)}`);
        console.log(`Média dos saldos: R$ ${this.banco.mediaSaldoContas().toFixed(2)}`);
    }
    atualizarConta() {
        const ok = this.banco.atualizar(input("Número da conta: "), Number(input("Novo saldo: ")));
        this.mostrar(ok, "Conta atualizada.", "Não foi possível atualizar.");
    }
    ordemBancaria() {
        const origem = input("Conta de origem: ");
        const destinos = input("Contas destino (separadas por vírgula): ").split(",").map(s => s.trim());
        const ok = this.banco.ordemBancaria(origem, destinos, Number(input("Valor para cada uma: ")));
        this.mostrar(ok, "Ordem bancária feita.", "Ordem bancária não realizada.");
    }
    mudarTitularidade() {
        const ok = this.banco.mudarTitularidade(input("Número da conta: "), input("CPF do novo dono: "));
        this.mostrar(ok, "Titularidade alterada.", "Conta ou cliente não encontrado.");
    }
    // 2h: lista contas sem dono e já permite atribuir
    contasSemCliente() {
        const contas = this.banco.listarContasSemCliente();
        if (contas.length === 0)
            return console.log("Todas as contas têm dono.");
        contas.forEach(c => console.log(`- ${c.numero} (R$ ${c.saldo.toFixed(2)})`));
        if (input("Atribuir dono agora? (s/n): ") === "s")
            this.associar();
    }
    // ---------- Clientes ----------
    inserirCliente() {
        const id = Number(input("Id do cliente: "));
        const nome = input("Nome: ");
        const cpf = input("CPF: ");
        const [dia, mes, ano] = input("Nascimento (dd/mm/aaaa): ").split("/").map(Number);
        const antes = this.banco.clientes.length;
        this.banco.inserirCliente(new banco_1.Cliente(id, nome, cpf, new Date(ano, mes - 1, dia)));
        this.mostrar(this.banco.clientes.length > antes, "Cliente cadastrado.", "Id ou CPF já existe.");
    }
    consultarCliente() {
        const cliente = this.banco.consultarCliente(input("CPF: "));
        if (!cliente)
            return console.log("Cliente não encontrado.");
        console.log(`${cliente.nome} | CPF: ${cliente.cpf} | Contas: ${cliente.contas.length}`);
    }
    associar() {
        const numero = input("Número da conta: ");
        const cpf = input("CPF do cliente: ");
        this.banco.associarContaCliente(numero, cpf);
        const ok = this.banco.consultar(numero)?.cliente?.cpf === cpf;
        this.mostrar(ok, "Conta associada.", "Não associada (dados errados ou conta já tem dono).");
    }
    excluirCliente() {
        this.mostrar(this.banco.excluirCliente(input("CPF: ")), "Cliente excluído; contas ficaram sem dono.", "Cliente não encontrado.");
    }
    listarContasCliente() {
        const contas = this.banco.listarContasCliente(input("CPF: "));
        if (contas.length === 0)
            return console.log("Nenhuma conta encontrada.");
        contas.forEach(c => console.log(`- ${c.numero} (R$ ${c.saldo.toFixed(2)})`));
    }
    saldoCliente() {
        console.log(`Saldo total: R$ ${this.banco.totalizarSaldoCliente(input("CPF: ")).toFixed(2)}`);
    }
    // Mostra mensagem de sucesso ou erro
    mostrar(ok, sucesso, erro) {
        console.log(ok ? sucesso : erro);
    }
}
exports.App = App;
// Item 6: instancia, carrega os dados e chama o menu
if (require.main === module) {
    const app = new App();
    app.banco.carregarDados();
    app.menu();
}
//# sourceMappingURL=app.js.map