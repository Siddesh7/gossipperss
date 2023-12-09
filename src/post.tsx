import React, {useEffect, useState} from "react";
import {receiveVotes, retrieveExistingVotes} from "./waku";
import {LightNode} from "@waku/sdk";
import {IPost} from "./proto";
import {createPost} from "./waku";

interface IProps {
  waku: LightNode; // Passing the Waku instance as a prop
}

const Poll: React.FC<IProps> = ({waku}) => {
  // State to track the selected vote option
  const [posts, setPosts] = useState<IPost>({
    post_id: "0",
    title: "",
    author: "",
    content: "",
  });
  const [livePosts, setLivePosts] = useState<IPost[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setPosts((prevPostContent) => ({
      ...prevPostContent,
      [name]: value,
    }));
  };

  // Function to handle sending a vote
  const handlePost = async (postContent: IPost) => {
    // Send the vote using the Waku network
    createPost(waku, postContent);
  };

  // Process a received vote into the vote counts state
  const processReceivedPosts = (postMessage: IPost) => {
    // Check if the post_id is not in livePosts before appending
    if (!livePosts.some((post) => post.post_id === postMessage.post_id)) {
      setLivePosts((prevPosts) => [...prevPosts, postMessage]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Increment post_id based on the length of livePosts
    const newPostId = livePosts.length + 1;

    // Add logic to handle form submission (e.g., API call, state update)
    console.log("Form submitted with data:", posts);

    // Update post_id and created_at in the form data
    const updatedPosts = {
      ...posts,
      post_id: newPostId.toString(),
      created_at: new Date().toISOString(),
    };

    // Reset the form after submission
    setPosts({
      post_id: (newPostId + 1).toString(), // Increment for the next post
      title: "",
      author: "",
      content: "",
    });

    // Handle the post
    handlePost(updatedPosts);
  };

  useEffect(() => {
    const subscribeToVotes = async () => {
      console.log("Poll: Listening for votes");
      await retrieveExistingVotes(waku, processReceivedPosts);
      await receiveVotes(waku, processReceivedPosts);
    };

    subscribeToVotes();
  }, [waku]);

  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <div className="text-white">
        <h2 className="text-2xl mb-4">Live Posts</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={posts.title}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>

          <label className="block mb-2">
            Author:
            <input
              type="text"
              name="author"
              value={posts.author}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>

          <label className="block mb-2">
            Content:
            <textarea
              name="content"
              value={posts.content}
              onChange={handleChange}
              className="form-input mt-1 block w-full"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        <ul>
          {livePosts.map((post) => (
            <li key={post.post_id} className="mb-2">
              {/* Render each post item */}
              {post.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Poll;
