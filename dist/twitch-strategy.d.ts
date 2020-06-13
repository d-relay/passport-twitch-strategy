interface Options {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string;
}
export declare function Strategy(options: Options, verify: Function): void;
export {};
