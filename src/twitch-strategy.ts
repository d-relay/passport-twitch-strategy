import * as OAuth2Strategy from 'passport-oauth2';
import { InternalOAuthError } from 'passport-oauth2';
import fetch from 'node-fetch';

class Options {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string;
}

export class Strategy {
    private clientID: string;
    readonly name: string = 'twitch';
    readonly authorizationURL: string = 'https://id.twitch.tv/oauth2/authorize';
    readonly tokenURL: string = 'https://id.twitch.tv/oauth2/token';

    constructor(options: Options, verify: Function) {
        const params = {
            ...options,
            name: this.name,
            authorizationURL: this.authorizationURL,
            tokenURL: this.tokenURL
        }
        this.clientID = options.clientID;
        const oAuth2Strategy = new OAuth2Strategy(params, verify);
        oAuth2Strategy.userProfile = this.userProfile;
    }

    async userProfile(accessToken: string, done: Function): Promise<Function> {
        try {
            const response = await fetch('https://api.twitch.tv/helix/users', {
                method: 'GET',
                headers: {
                    'Client-ID': this.clientID,
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            if (!response.ok) return done(new InternalOAuthError("failed to fetch user profile", response.json()));

            const body = (await response.json()).data[0];
            return done(null, body);
        } catch (error) {
            return done(error, null);
        }
    }
}