import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule {}
