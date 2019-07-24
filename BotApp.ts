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

export class BotApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.settings.provideSetting({
            id: 'bot_name',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Bot name',
            i18nDescription: 'Enter Bot Name',
        });

        configuration.settings.provideSetting({
            id: 'bot_email',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Bot Email',
            i18nDescription: 'Enter Email address for Bot',
        });

        configuration.settings.provideSetting({
            id: 'bot_username',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Bot username',
            i18nDescription: 'Enter Username for Bot',
        });

        configuration.settings.provideSetting({
            id: 'bot_password',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Bot password',
            i18nDescription: 'Enter password',
        });

        await configuration.slashCommands.provideSlashCommand(new CreateBotCommand());
    }
}
