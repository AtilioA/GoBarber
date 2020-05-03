import Bee from 'bee-queue';
import MailCancellation from '../app/jobs/MailCancellation';
import redisConfig from '../config/redis';

const jobs = [MailCancellation];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  // Init jobs from queue with Redis
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Add new job to queue
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Process jobs from queue
  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
