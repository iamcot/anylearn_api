import { NestMiddleware } from "@nestjs/common";


// export class LoggerMiddleware implements NestMiddleware {
//     use(req: Request, res: Response, next: () => void) {
//         console.log('Request ...');
//         next();
//     }
// }

export function logger(req: Request, res: Response, next: () => void) {
    console.log(`Request...`);
    next();
}