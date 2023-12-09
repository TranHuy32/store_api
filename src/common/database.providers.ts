import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<TypeOrmModuleOptions> => ({
            type: 'mssql',
            host: '116.97.240.113',
            port: 1539,
            username: 'sa',
            password: 'CCna@123123',
            database: 'UserAll',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            options: {
                encrypt: false,
            },
        }),
    },
];
