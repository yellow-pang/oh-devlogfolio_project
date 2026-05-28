export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SiteSettings {
  hero: {
    greeting: string;
    name: string;
    title: string;
    bio: string;
  };
  skills: SkillGroup[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export const defaultSiteSettings: SiteSettings = {
  hero: {
    greeting: "Hello, World! 👋",
    name: "Oh",
    title: "Frontend Developer",
    bio: "React · Next.js · TypeScript 를 좋아하는 프론트엔드 개발자입니다. 꾸준히 배우고 기록합니다.",
  },
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "State & Data",
      items: ["Zustand", "React Query", "SWR", "Firebase", "Firestore"],
    },
    {
      category: "Tools & Others",
      items: ["Git", "Figma", "Storybook", "Vercel", "ESLint"],
    },
  ],
  contact: {
    email: "contact@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};
