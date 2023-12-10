import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcernsService } from './concerns.service';
import { ConcernRepository } from './repository/concerns.repository';
import { Concern } from './entity/concerns.entity';
import { ConcernsController } from './concerns.controller';
@Module({
    imports: [TypeOrmModule.forFeature([Concern])],
    providers: [ConcernsService, ConcernRepository],
    controllers: [ConcernsController],
    exports: [ConcernsService, ConcernRepository],
})
export class ConcernsModule { }