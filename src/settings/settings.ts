import { IEnvironmentRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISetting,
    SettingType,
} from '@rocket.chat/apps-engine/definition/settings';

export const RC_SERVER_URL = 'Site_Url';

export const BLOCK_MESSAGE_UPDATE = 'block_message_update';
export const BLOCK_MESSAGE_QUOTE = 'block_message_quote';
export const BLOCK_MESSAGE_REMOVE = 'block_message_remove';
export const NOTIFY_USER_ALIAS = 'notify_user_alias';
export const NOTIFY_AVATAR_EMOJI = 'notify_avatar_emoji';

export const SETTINGS: Array<ISetting> = [
    {
        id: BLOCK_MESSAGE_UPDATE,
        type: SettingType.BOOLEAN,
        packageValue: true,
        required: true,
        public: false,
        i18nLabel: BLOCK_MESSAGE_UPDATE + '_label',
        i18nDescription: BLOCK_MESSAGE_UPDATE + '_description',
    },
    {
        id: BLOCK_MESSAGE_QUOTE,
        type: SettingType.BOOLEAN,
        packageValue: true,
        required: true,
        public: false,
        i18nLabel: BLOCK_MESSAGE_QUOTE + '_label',
        i18nDescription: BLOCK_MESSAGE_QUOTE + '_description',
    },
    {
        id: BLOCK_MESSAGE_REMOVE,
        type: SettingType.BOOLEAN,
        packageValue: true,
        required: true,
        public: false,
        i18nLabel: BLOCK_MESSAGE_REMOVE + '_label',
        i18nDescription: BLOCK_MESSAGE_REMOVE + '_description',
    },
    {
        id: NOTIFY_USER_ALIAS,
        type: SettingType.STRING,
        packageValue: 'Alerts',
        required: true,
        public: false,
        i18nLabel: NOTIFY_USER_ALIAS + '_label',
        i18nDescription: NOTIFY_USER_ALIAS + '_description',
    },
    {
        id: NOTIFY_AVATAR_EMOJI,
        type: SettingType.STRING,
        packageValue: ':no_entry_sign:',
        required: true,
        public: false,
        i18nLabel: NOTIFY_AVATAR_EMOJI + '_label',
        i18nDescription: NOTIFY_AVATAR_EMOJI + '_description',
    },
];

export async function getSettingValue(environmentRead: IEnvironmentRead, settingId: string): Promise<any> {
    const setting = (await environmentRead
        .getSettings()
        .getById(settingId)) as ISetting;

    return setting.value;
}
