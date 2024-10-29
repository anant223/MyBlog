import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const newUserAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Directly return the login attempt if account creation is successful
      return await this.login({ email, password });
    } catch (error) {
      console.log("Appwrite Service :: create Account ::", error);
      throw error; // Throw the complete error object
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite Service :: Login Account ::", error);
      throw error; // Throw the complete error object
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async getMyPref() {
    try {
      const result = await this.account.getPrefs();
      return result;
    } catch (error) {
      console.log(
        "Appwrite service :: getUserPreferences :: error:",
        error.message
      );
      return null;
    }
  }

  async guestLogin() {
    try {
      const newGuest = await this.account.createAnonymousSession();
      if (newGuest) {
        this.login();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

const authService = new AuthService();

export default authService;
