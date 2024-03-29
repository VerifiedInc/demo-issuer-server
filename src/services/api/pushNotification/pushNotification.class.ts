import { Application } from '../../../declarations';
import logger from '../../../logger';
import { sendPushNotification } from '../../../utils/sendPushNotification';

export class PushNotificationService {
  app: Application;

  constructor (app: Application) {
    this.app = app;
  }

  async create (data: any): Promise<any> {
    const user = await this.app.service('userData').get(data.userUuid);

    const tokens = user.pushTokens.getItems().map(token => token.value);
    return await sendPushNotification(data.deeplink, tokens);
  }
}
