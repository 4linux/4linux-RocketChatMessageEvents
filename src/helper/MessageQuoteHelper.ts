import { IEnvironmentRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import { RC_SERVER_URL } from '../settings/settings';

const REGEX_QUOTE_REGEX = '\\[ \\]\\(%SERVER_URL%\\/live\\/([0-9]|[a-z]|[A-Z])*\\?msg=([0-9]|[a-z]|[A-Z])*\\)';

export class MessageQuoteHelper {

    public static async messageQuoteHelperFactory(enviromentRead: IEnvironmentRead) {
        const settings = (await enviromentRead.getServerSettings().getOneById(RC_SERVER_URL)) as ISetting;
        return new MessageQuoteHelper(settings.value);
    }

    private constructor(private serverUrl: string) {}

    public hasQuote(message: IMessage): boolean {
        const regex = new RegExp(this.replaceRegexServerUrl(), 'ig');

        return regex.test(message.text ?? '');
    }

    public removeQuote(messageText: string): string {
        const regex = new RegExp(this.replaceRegexServerUrl(), 'ig');

        messageText = messageText.replace(regex, '');
        messageText = messageText.trim();

        return messageText;
    }

    private replaceRegexServerUrl(): string {
        return REGEX_QUOTE_REGEX.replace('%SERVER_URL%', this.serverUrl);
    }

}
