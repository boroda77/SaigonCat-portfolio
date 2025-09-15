import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { WorkSection } from "../components/WorkSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Works = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
        <ThemeToggle />
        <StarBackground />

        <main className="flex-1">
        <WorkSection />
        <ContactSection />
        </main>
        <Footer />

    </div>
  )
}