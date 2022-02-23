import { google, Auth } from "googleapis";
import { Express, Response } from "express";

//cria um cliente do google
export const createOAuthClient = () => {
  const credentials = require("../credentials.json");
  const oAuthClient = new Auth.OAuth2Client(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );
  return oAuthClient;
};

//cria link de autorização do google
export const requestUserConsent = async (oAuthClient: any, res: Response) => {
  const consentUrl = oAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube"],
  });
  res.send(`please give your consent > ${consentUrl}`);
};

//callback de autorização
export const waitGoogleCallback = async (app: Express) => {
  return new Promise((resolve, reject) => {
    console.log("waiting for yser consent...");
    app.get("/oauth2callback", (req, res) => {
      const authCode = req.query.code;
      console.log("consent given");
      res.send(`<h1>cum</h1>`);
      resolve(authCode);
    });
  });
};

//obtem token de autorização
export const requestGoogleForAccessTokens = async (
  oAuthClient: any,
  authToken: any
) => {
  oAuthClient.getToken(authToken, (err: any, tokens: any) => {
    if (err) {
      return err;
    }
    console.log("access token recived");
    console.log(tokens);
    oAuthClient.setCredentials(tokens);
    console.log(oAuthClient);
  });
};
