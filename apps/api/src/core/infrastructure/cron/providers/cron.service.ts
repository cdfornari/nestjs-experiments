import { Interval, CronHost, Timeout } from 'src/core/infrastructure/scheduler';

@CronHost
export class CronService {
  @Interval(1000)
  everySecond() {
    console.log('One more time 🪩');
  }

  @Timeout(1000)
  onceAfterASecond() {
    console.log('Just one time 👾');
  }
}
