# Atividade Extra

Esta pasta reúne cinco exercícios de revisão da disciplina de Programação
Orientada a Objetos (POO), desenvolvidos em TypeScript. As atividades
praticam criação de classes, atributos, métodos, validação de dados,
encapsulamento de regras e manipulação de coleções.

## Exercícios

1. **Cronômetro** (`questao1_cronometro`)  
   Controla o tempo acumulado em segundos, permite zerar a contagem e
   converter o resultado para minutos.
2. **Estacionamento** (`questao2_estacionamento`)  
   Registra a permanência de um veículo, calcula as horas cobradas e emite um
   ticket com o valor correspondente.
3. **Impressora** (`questao3_impressora`)  
   Calcula o custo de impressões em preto e branco ou coloridas e mantém os
   totais de páginas e valores impressos.
4. **Coleção de números** (`questao4_colecao_numeros`)  
   Armazena números e oferece operações de quantidade, soma, média, maior e
   menor valor.
5. **Registro de temperaturas** (`questao5_registro_temperaturas`)  
   Registra temperaturas em Celsius, lista as medições, identifica valores
   acima de um limite, calcula a média e converte os dados para Fahrenheit.

## Como executar

Cada exercício possui seu próprio `tsconfig.json` e os arquivos JavaScript
gerados. Para recompilar e executar uma questão, entre na pasta desejada e
execute:

```bash
npx tsc
node questao1_cronometro.js
```

Substitua `questao1_cronometro.js` pelo nome do arquivo correspondente ao
exercício escolhido.
