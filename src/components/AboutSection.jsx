import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Passionate Web3 Content Creator
            </h3>

            <p className="text-muted-foreground">
              With over a year of experience in web3, I specialize
              in creating engaging, clear, and high-quality crypto
              content.
            </p>

            <p className="text-muted-foreground">
              I combine creativity, community engagement, and a deep understanding of Web3 to help projects grow and thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              {/* <a
                href=""
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a> */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  🎨
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Arts</h4>
                  <p className="text-muted-foreground">
                    I create unique art pieces, with ideas constantly flowing — you can see many of them on my profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  🚀
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Contribut</h4>
                  <p className="text-muted-foreground">
                    I enjoy joining projects at their early stages, contributing to building a strong community foundation.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  🦾
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Project Moderation</h4>
                  <p className="text-muted-foreground">
                    Together with the team, I love shaping the project’s atmosphere, working on design, mascots, and other key creative elements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};