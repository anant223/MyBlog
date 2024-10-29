import config from "../conf/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DBService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userid }) {
    const slug = ID.unique();
    try {
      // Ensure all required fields are provided
      if (!title || !content || !userid) {
        throw new Error("Missing required fields: title, content, or userid.");
      }

      const newDoc = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userid,
        }
      );
      return newDoc;
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error", error);
      throw error; // Throw the error so it can be handled upstream
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async likePost(postId, userId) {
    console.log(postId, userId);
    try {
      await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteLikeId,
        ID.unique(),
        {
          user_id: userId,
          post_id: postId,
        }
      );
      console.log("Post liked successfully");
    } catch (error) {
      console.log("Error while liking the post:", error.message);
    }
  }

  async getAllByQueries(queries, db_ID) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        db_ID,
        queries
      );
    } catch (error) {
      console.log("Error while retrieving likes:", error.message);
    }
  }

  async getAllLikes(postId) {
    try {
      return this.getAllByQueries(
        [Query.equal("post_id", postId)],
        config.appwriteLikeId
      );
    } catch (error) {
      console.log("Error while retrieving likes:", error.message);
    }
  }

  async removeUserLike(userId, postId) {
    try {
      console.log(userId, postId);
      const searchLikedUser = await this.getAllByQueries(
        [Query.equal("post_id", postId), Query.equal("user_id", userId)],
        config.appwriteLikeId
      );

      if (searchLikedUser.documents.length > 0) {
        const user = searchLikedUser.documents[0].$id;
        await this.databases.deleteDocument(
          config.appwriteDatabaseId,
          config.appwriteLikeId,
          user
        );
        console.log("liked id removed successfully");
        return true; // To confirm the action was successful.
      } else {
        console.log("No like found for the user and post.");
        return false; // Indicates that no like existed.
      }
    } catch (error) {
      console.log("Error while removing like:", error.message);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.getAllByQueries(
        [Query.equal("status", "active")],
        config.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }

  // comments

  async createComments(postId, { user_id, comment, parent_id = null }) {
    try {
      const newComment = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentCLId,
        ID.unique(),
        {
          post_id: postId,
          comment,
          user_id,
          parent_id,
        }
      );
      return newComment;
    } catch (error) {
      console.log("Appwrite service :: create comments :: ", error.message);
      return;
    }
  }

  async getComments(postId) {
    try {
      return await this.getAllByQueries(
        [Query.equal("post_id", postId)],
        config.appwriteCommentCLId
      );
    } catch (error) {
      console.log("Appwrite service :: get comments :: ", error.message);
      return;
    }
  }
}

const dbService = new DBService();
export default dbService;
