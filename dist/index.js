"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Strategy = exports.Strategy = void 0;
const twitch_strategy_1 = require("./twitch-strategy");
Object.defineProperty(exports, "Strategy", { enumerable: true, get: function () { return twitch_strategy_1.Strategy; } });
const OAuth2Strategy = twitch_strategy_1.Strategy;
exports.OAuth2Strategy = OAuth2Strategy;
//# sourceMappingURL=index.js.map