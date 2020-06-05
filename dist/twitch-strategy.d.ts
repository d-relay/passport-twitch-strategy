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
export declare function Strategy(options: Options, verify: Function): void;
export {};
