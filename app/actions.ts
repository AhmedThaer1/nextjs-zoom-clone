"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

/**
 * This function is used to generate a token for a user.
 * It first retrieves the Stream API key and secret from the environment variables.
 * If either the API key or secret is not found, it throws an error.
 * It then fetches the current user. If the user is not authenticated, it throws an error.
 * A new StreamClient is created using the API key and secret.
 * An expiry time for the token is set to one hour from the current time.
 * The issuedAt time is set to one minute before the current time.
 * A token is then created for the user using the StreamClient, with the user's id, the expiry time, and the issuedAt time.
 * The generated token is logged to the console and then returned.
 */

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

// retrieve the user ids for the given email addresses from clerk client
export async function getUserIds(emailAddresses: string[]) {
  const res = await clerkClient.users.getUserList({
    emailAddress: emailAddresses,
  });
  return res.map((user) => user.id);
}
