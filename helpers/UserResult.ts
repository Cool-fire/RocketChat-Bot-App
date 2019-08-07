
export class UserResult {
    public email: string;
    public username: string;
    public name: string;
    public active?: boolean = false;
    public requirePasswordChange?: boolean = false;
    public sendWelcomeMail?: boolean = false;
    public joinDefaultChannels?: boolean = true;
    public verified?: boolean = false;

    constructor(data?: any) {
        if (data) {
            this.email = data.email as string;
            this.username = data.username as string;
            this.name = data.name as string;
            this.active = data.active as boolean;
            this.requirePasswordChange = data.requirePasswordChange as boolean;
            this.sendWelcomeMail = data.sendWelcomeMail as boolean;
            this.joinDefaultChannels = data.joinDefaultChannels as boolean;
            this.verified = data.verified as boolean;
        }
    }
}
