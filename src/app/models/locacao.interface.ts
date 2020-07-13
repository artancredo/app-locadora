import { Autor } from 'src/app/models/autor.interface';
import { Cliente } from './cliente.interface';
import { Filme } from './filme.interface';

export interface Locacao {
    id?: string;
    cliente: Cliente;
    filme: Filme;
    dataInicio: Date;
    dataFim: Date;
    valor: number;
}