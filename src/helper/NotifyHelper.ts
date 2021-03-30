import { IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

import { getSettingValue, NOTIFY_AVATAR_EMOJI, NOTIFY_USER_ALIAS } from '../settings/settings';

export abstract class NotifyHelper {

    public static async notifyUser(user: IUser, room: IRoom, read: IRead, text: string) {
        const usernameAlias = await getSettingValue(read.getEnvironmentReader(), NOTIFY_USER_ALIAS);
        const bloemojiAvatarckRemove = await getSettingValue(read.getEnvironmentReader(), NOTIFY_AVATAR_EMOJI);
        const notify = read.getNotifier();

        const message = notify.getMessageBuilder()
            .setUsernameAlias(usernameAlias)
            .setEmojiAvatar(bloemojiAvatarckRemove)
            .setText(text)
            .setRoom(room)
            .setSender(user)
            .getMessage();

        await notify.notifyUser(user, message);
    }

}
