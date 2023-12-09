"use client";

import {
  DecodedMessage,
  LightNode,
  createDecoder,
  createEncoder,
  createLightNode,
  waitForRemotePeer,
} from "@waku/sdk";

import {IPost, Post} from "./proto";

const contentTopic = "/gossiperssss/90090000";

const encoder = createEncoder({contentTopic});
const decoder = createDecoder(contentTopic);

// TODO: createNode
// TODO: subscribeToIncomingVotes
// TODO: retrieveExistingVotes
// TODO: sendVote

export const createNode = async () => {
  const waku = await createLightNode({defaultBootstrap: true});
  await waitForRemotePeer(waku);
  return waku;
};

export const receiveVotes = async (
  waku: LightNode,
  callback: (post: IPost) => void
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const postMessageObj = Post.decode(wakuMessage.payload);
    const postMessage = postMessageObj.toJSON() as IPost;
    callback(postMessage);
  };

  const unsubscribe = await waku.filter.subscribe([decoder], _callback);
  return unsubscribe;
};

export const createPost = async (waku: LightNode, postMessage: IPost) => {
  const protoMessage = Post.create({
    post_id: postMessage.post_id,
    title: postMessage.title,
    author: postMessage.author,
    content: postMessage.content,
    created_at: postMessage.created_at,
    upvotes: postMessage.upvotes,
  });

  // Serialise the message using Protobuf
  const serialisedMessage = Post.encode(protoMessage).finish();

  // Send the message using Light Push
  await waku.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};

export const retrieveExistingVotes = async (
  waku: LightNode,
  callback: (postMessage: IPost) => void
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;
    const postMessageObj = Post.decode(wakuMessage.payload);
    const postMessage = postMessageObj.toJSON() as IPost;
    callback(postMessage);
  };

  // Query the Store peer
  await waku.store.queryWithOrderedCallback([decoder], _callback);
};
