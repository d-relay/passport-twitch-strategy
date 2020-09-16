import { Strategy } from './twitch-strategy';
import pkginfo from 'pkginfo';

pkginfo(module, "version");

const OAuth2Strategy = Strategy;
export { Strategy, OAuth2Strategy };