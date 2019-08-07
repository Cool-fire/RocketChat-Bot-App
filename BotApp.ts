import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { CreateBotCommand } from './commands/CreateBotCommand';
import { UserGetter } from './helpers/UserGetter';

export class BotApp extends App {
    private userGetter: UserGetter;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        this.userGetter = new UserGetter();
    }

    public getUserGetter(): UserGetter {
        return this.userGetter;
    }
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.settings.provideSetting({
            id: 'bot_provider_url',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Bot Provider',
            i18nDescription: 'Enter provider url',
        });

        await configuration.slashCommands.provideSlashCommand(new CreateBotCommand(this));
    }
}
