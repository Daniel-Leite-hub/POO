# Exercício 05 - POO (IFPI / ADS - Prof. Ely)

**Aluno:** Daniel

Enunciados: [Parte 1](poo_05_exercicio_ts_parte_1.pdf) | [Parte 2](poo_05_exercicio_ts_parte_2.pdf)

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| [src/banco.ts](src/banco.ts) | Classes `Cliente`, `Conta` e `Banco` |
| [src/app.ts](src/app.ts) | Menu no console (classe `App`) |
| [src/testes.ts](src/testes.ts) | Testes de todos os métodos do `Banco` |
| `dist/` | Arquivos `.js` gerados pelo `tsc` |

## Como rodar

Precisa ter o [Node.js](https://nodejs.org) instalado.

```bash
git clone https://github.com/Daniel-Leite-hub/POO.git
cd "POO/Atividade 5"
npm install     # instala prompt-sync e @types/prompt-sync
npm test        # compila e roda os testes
npm start       # compila e abre o menu
```

Resultado esperado do `npm test`:

```
OK - inserirCliente e consultarCliente
OK - inserirConta, consultar e quantidadeContas
OK - associarContaCliente
OK - listarContasCliente, totalizarSaldoCliente e listarContasSemCliente
OK - sacar, depositar e transferir
OK - ordemBancaria
OK - totalDinheiroDepositado e mediaSaldoContas
OK - atualizar
OK - mudarTitularidade
OK - excluir
OK - excluirCliente
OK - carregarDados

Todos os testes passaram!
```

---

## Parte 1

### 1) Classe Cliente
Guarda `id`, `nome`, `cpf`, `dataNascimento` e um array `contas`. O array começa vazio e vai sendo preenchido quando associo uma conta ao cliente.

### 2) Classe Conta
Adicionei `id`, `cliente` e `dataDeAbertura`. O `cliente` começa como `undefined` porque a conta pode ser criada antes de ter um dono. Os métodos `sacar`, `depositar` e `transferir` retornam `true` ou `false` para dizer se a operação deu certo.

### 3) Classe Banco
O banco tem dois arrays: `contas` e `clientes`.

| Item | Método | O que faz |
|---|---|---|
| a / f | `inserirCliente` | Adiciona o cliente se não existir outro com o mesmo `id` ou `cpf` |
| b | `consultarCliente` | Procura o cliente pelo CPF com `find` |
| c | `associarContaCliente` | Busca a conta e o cliente e liga os dois |
| d | `listarContasCliente` | Retorna o array `contas` do cliente |
| e | `totalizarSaldoCliente` | Soma os saldos das contas do cliente com `reduce` |
| g | `inserirConta` | Adiciona a conta se não existir outra com o mesmo `id` ou `numero` |

### 4) Regras de negócio
- **a)** Antes de associar, verifico se a conta já está em `cliente.contas` (`includes`).
- **b)** Se `conta.cliente` já tem alguém, a associação é ignorada.
- **c)** `inserirCliente` e `inserirConta` usam `some` para verificar se o id, CPF ou número já existe.

### 5) Testes
Estão em [src/testes.ts](src/testes.ts). Usei o `assert` do próprio Node: se algum resultado for diferente do esperado, o programa para e mostra o erro. Testei os casos certos e os errados (CPF repetido, saque sem saldo, conta com dono etc.).

### 6) Questionamentos

**a) Você concorda que o banco faz o cadastro de duas entidades e ainda faz regras de negócio?**
Concordo. Do jeito que está, o `Banco` guarda as contas, guarda os clientes e ainda faz as validações e operações. Ele faz coisa demais, e isso vai contra a ideia de que cada classe deve ter uma responsabilidade só. Quanto mais o sistema cresce, mais difícil fica mexer nessa classe.

**b) Não seria adequado ter `CadastroDeClientes` e `CadastroDeContas`, deixando a validação no banco e os métodos de consulta/inclusão simples?**
Sim, seria melhor. Os cadastros só guardariam e buscariam os objetos (inserir, consultar, excluir), e o `Banco` ficaria com as regras (não repetir CPF, verificar saldo etc.). Assim cada classe fica menor e mais fácil de entender e testar.

**c) O método de associar cliente a uma conta deveria estar em qual classe?**
No `Banco`. Associar envolve as duas entidades ao mesmo tempo, então precisa acessar os dois cadastros e aplicar as regras 4a e 4b. Se ficasse em um dos cadastros, um teria que depender do outro.

---

## Parte 2

### 1) excluir, atualizar, sacar, depositar e transferir
Todos recebem o **número da conta** (string). O banco busca a conta com `consultar` e chama o método da própria `Conta`. Se a conta não existir, retorna `false`.

### 2) Métodos adicionais
- **a) `ordemBancaria`**: transfere o mesmo valor para várias contas. Antes de começar, confiro se todas as contas existem e se o saldo dá para todas. Se der algum problema, nada é transferido.
- **b) `quantidadeContas`**: `contas.length`.
- **c) `totalDinheiroDepositado`**: soma todos os saldos.
- **d) `mediaSaldoContas`**: total ÷ quantidade, chamando os dois métodos anteriores (retorna 0 se não tiver contas, para não dividir por zero).
- **e) `mudarTitularidade`**: tira a conta do dono antigo e coloca no novo.
- **f) `excluirCliente`**: **minha decisão:** as contas não são apagadas, só ficam sem dono (`cliente = undefined`). Assim o dinheiro não some e a conta pode ser passada para outra pessoa depois.
- **g) `excluir` (conta)**: **minha decisão:** o cliente continua cadastrado; só removo a conta da lista dele.
- **h) `listarContasSemCliente`**: filtra as contas com `cliente === undefined`. No menu (opção 11), depois de listar, o programa pergunta se quero atribuir um dono na hora.

### 3) Arquivo banco.ts
As classes `Cliente`, `Conta` e `Banco` estão em [src/banco.ts](src/banco.ts) com `export`.

### 4) carregarDados
Cria 5 clientes e 6 contas. A Ana fica com 2 contas e a conta `6-6` fica sem dono para testar o item 2h.

| CPF | Cliente | Contas |
|---|---|---|
| 111 | Ana Silva | 1-1, 2-2 |
| 222 | Bruno Souza | 3-3 |
| 333 | Carla Mendes | 4-4 |
| 444 | Diego Lima | 5-5 |
| 555 | Eduarda Costa | - |
| - | sem dono | 6-6 |

### 5) e 6) app.ts e classe App
O menu fica dentro da classe `App`, que tem um atributo `banco`. Cada opção do menu chama um método da `App`, que lê os dados com `prompt-sync` e chama o método do banco.

- **Contas:** opções `01` a `11`
- **Clientes:** opções `20` a `25`
- **Sair:** `0`

No final do arquivo eu crio a `App`, chamo `carregarDados()` e depois `menu()`.
