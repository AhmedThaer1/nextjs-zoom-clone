"use server";

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
  const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream API key or secret not found");
  }

  const user = await currentUser();

  console.log("generate token for user", user?.id);

  if (!user) {
    throw new Error("User not Authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const expireTime = Math.floor(Date.now() / 1000) + 60 * 60;

  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, expireTime, issuedAt);

  console.log("Generated token", token);

  return token;
}
