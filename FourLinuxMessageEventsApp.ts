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

    public checkPreMessageUpdatedPrevent(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return this.messageUpdateService.check(message, read, http);
    }

    public executePreMessageUpdatedPrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        return this.messageUpdateService.execute(message, read, http, persistence);
    }

    public checkPreMessageSentModify(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return this.messageSentService.check(message, read, http);
    }

    public executePreMessageSentModify(message: IMessage, builder: IMessageBuilder, read: IRead, http: IHttp, persistence: IPersistence): Promise<IMessage> {
        return this.messageSentService.execute(message, read, http, persistence, builder);
    }

    public checkPreMessageDeletePrevent(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return this.messageDeleteService.check(message, read, http);
    }

    public executePreMessageDeletePrevent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence): Promise<boolean> {
        return this.messageDeleteService.execute(message, read, http, persistence);
    }

}
