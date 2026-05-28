"use client";

import { motion } from "framer-motion";
import { SkillGroup, defaultSiteSettings } from "@/types/siteSettings";

interface SkillSectionProps {
  skills?: SkillGroup[];
}

export function SkillSection({ skills }: SkillSectionProps) {
  const skillGroups = skills ?? defaultSiteSettings.skills;
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-2">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            기술 스택
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            현재 주로 사용하고 있는 기술들입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="bg-background rounded-xl border p-6"
            >
              <h3 className="font-semibold text-sm text-primary uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg bg-muted font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
