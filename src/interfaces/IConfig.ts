import { GatewayIntentBits } from 'discord.js';

interface IActivity {
    name: string;
}

/**
 * The interface for the config file
 * @interface IConfig
 */

interface IConfig {
    StaffPrefix: string;
    github_url: string;
    GreetingChannel: string;
    RulesChannel: string;
    Intents: GatewayIntentBits[];
    startupActivity: string;
    Activities: IActivity[];
    SupportEmbedChance: {
        chanceToSend: number;
        ranAmount: number;
    }
}

export {
    IConfig,
    IActivity
}
