import OAuth2Strategy from "passport-oauth2";
export declare class Strategy extends OAuth2Strategy {
    private clientID;
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
     * @param {OAuth2Strategy.StrategyOptionsBase} options
     * @param {OAuth2Strategy.VerifyFunction | OAuth2Strategy.VerifyFunctionWithRequest} verify
     * @api public
     */
    constructor(options: OAuth2Strategy._StrategyOptionsBase, verify: OAuth2Strategy.VerifyFunction | OAuth2Strategy.VerifyFunctionWithRequest);
    /**
     * Retrieve user profile from Twitch.
     * This function constructs a normalized profile, with the following properties:
     *   - `provider`         always set to `twitch`
     *   - `id`
     *   - `username`
     *   - `displayName`
     * @param {String} accessToken
     * @param {Function} done
     * @api protected
     */
    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): Promise<void>;
    /**
     * Return extra parameters to be included in the authorization request.
     * @param {Object} options
     * @return {Object}
     * @api protected
     */
    authorizationParams(options: {
        forceVerify?: boolean;
    }): object;
}
export default Strategy;
