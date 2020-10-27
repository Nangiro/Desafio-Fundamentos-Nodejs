import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // Eh preciso criar uma interface para indicar quais sao os tipos de variaveis que estao sendo passadas no metodo execute
  public execute({ title, value, type}: Request): Transaction {

    // Se o type nao possui (!) os valores 'income' ou 'outcome' leia a mensagem de error
    if (!['income', 'outcome'].includes(type)){
      throw new Error('Transaction type is invalid');
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type == "outcome" && total < value ){
      throw new Error('Not enough gold');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }

}

export default CreateTransactionService;
