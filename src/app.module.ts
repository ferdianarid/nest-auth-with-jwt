import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_TYPE, DB_USERNAME, SECRET_KEY, TOKEN_EXPIRES } from './config';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: 3306,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: TOKEN_EXPIRES
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
