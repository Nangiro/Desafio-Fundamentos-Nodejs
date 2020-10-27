import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // Listagem - .all retorna todas transacoes criadas ate o momento

    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Buscando os valores que usaremos na transactionservice para criar a transaction
    const { title, value, type } = request.body;

    // Criar TransactionService que cuida da regra de negocios
    const createTransaction = new CreateTransactionService (
      transactionsRepository
    );

    // Executar o metodo execute (criar transacao) e retornar a transacao que sera criada
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
