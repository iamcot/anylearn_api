import AppDataSource from '@database/data-source';
import {User}  from '@entity/user.entity';

export const UserRepo = AppDataSource.getRepository(User).extend({
    findbyId: async (id: number) => {
        return await UserRepo.findOneBy({ id: id });
    },

    findByPhone: async (phone: string) => {
        return await UserRepo.findOneBy({
            phone: phone
        }) as User
    },
});
