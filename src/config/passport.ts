import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = {};
      } catch (error) {
        cb(error, null);
      }
    },
  ),
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/v1/github/callback",
    },
    async (acessToken, refreshToken, profile, cb) => {
      try {
        const user = {};
      } catch (error) {
        cb(error, null);
      }
    },
  ),
);
