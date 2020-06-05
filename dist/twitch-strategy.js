"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const util_1 = __importDefault(require("util"));
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
const passport_oauth2_2 = require("passport-oauth2");
const node_fetch_1 = __importDefault(require("node-fetch"));
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
function Strategy(options, verify) {
    const params = Object.assign(Object.assign({}, options), { name: 'twitch', authorizationURL: 'https://id.twitch.tv/oauth2/authorize', tokenURL: 'https://id.twitch.tv/oauth2/token' });
    this.clientID = options.clientID;
    passport_oauth2_1.default.call(this, params, verify);
}
exports.Strategy = Strategy;
util_1.default.inherits(Strategy, passport_oauth2_1.default);
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
Strategy.prototype.userProfile = function (accessToken, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield node_fetch_1.default('https://api.twitch.tv/helix/users', {
                method: 'GET',
                headers: {
                    'Client-ID': this.clientID,
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            if (!response.ok)
                return done(new passport_oauth2_2.InternalOAuthError("failed to fetch user profile", response.json()));
            const body = (yield response.json()).data[0];
            return done(null, body);
        }
        catch (error) {
            return done(error, null);
        }
    });
};
/**
 * Return extra parameters to be included in the authorization request.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options) {
    var params = {
        force_verify: false
    };
    if (typeof options.forceVerify !== "undefined") {
        params.force_verify = !!options.forceVerify;
    }
    return params;
};
//# sourceMappingURL=twitch-strategy.js.map