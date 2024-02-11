import { Module, UseInterceptors } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UsersModule } from './users/users.module';
//import { AuthGuard } from './auth/guard/jwt-auth.local';
// import { BookService } from './book/book.service';
// import { BookModule } from './book/book.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
      isGlobal: true,
      store: redisStore,
      ttl: 1000000,
    })    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
    host: '192.168.113.12',
    port: 5432,
    username: 'postgres',
    password: 'map11312!',
    database: 'new',
    entities: [Users],
    synchronize: true,}),
    AuthModule, UsersModule],
  controllers: [],
  providers: [
    {provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
    },
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  // },
],
})
export class AppModule {}
