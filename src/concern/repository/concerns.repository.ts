// user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Concern } from '../entity/concerns.entity';

@EntityRepository(Concern)
export class ConcernRepository extends Repository<Concern> {

}
