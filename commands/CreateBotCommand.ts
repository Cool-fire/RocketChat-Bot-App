import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { BotApp } from '../BotApp';
import { UserGetter } from '../helpers/UserGetter';

export class CreateBotCommand implements ISlashCommand {

    public i18nParamsExample: string;
    public i18nDescription: string;
    public command: string;
    public providesPreview: boolean;
    constructor(private readonly app: BotApp) {
        this.i18nParamsExample = '/invitebot username';
        this.command = 'invite-bot';
        this.i18nDescription = 'create bot through Apps';
        this.providesPreview = false;
    }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const botProviderUrl = await read.getEnvironmentReader().getSettings().getValueById('bot_provider_url');
        const details: Array<string> = context.getArguments();
        if (botProviderUrl !== '') {
            const username = details[0];
            const botArray = await this.app.getUserGetter().getUser(this.app.getLogger(), http, botProviderUrl, username);
            const roles: Array<string> = ['bot'];
            this.app.getLogger().log(botArray);

            if (username) {
                botArray.forEach((bot) => {
                    if (bot.username === username) {
                        const user = {
                            email : bot.email,
                            name : bot.name,
                            username : bot.username,
                            roles,
                            active : bot.active,
                            requirePasswordChange : true,
                            sendWelcomeEmail : bot.sendWelcomeMail,
                            joinDefaultChannels : bot.joinDefaultChannels,
                            verified : bot.verified,
                        };
                        const builder = modify.getCreator().startUser(user);
                        const userId = modify.getCreator().finish(builder);
                    }
                });
            } else {
                botArray.forEach((bot) => {
                    const user = {
                        email : bot.email,
                        name : bot.name,
                        username : bot.username,
                        roles,
                        active : bot.active,
                        requirePasswordChange : true,
                        sendWelcomeEmail : bot.sendWelcomeMail,
                        joinDefaultChannels : bot.joinDefaultChannels,
                        verified : bot.verified,
                    };
                    const builder = modify.getCreator().startUser(user);
                    const userId = modify.getCreator().finish(builder);
                });
            }
        }
    }
}
