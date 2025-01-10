import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findOneByPhone(id: number) {
        return "findOneByPhone" + id;
    }
}
