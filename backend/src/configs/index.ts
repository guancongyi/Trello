import databaseConfig from './database.json';
interface IDatabaseConfig{
    username:string,
    password:string,
    database:string,
    host:string,
    dialect:'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb'
}
const configs = {
    development:{
        server:{
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.development as IDatabaseConfig,
        jwt:{
            privateKey:'kkb'
        },
        storage:{
            prefix: '/public/attachments'
        }
    },
    test:{
        server:{
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.test as IDatabaseConfig,
        jwt:{
            privateKey:'kkb'
        },
        storage:{
            prefix: '/public/attachments'
        }
    },
    production:{
        server:{
            host:'localhost',
            port: 8080
        },
        database:databaseConfig.production as IDatabaseConfig,
        jwt:{
            privateKey:'kkb'
        },
        storage:{
            prefix: '/public/attachments'
        }
    }
};
type configKeys = keyof typeof configs;
const NODE_ENV = process.env.NODE_ENV as configKeys || 'development';
export default configs[NODE_ENV]