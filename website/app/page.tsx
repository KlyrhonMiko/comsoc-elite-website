import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import OfficersSection from "@/components/landing/OfficersSection";
import FacultySection from "@/components/landing/FacultySection";
import EventsSection from "@/components/landing/EventsSection";
import MembershipSection from "@/components/landing/MembershipSection";
import ContactSection from "@/components/landing/ContactSection";
import SideNav from "@/components/landing/SideNav";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <SideNav />
      <HeroSection />
      <AboutSection />
      <FacultySection />
      <OfficersSection />
      <EventsSection />
      <MembershipSection />
      <ContactSection />
    </div>
  );
}
