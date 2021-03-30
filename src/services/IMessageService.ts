import { IHttp, IMessageBuilder, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

export interface IMessageService {

    check(message: IMessage, read: IRead, http: IHttp): Promise<boolean>;

    execute(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, builder?: IMessageBuilder): Promise<any>;

}
