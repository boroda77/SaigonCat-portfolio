import { Twitter } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-8 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">Connect with Me</h2>
        <div className="flex justify-center space-x-6">
          <a
            href="https://x.com/SaiMoo_n"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blue-500 transition-colors"
          >
            <Twitter size={32} />
          </a>

          <a
            href="https://t.me/SaigonNaMore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blue-400 transition-colors"
          >
            <img
              src="/projects/telegram-icon.png"
              alt="Telegram"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://medium.com/@SatoMoon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blue-400 transition-colors"
          >
            <img
              src="/projects/medium_icon.png"
              alt="Medium"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://link3.to/KW0AV2SE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blue-400 transition-colors"
          >
            <img
              src="/projects/link3.png"
              alt="Medium"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
