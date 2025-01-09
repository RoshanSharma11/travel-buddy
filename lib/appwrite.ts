import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('677e98370021fcedcb8c'); // Your project ID

export const account = new Account(client);
    