import { IPessoaFisicaEntity } from './pessoaFisica.entity'
import { IPessoaJuridicaEntity } from './pessoaJuridica.entity';

//Exportando um tipo de cliente que pode ser ou Fisica ou Juridica
//Criamos a interface para poder controlar os dados informados, e depois de ter tudo especificado usaremos o type ClienteDTO para conferir os dados, e fazer o tratamento correto
export type ClientEntity = IPessoaFisicaEntity | IPessoaJuridicaEntity