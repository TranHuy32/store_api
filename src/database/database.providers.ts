import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<TypeOrmModuleOptions> => ({
            type: 'mssql',
            host: 'localhost',
            port: 2000,
            username: 'sa',
            password: "gifttech!3201",
            database: 'store',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            options: {
                encrypt: false,
            },
        }),
    }
];
