// user.repository.ts
import { EntityRepository, Repository, getConnection } from 'typeorm';
import { User } from '../entity/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findAll(): Promise<User[]> {
        return await this.find();
    }

    async findUserById(id: string): Promise<User | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return await this.save(user);
    }

    async updateUserById(id: string, userData: Partial<User>): Promise<User | undefined> {
        await this.update(id, userData);
        return this.findOne({ where: { id: id } })
    }

    async deleteUserById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findUserByUserName(userName: string): Promise<User | undefined> {
        return await this.findOne({ where: { username: userName } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<User | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}
