import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<TypeOrmModuleOptions> => ({
            type: 'mssql',
            host: 'localhost',
            port: 27021,
            username: 'sa',
            password: "Gifttech@3201",
            database: 'store',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            options: {
                encrypt: false,
            },
        }),
    }
];
