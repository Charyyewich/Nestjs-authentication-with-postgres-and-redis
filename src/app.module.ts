import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UsersModule } from './users/users.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { Book } from './books/entities/books.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { TasksModule } from './tasks/tasks.module';
import { Roles } from './entities/roles.entity';
import { AuthGuard } from './auth/guard/jwt-auth.local';
import { GatewayModule } from './gateway/gateway.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Users]),
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
    entities: [Users, Book, Roles ],
    synchronize: true,}),
    AuthModule, UsersModule, DashboardModule, TasksModule, GatewayModule, FavoriteModule ],
  controllers: [BooksController],
  providers: [
    BooksService,
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
