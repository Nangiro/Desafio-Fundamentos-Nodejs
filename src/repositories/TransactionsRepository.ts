import Transaction from '../models/Transaction';

// TransactionsRepository simula o banco de dados

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction{
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  // all precisa retornar todos as transacoes salvar por isso deve retornar o this.transactions
  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // accumulator = Vai salvar toda informacao que sera retornada no final da execucao do reduce
    // transactions = "map", sao todos os itens que sao contidos no this.transactions
    const { income, outcome } = this.transactions.reduce((accumulator: Balance, transaction: Transaction) => {
      switch( transaction.type ) {
        case "income":
          accumulator.income += transaction.value;
          break;
        case "outcome":
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      }
      return accumulator;
    },
    {
      // Valores Iniciais
      income: 0,
      outcome: 0,
      total: 0
    },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type}: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    // Colocando a nossa nova transaction dentro do "Banco de dados"
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
