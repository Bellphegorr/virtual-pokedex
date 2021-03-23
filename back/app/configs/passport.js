const jwt = require('jsonwebtoken'),
    passport = require("passport"),
    passportJWT = require("passport-jwt"),
    mongoose = require('mongoose');

const ExtractJwt = passportJWT.ExtractJwt,
    JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: 'minhaChaveSecreta'
}


module.exports = () => {
    let strategy = new JwtStrategy(jwtOptions, verifier);

    async function verifier(jwt, next) {
        console.log(jwt.id);
        let user = await mongoose.models.User.findOne({_id: jwt.id});

        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    }

    return {
        strategy() {
            passport.use(strategy);
        },


        initialize() {
            return passport.initialize();
        },


        authenticate() {
            return passport.authenticate('jwt', {session: false});
        },

        
        generateToken(id) {
            let payload = {id};
            
            return jwt.sign(payload, jwtOptions.secretOrKey);
        }
    }
}