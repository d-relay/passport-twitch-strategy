import { Strategy } from '../dist';

const options = {
    clientID: process.env.TWITCH_CLIENT_ID!,
    clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    callbackURL: process.env.REDIRECT_URL!,
    scope: "user:read:email",
    state: true
}

const twitchStrategy = new Strategy(options, (() => { }));

