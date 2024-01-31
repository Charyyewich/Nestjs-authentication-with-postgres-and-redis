import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { resolve } from "path";


@Injectable() 
    export class StudentsService {
        constructor(@Inject('CACHE_MANAGER')private cacheManager: Cache) {}

        // async getStudents() {
        //     // await this.cacheManager.set('Key1', 'Salam');
        //     // return this.cacheManager.get('Key1');
        // }
        

        async retrieveStudentsFromDb() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const students = [
                        {
                            name : 'kerem', age: '20', Kurs: '2'
                        },
                    ];
                    resolve(students);
                }, 1000);
            })
        }
    }
