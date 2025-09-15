// src/pages/Admin.jsx
import { useState } from "react";
import { account, storage, databases, IDGen, Permission, Role } from "../lib/appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

// 🔑 Авторизация
    const login = async (e) => {
        e.preventDefault();
    try {
    // Проверяем, есть ли активная сессия
    const current = await account.get().catch(() => null);
    if (current) {
      setLoggedIn(true);
      setMessage(`Вы уже вошли как ${current.email}`);
      return;
    }

    // Создаем новую сессию
    await account.createEmailPasswordSession({ email, password });
    setLoggedIn(true);
    setMessage("Вход успешен!");
  } catch (err) {
    setMessage("Ошибка входа: " + err.message);
  }
};

  // 📤 Загрузка файла
  const upload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Выберите файл.");

    setUploading(true);
    try {
      const me = await account.get().catch(() => null);

      const uploadRes = await storage.createFile(
        BUCKET_ID,
        IDGen.unique(),
        file,
        [Permission.read(Role.any())],
        [me ? Permission.write(Role.user(me.$id)) : Permission.write(Role.guests())]
      );

      const viewUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadRes.$id}/view?project=${PROJECT_ID}`;

      await databases.createDocument(
        DB_ID,
        COLLECTION_ID,
        IDGen.unique(),
        {
          image: viewUrl,
          fileId: uploadRes.$id,
          filename: file.name,
          createdAt: new Date().toISOString()
        },
        [Permission.read(Role.any())],
        [me ? Permission.write(Role.user(me.$id)) : Permission.write(Role.guests())]
      );

      setMessage("✅ Файл загружен и добавлен в галерею.");
      setFile(null);
    } catch (err) {
      setMessage("Ошибка загрузки: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-xl bg-surface p-8 rounded-2xl shadow-xl border-2 border-primary">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Admin Panel</h1>

        {/* Форма входа */}
        {!loggedIn && (
          <form onSubmit={login} className="mb-6 flex flex-col gap-3">
            <input
              className="w-full p-3 rounded-lg border border-primary focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              className="w-full p-3 rounded-lg border border-primary focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              type="submit"
            >
              Войти
            </button>
          </form>
        )}

        {/* Форма загрузки */}
        {loggedIn && (
          <form onSubmit={upload} className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={e => setFile(e.target.files[0])}
              className="border border-primary rounded-lg p-2"
            />
            <button
              disabled={uploading}
              className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              {uploading ? "Загрузка..." : "Загрузить"}
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center text-sm text-muted">{message}</p>}
        <p className="mt-4 text-sm text-muted text-center">
        </p>
      </div>
    </div>
  );
};
