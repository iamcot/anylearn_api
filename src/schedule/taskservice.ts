import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TaskService {

    private readonly logger = new Logger(TaskService.name, {
        timestamp: true
    });

    // @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        this.logger.debug('cron called by logger');
    }
}