import util from "util";
import OAuth2Strategy from "passport-oauth2";
// import { InternalOAuthError } from "passport-oauth2";
// import fetch from "node-fetch";

interface Options {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string;
}
/**
 * `Strategy` constructor.
 *
 * The Twitch authentication strategy authenticates requests by delegating to
 * Twitch using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Twitch application"s client id
 *   - `clientSecret`  your Twitch application"s client secret
 *   - `callbackURL`   URL to which Twitch will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new TwitchStrategy({
 *         clientID: "123-456-789",
 *         clientSecret: "shhh-its-a-secret"
 *         callbackURL: "https://www.example.net/auth/twitch/callback"
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
export function Strategy(options: Options, verify: Function) {
    const params = {
        ...options,
        name: 'twitch',
        authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
        tokenURL: 'https://id.twitch.tv/oauth2/token'
    }
    this.clientID = options.clientID;
    OAuth2Strategy.call(this, params, verify);
    this._oauth2.setAuthMethod("Bearer");
    this._oauth2.useAuthorizationHeaderforGET(true);
}

util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Twitch.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `twitch`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = async function (accessToken: string, done: Function): Promise<any> {
    // try {
    //     const response = await fetch('https://api.twitch.tv/helix/users', {
    //         method: 'GET',
    //         headers: {
    //             'Client-ID': this.clientID,
    //             'Accept': 'application/vnd.twitchtv.v5+json',
    //             'Authorization': 'Bearer ' + accessToken
    //         }
    //     })

    //     if (!response.ok) return done(new InternalOAuthError("failed to fetch user profile", response.json()));

    //     const body = (await response.json()).data[0];
    //     return done(null, body);
    // } catch (error) {
    //     return done(error, null);
    // }
    this._oauth2.get("https://api.twitch.tv/helix/users", accessToken, function (err, body: string, res) {
        try {
            if (err) { return done(new OAuth2Strategy.InternalOAuthError("failed to fetch user profile", err)); }
            const _body = JSON.parse(body);
            const profile = _body.data[0];
            done(null, profile);
        } catch (e) {
            done(e);
        }
    });
}

/**
 * Return extra parameters to be included in the authorization request.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options: { forceVerify: boolean }): object {
    var params = {
        force_verify: false
    };
    if (typeof options.forceVerify !== "undefined") {
        params.force_verify = !!options.forceVerify;
    }
    return params;
};