import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<TypeOrmModuleOptions> => ({
            type: 'mssql',
            host: process.env.SQL_SERVER_HOST,
            port: +process.env.SQL_SERVER_PORT,
            username: process.env.SQL_SERVER_USERNAME,
            password: process.env.SQL_SERVER_PASSWORD,
            database: process.env.SQL_SERVER_DATABASE,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            options: {
                encrypt: false,
            },
        }),
    }
];