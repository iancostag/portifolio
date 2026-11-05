"use client";

import { useState } from "react";
import { Project } from "@/data/portfolio-data";
import { Navbar } from "@/components/Navbar";
import { HeroBrutalist } from "@/components/HeroBrutalist";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { AboutSection } from "@/components/AboutSection";
import { LiveStatusWidget } from "@/components/LiveStatusWidget";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ProjectDrawer } from "@/components/ProjectDrawer";
import { CommandPalette } from "@/components/CommandPalette";
import { SpotlightCursor } from "@/components/SpotlightCursor";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { FastScanModal } from "@/components/FastScanModal";

export default function MonumentalBrutalistPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isFastScanOpen, setIsFastScanOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col relative bg-transparent transition-colors duration-500">
      {/* Dynamic Spotlight Follower */}
      <SpotlightCursor />

      {/* Floating Hacker Terminal in Bottom-Right */}
      <InteractiveTerminal />

      {/* Fast Scan Recruiter 1-Page Modal */}
      <FastScanModal
        isOpen={isFastScanOpen}
        onClose={() => setIsFastScanOpen(false)}
      />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Slide-over Technical Drawer */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Glass Navbar */}
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenFastScan={() => setIsFastScanOpen(true)}
        currentRoute="/minimal"
      />

      {/* Monumental Hero Brutalist (Inspired by ejosue.com) */}
      <HeroBrutalist onOpenCommand={() => setIsCommandOpen(true)} />

      {/* Deep Dive Case Studies with Code Tabs & Real Impact Metrics */}
      <CaseStudiesSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* About The Engineer Section with Portrait Photo */}
      <AboutSection />

      {/* Real-time Status Widget (Brasília Time, Current Focus & 1-Page Scan) */}
      <LiveStatusWidget
        onOpenFastScan={() => setIsFastScanOpen(true)}
      />

      {/* Research & Work History */}
      <ExperienceTimeline />

      {/* Technical Arsenal & Certifications */}
      <SkillsSection />

      {/* Direct Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
