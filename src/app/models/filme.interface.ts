import { Autor } from 'src/app/models/autor.interface';
import { Genero } from './genero.interface';

export interface Filme {
    id?: string;
    nome: string;
    dataLancamento: Date;
    sinopse: Text;
    imagem: string;
    autor: Autor;
    genero: Genero;
}