import express, { Request, Response } from "express";
import {
  createOAuthClient,
  requestGoogleForAccessTokens,
  requestUserConsent,
  waitGoogleCallback,
} from "./services/oauth2";
import axios from "axios";
import { google, Auth } from "googleapis";
import { connectDb } from "./db/conn";

connectDb();

const app = express();
const oAuthClient = createOAuthClient();

app.use(express.json());

app.get("/playlists", async (req, res) => {
  const youtube = google.youtube({ version: "v3" });
  const playlists = await youtube.playlists.list({
    part: ["id"],
    access_token: `${oAuthClient.credentials.access_token}`,
    mine: true,
  });
  res.send(playlists.data);
});

app.get("/login", async (req: Request, res: Response) => {
  const youtube = google.youtube({ version: "v3" });

  console.log(oAuthClient);
  await requestUserConsent(oAuthClient, res);
  const authToken = await waitGoogleCallback(app);
  await requestGoogleForAccessTokens(oAuthClient, authToken);
});

app.listen(4000, () => console.log("server is running!"));
