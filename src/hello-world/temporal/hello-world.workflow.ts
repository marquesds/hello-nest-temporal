import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './hello-world.activities';
import { TemporalConfig } from './temporal.config';

const { greetActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: TemporalConfig.activityTimeout
});

export async function helloWorldWorkflow(name: string): Promise<string> {
  const greeting = await greetActivity(name);
  return greeting;
}
