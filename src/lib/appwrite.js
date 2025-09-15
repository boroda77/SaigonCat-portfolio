// src/lib/appwrite.js
import * as Appwrite from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!ENDPOINT || !PROJECT_ID) {
  console.error(
    "[Appwrite] Missing VITE_APPWRITE_ENDPOINT or VITE_APPWRITE_PROJECT_ID. Please set them in .env.local and restart the dev server."
  );
}

// Создаём клиент только если есть значения (чтобы не падало при SSR и т.п.)
const client = new Appwrite.Client();
if (typeof ENDPOINT === "string" && ENDPOINT.length) client.setEndpoint(ENDPOINT);
if (typeof PROJECT_ID === "string" && PROJECT_ID.length) client.setProject(PROJECT_ID);

export const account = new Appwrite.Account(client);
export const storage = new Appwrite.Storage(client);
export const databases = new Appwrite.Databases(client);
export const realtime = typeof Appwrite.Realtime === "function" ? new Appwrite.Realtime(client) : null;

// Утилиты
export const IDGen = Appwrite.ID;
export const QueryBuilder = Appwrite.Query;
export const Permission = Appwrite.Permission;
export const Role = Appwrite.Role;

export default client;
