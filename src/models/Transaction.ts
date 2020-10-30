import { validate as isUuid } from 'uuid';
import { v4 as uuid } from 'uuid';

// Model responsavel por retornar um novo objeto com todos os dados necessarios

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
