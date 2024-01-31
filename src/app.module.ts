import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { StudentsModule } from './students/students.module';
import { StudentsService } from './students/students.service';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000, 
      store: redisStore,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
    host: '192.168.113.12',
    port: 5432,
    username: 'postgres',
    password: 'map11312!',
    database: 'new',
    entities: [Users],
    synchronize: true,}),
    StudentsModule,
 AuthModule, UsersModule],
  controllers: [AppController, ],
  providers: [AppService, StudentsService],
})
export class AppModule {}
