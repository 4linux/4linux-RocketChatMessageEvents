import { IHttp, IMessageBuilder, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { NotifyHelper } from '../helper/NotifyHelper';
import { RoomHelper } from '../helper/RoomHelper';
import { BLOCK_MESSAGE_UPDATE, getSettingValue } from '../settings/settings';
import { IMessageService } from './IMessageService';

export class MessageUpdateService implements IMessageService {

    public check(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return new Promise(async (res) => {
            const isLiveChat = RoomHelper.isLiveChat(message.room);

            const blockUpdate = await getSettingValue(read.getEnvironmentReader(), BLOCK_MESSAGE_UPDATE);

            res(isLiveChat && blockUpdate);
        });
    }

    public execute(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, builder?: IMessageBuilder): Promise<boolean> {
        return new Promise(async (res) => {
            await NotifyHelper.notifyUser(message.sender, message.room, read, 'No momento não é permitido editar mensagens em livechats!');

            res(true);
        });
    }

}
