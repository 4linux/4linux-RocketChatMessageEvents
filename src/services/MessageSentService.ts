import { IHttp, IMessageBuilder, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { MessageQuoteHelper } from '../helper/MessageQuoteHelper';
import { NotifyHelper } from '../helper/NotifyHelper';
import { RoomHelper } from '../helper/RoomHelper';
import { BLOCK_MESSAGE_QUOTE, getSettingValue } from '../settings/settings';
import { IMessageService } from './IMessageService';

export class MessageSentService implements IMessageService {

    public check(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        return new Promise(async (res) => {
            const isLiveChat = RoomHelper.isLiveChat(message.room);

            const blockQuote = await getSettingValue(read.getEnvironmentReader(), BLOCK_MESSAGE_QUOTE);

            const messageQuote = await MessageQuoteHelper.messageQuoteHelperFactory(read.getEnvironmentReader());

            res(isLiveChat && blockQuote && messageQuote.hasQuote(message));
        });
    }

    public execute(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, builder: IMessageBuilder): Promise<IMessage> {
        return new Promise(async (res) => {
            const messageQuote = await MessageQuoteHelper.messageQuoteHelperFactory(read.getEnvironmentReader());

            const messageText = messageQuote.removeQuote(message.text ?? '');

            builder.setText(messageText);

            await NotifyHelper.notifyUser(message.sender, message.room, read, 'No momento não é permitido permitido citar mensagens em livechats!');

            res(builder.getMessage());
        });
    }

}
