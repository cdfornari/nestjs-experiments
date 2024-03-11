import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { Surreal } from 'surrealdb.node';
import { ConfigurableModuleClass, OPTIONS_TYPE } from './surrealdb.definition';
import { catchError, defer, lastValueFrom, retry, timer } from 'rxjs';
import { CONNECTION_NAME } from './constants/connection-name';

@Global()
@Module({})
export class SurrealModule extends ConfigurableModuleClass {
  constructor() {
    super();
  }

  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const {
      url,
      port,
      username,
      password,
      namespace,
      database,
      retryAttempts = 9,
      retryDelay = 3000,
    } = options;
    const connectionUrl = url + `:${port}`;
    const logger = new Logger('SurrealDBModule');
    const connectionProvider = {
      provide: CONNECTION_NAME,
      useFactory: async (): Promise<any> =>
        await lastValueFrom(
          defer(async () => {
            const surreal = await SurrealModule.createConnection(
              connectionUrl,
              username,
              password,
              namespace,
              database,
            );
            return {
              create: (resource: string, data?: any) =>
                surreal.create(resource, data),
              merge: (resource: string, data: any) =>
                surreal.merge(resource, data),
              query: (sql: string, bindings?: any) =>
                surreal.query(sql, bindings),
              select: (resource: string) => surreal.select(resource),
              delete: (restource: string) => surreal.delete(restource),
              update: (resource: string, data?: any) =>
                surreal.update(resource, data),
              set: (key: string, value: any) => surreal.set(key, value),
              unset: (key: string) => surreal.unset(key),
            };
          }).pipe(
            retry({
              count: retryAttempts,
              delay: (error: string) => {
                logger.error(
                  `Unable to connect to the database. Retrying (${error})...`,
                  '',
                );
                return timer(retryDelay);
              },
            }),
            catchError((error) => {
              // Log the error on final failure
              logger.error(
                `Unable to connect to database after ${retryAttempts} attempts: ${error.message}`,
              );
              throw error; // Re-throw for further handling if needed
            }),
          ),
        ),
    };
    return {
      module: SurrealModule,
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }

  private static async createConnection(
    url: string,
    username: string,
    password: string,
    namespace: string,
    database: string,
  ): Promise<Surreal> {
    const surreal = new Surreal();
    await surreal.connect(url);
    await surreal.signin({
      username,
      password,
    });
    await surreal.use({
      ns: namespace,
      db: database,
    });
    return surreal;
  }
}
