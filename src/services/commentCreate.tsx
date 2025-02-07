"use server";
// src\services\create.ts
import { client } from "@/sanity/lib/client";

// --------------------------------------------------------------fetch
export const myFetch = async (blog_id: string) => {
  try {
    const comments = await client.fetch(
      `*[_type == "comment" && paramsId == "${blog_id}"]`
    );
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments. Please try again later.");
  }
};

// --------------------------------------------------------------create
interface Comment {
  name: string;
  email: string;
  message: string;
  paramsId: string;
}

export const createComment = async (newComment: Comment) => {
  try {
    await client.create({
      _type: "comment",
      ...newComment,
    });

    return await myFetch(newComment.paramsId);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment. Please try again later.");
  }
};

// --------------------------------------------------------------Update
export const updateComment = async (_id: string, UpdatedComment: Comment) => {
  try {
    await client
      .patch(_id)
      .set({
        name: UpdatedComment.name,
        email: UpdatedComment.email,
        message: UpdatedComment.message,
      })
      .commit();

    return await myFetch(UpdatedComment.paramsId);
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Failed to update comment. Please try again later.");
  }
};

// --------------------------------------------------------------Delete
export const deleteComment = async (_id: string, paramsId: string) => {
  try {
    await client.delete(_id);
    return await myFetch(paramsId);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment. Please try again later.");
  }
};