import protobuf from "protobufjs";

export const Comment = new protobuf.Type("Comment")
  .add(new protobuf.Field("comment_id", 1, "string"))
  .add(new protobuf.Field("author", 2, "string"))
  .add(new protobuf.Field("content", 3, "string"))
  .add(new protobuf.Field("created_at", 4, "string"))
  .add(new protobuf.Field("upvotes", 5, "int32"))
  .add(new protobuf.Field("replies", 6, "Comment", "repeated"));

export const Post = new protobuf.Type("Post")
  .add(new protobuf.Field("post_id", 1, "string"))
  .add(new protobuf.Field("title", 2, "string"))
  .add(new protobuf.Field("author", 3, "string"))
  .add(new protobuf.Field("content", 4, "string"))
  .add(new protobuf.Field("created_at", 5, "string"))
  .add(new protobuf.Field("upvotes", 6, "int32"));

export interface IComment {
  comment_id: string;
  author: string;
  content: string;
  created_at: string;
  upvotes: number;
  replies: IComment[];
}

export interface IPost {
  post_id: string;
  title: string;
  author: string;
  content: string;
  created_at: string;
  upvotes: number;
}
