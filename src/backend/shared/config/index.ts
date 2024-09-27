export const PROJECT = {
  nodeEnv: process.env.NODE_ENV,
  envName: process.env.NEXT_PUBLIC_ENV_NAME,
  host: process.env.NEXT_PUBLIC_URL,
};

export const NEXT_AUTH = {
  secret: process.env.NEXTAUTH_SECRET,
  jwtSecret: process.env.NEXTAUTH_JWT_SECRET,
};

export const LOGGER = {
  dockerName: process.env.DD_DOCKER_NAME,
  okCode: 11,
};

export const MONGO = {
  uri: process.env.MONGODB_URI,
};

export const SENDGRID = {
  apiKey: process.env.SENDGRID_API_KEY || "",
  EMAIL_SENDER: process.env.SENDGRID_EMAIL_SENDER || "",
  EMAIL_API_KEY: process.env.SENDGRID_EMAIL_API_KEY || "",
  TEMPLATES: {
    WELCOME: {
      ID: process.env.SENDGRID_WELCOME_TEMPLATE_ID || "",
      VERSION: process.env.SENDGRID_WELCOME_TEMPLATE_VERSION || "1",
    },
  },
};

export const FRONTEND = {
  URL: process.env.FRONTEND_URL || "",
};

export const SOCIAL_NETWORKS = {
  GOOGLE: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  FACEBOOK: {
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
  },
};