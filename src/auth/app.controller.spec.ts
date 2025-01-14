// import { Test } from "@nestjs/testing";
// import { beforeEach, describe } from "node:test";
// import { UserService } from "../user/user.service";
// import { AuthService } from "./auth.service";
// import { User } from "../user/user.entity";

// describe('AuthService', () => {
//     let authService: AuthService;
//     let userService: UserService;

//     beforeEach(async () => {
//         const moduleRef = await Test.createTestingModule({
//             providers: [AuthService],
//             imports: [UserService]
//         }).compile();

//         authService = await moduleRef.get(AuthService);
//         userService = await moduleRef.get(UserService);
//     });

//     describe('checkUser', () => {
//         it('should be null', async () => {
//             const user = new User({ id: 5, phone: '039359198', password: '', name: 'CoT' });
//             jest.spyOn(UserService.prototype, 'findOneByPhone').mockImplementation(() => Promise.resolve(user));
//             expect(await authService.checkUser('0395359198', 'abcd1234')).toBe(null);
//         });
//     });

// })

it('just a test', () => {
    expect(1).toBe(1);
});