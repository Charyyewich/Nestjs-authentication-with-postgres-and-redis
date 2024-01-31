import { Controller, Get, Res, UseInterceptors } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";


@UseInterceptors(CacheInterceptor)
@Controller('students')
export class StudentsController {
    constructor (private readonly studentsService: StudentsService) {}

 
    @CacheTTL(60 * 1000)
    @Get()
    async getStudents() {
        return this.studentsService.retrieveStudentsFromDb();
    }
}