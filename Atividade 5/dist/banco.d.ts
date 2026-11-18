export declare class Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date;
    contas: Conta[];
    constructor(id: number, nome: string, cpf: string, dataNascimento: Date);
}
export declare class Conta {
    id: number;
    numero: string;
    saldo: number;
    cliente: Cliente | undefined;
    dataDeAbertura: Date;
    constructor(id: number, numero: string, saldo?: number, dataDeAbertura?: Date);
    sacar(valor: number): boolean;
    depositar(valor: number): boolean;
    consultarSaldo(): number;
    transferir(destino: Conta, valor: number): boolean;
}
export declare class Banco {
    contas: Conta[];
    clientes: Cliente[];
    inserirCliente(cliente: Cliente): void;
    consultarCliente(cpf: string): Cliente | undefined;
    inserirConta(conta: Conta): void;
    consultar(numero: string): Conta | undefined;
    associarContaCliente(numeroConta: string, cpfCliente: string): void;
    listarContasCliente(cpf: string): Conta[];
    totalizarSaldoCliente(cpf: string): number;
    atualizar(numero: string, novoSaldo: number): boolean;
    excluir(numero: string): boolean;
    sacar(numero: string, valor: number): boolean;
    depositar(numero: string, valor: number): boolean;
    transferir(numeroOrigem: string, numeroDestino: string, valor: number): boolean;
    ordemBancaria(numeroOrigem: string, numerosDestino: string[], valor: number): boolean;
    quantidadeContas(): number;
    totalDinheiroDepositado(): number;
    mediaSaldoContas(): number;
    mudarTitularidade(numeroConta: string, cpfNovoCliente: string): boolean;
    excluirCliente(cpf: string): boolean;
    listarContasSemCliente(): Conta[];
    carregarDados(): void;
    private desvincular;
}
//# sourceMappingURL=banco.d.ts.map