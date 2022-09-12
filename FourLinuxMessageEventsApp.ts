import {
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    IMessageBuilder,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {App} from '@rocket.chat/apps-engine/definition/App';
import {
    IMessage,
    IPreMessageDeletePrevent,
    IPreMessageSentModify,
    IPreMessageUpdatedPrevent,
} from '@rocket.chat/apps-engine/definition/messages';

import {MessageDeleteService} from './src/services/MessageDeleteService';
import {MessageSentService} from './src/services/MessageSentService';
import {MessageUpdateService} from './src/services/MessageUpdateService';
import {SETTINGS} from './src/settings/settings';

export class FourLinuxMessageEventsApp
    extends App
    implements IPreMessageSentModify, IPreMessageUpdatedPrevent, IPreMessageDeletePrevent {

    public async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await SETTINGS.forEach((setting) => configuration.settings.provideSetting(setting));
    }

    public async executePreMessageUpdatedPrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        const messageUpdateService = new MessageUpdateService();

        const block = await messageUpdateService.check(message, read, http);

        if (!block) {
            return false;
        }

        return messageUpdateService.execute(message, read, http, persistence);
    }

    // tslint:disable-next-line: max-line-length
    public async executePreMessageSentModify(message: IMessage, builder: IMessageBuilder, read: IRead, http: IHttp, persistence: IPersistence): Promise<IMessage> {
        const messageSentService = new MessageSentService();

        const block = await messageSentService.check(message, read, http);

        if (!block) {
            return builder.getMessage();
        }

        return messageSentService.execute(message, read, http, persistence, builder);
    }

    public async executePreMessageDeletePrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        const messageDeleteService = new MessageDeleteService();

        const block = await messageDeleteService.check(message, read, http);

        if (!block) {
            return false;
        }

        return messageDeleteService.execute(message, read, http, persistence);
    }

}
