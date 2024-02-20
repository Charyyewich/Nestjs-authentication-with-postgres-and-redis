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
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/books.entity';
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { Activities } from './entities/activities.entity';
// import { DashboardModule } from './dashboard/dashboard.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { Roles } from './entities/roles.entity';
import { UploadModule } from './upload/upload.module';
import { FileEntity } from './upload/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, FileEntity]),
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
    entities: [Users, Book, Activities, Roles, FileEntity ],
    synchronize: true,}),
    AuthModule, UsersModule, DashboardModule, TasksModule, UploadModule],
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
