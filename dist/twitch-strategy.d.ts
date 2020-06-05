declare class Options {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string;
}
export declare class Strategy {
    private clientID;
    readonly name: string;
    readonly authorizationURL: string;
    readonly tokenURL: string;
    constructor(options: Options, verify: Function);
    userProfile(accessToken: string, done: Function): Promise<Function>;
}
export {};
