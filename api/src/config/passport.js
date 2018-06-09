import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import UserService from '../services/user';
import config from './development';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

/** Local strategy for singup and login */
const localOpts = {
    usernameField: "email"
};

const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const result = await UserService.authenticate(email, password);
        if (result.status == 200) {
            return done(null, result.user);
        } else {
            return done(null, "error", {
                message: result.message
            });
        }
    } catch (error) {
        return done(error, false);
    }
});

/** JWT strategy for authorize to protect routes  */
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await UserService.getUserById(payload.data._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });