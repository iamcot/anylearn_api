import { WorkerHost, Processor } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

@Processor('user')
export class UserProcessor extends WorkerHost {
    private readonly logger = new Logger(UserProcessor.name);

    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case 'update-tree': {
                this.logger.debug('job start');
                this.logger.debug(job.data);
                this.logger.debug('job done');
                return {};
            }
            case 'user-list': {
                this.logger.debug('job user-list');
                this.logger.debug(job.data);
                break;
            }
        }
    }
}