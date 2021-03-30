import { IHttp, IMessageBuilder, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { NotifyHelper } from '../helper/NotifyHelper';
import { RoomHelper } from '../helper/RoomHelper';
import { BLOCK_MESSAGE_REMOVE, getSettingValue } from '../settings/settings';
import { IMessageService } from './IMessageService';

export class MessageDeleteService implements IMessageService {

    public check(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return new Promise(async (res) => {
            const isLiveChat = RoomHelper.isLiveChat(message.room);

            const blockRemove = await getSettingValue(read.getEnvironmentReader(), BLOCK_MESSAGE_REMOVE);

            res(isLiveChat && blockRemove);
        });
    }

    public execute(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, builder?: IMessageBuilder): Promise<boolean> {
        return new Promise(async (res) => {
            await NotifyHelper.notifyUser(message.sender, message.room, read, 'No momento não é permitido a remoção de mensagens em livechats!');

            res(true);
        });
    }

}
