// user.repository.ts
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Token } from '../entity/tokens.entity';


@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {


}
