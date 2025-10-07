require("dotenv").config();  //loads env file contents into process.env

//basic validation for required env variables
const checkenv = (key) => {
    if(!process.env[key]){
        console.error(`Error: Environment variable ${key} not set.`);
        process.exit(1); //exit the process if a required env variable is missing
    }
    return process.env[key];
};

const env = {
     port: Number(process.env.PORT || 3000),
     appBaseUrl: checkenv("APP_BASE_URL"),
     jwtSecret: checkenv("JWT_SECRET"),
      stripeSecret: checkenv("STRIPE_SECRET_KEY"),
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET, // Not always critical in dev
    smtp: {
        host: checkenv("SMTP_HOST"),
        port: Number(checkenv("SMTP_PORT") || 587),
        user: checkenv("SMTP_USER"),
        pass: checkenv("SMTP_PASS"),
    },
     nodeEnv: process.env.NODE_ENV,
};

module.exports = { env };

