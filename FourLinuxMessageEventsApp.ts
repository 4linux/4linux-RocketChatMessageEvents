import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IMessageBuilder,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import {
    IMessage,
    IPreMessageDeletePrevent,
    IPreMessageSentModify,
    IPreMessageUpdatedPrevent,
} from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

import { MessageDeleteService } from './src/services/MessageDeleteService';
import { MessageSentService } from './src/services/MessageSentService';
import { MessageUpdateService } from './src/services/MessageUpdateService';
import { SETTINGS } from './src/settings/settings';

export class FourLinuxMessageEventsApp
    extends App
    implements IPreMessageSentModify, IPreMessageUpdatedPrevent, IPreMessageDeletePrevent {

    private messageUpdateService: MessageUpdateService;
    private messageDeleteService: MessageDeleteService;
    private messageSentService: MessageSentService;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);

        this.messageUpdateService = new MessageUpdateService();
        this.messageDeleteService = new MessageDeleteService();
        this.messageSentService = new MessageSentService();
    }

    public async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await SETTINGS.forEach((setting) => configuration.settings.provideSetting(setting));
    }

    public async executePreMessageUpdatedPrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        const block = await this.messageUpdateService.check(message, read, http);

        if (!block) {
            return false;
        }

        return this.messageUpdateService.execute(message, read, http, persistence);
    }

    // tslint:disable-next-line: max-line-length
    public async executePreMessageSentModify(message: IMessage, builder: IMessageBuilder, read: IRead, http: IHttp, persistence: IPersistence): Promise<IMessage> {
        const block = await this.messageSentService.check(message, read, http);

        if (!block) {
            return builder.getMessage();
        }

        return this.messageSentService.execute(message, read, http, persistence, builder);
    }

    public async executePreMessageDeletePrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        const block = await this.messageDeleteService.check(message, read, http);

        if (!block) {
            return false;
        }

        return this.messageDeleteService.execute(message, read, http, persistence);
    }

}
