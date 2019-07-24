import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class CreateBotCommand implements ISlashCommand {

    public i18nParamsExample = 'create-bot';
    public i18nDescription = 'create bot through Apps';
    public command = 'create-bot';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const botUsername = await read.getEnvironmentReader().getSettings().getValueById('bot_username');
        const botName = await read.getEnvironmentReader().getSettings().getValueById('bot_name');
        const botEmail = await read.getEnvironmentReader().getSettings().getValueById('bot_email');
        const botPassword = await read.getEnvironmentReader().getSettings().getValueById('bot_password');

        const details: Array<string> = context.getArguments();
        if (details.length === 4) {
            await read.getUserReader().createBot(details[0], details[1], details[2], details[3]);
        } else {
            await read.getUserReader().createBot(botUsername, botEmail, botName, botPassword);
        }
    }
}
