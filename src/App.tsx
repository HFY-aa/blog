import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code, Rocket, BrainCircuit, Terminal, Zap, Cpu, ChevronRight } from 'lucide-react';
import { RESUME_DATA } from './constants';
import { AIResumeAssistant } from './components/AIResumeAssistant';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
} as const;

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-neon selection:text-black">
      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-at-t from-brand-dim/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-brand-neon" />
              <span className="tech-label text-brand-neon/60">Product Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none font-mono uppercase">
              {RESUME_DATA.name.split(' ')[0]}<br/>
              <div className="text-xs md:text-sm font-medium tracking-widest text-brand-neon transition-colors duration-500 normal-case mt-4 flex flex-col gap-1.5 border-l border-brand-neon/30 pl-4 py-1">
                <div className="flex items-center gap-2">
                  <Mail size={10} className="opacity-50" />
                  {RESUME_DATA.email}
                </div>
                {RESUME_DATA.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={10} className="opacity-50" />
                    {RESUME_DATA.phone}
                  </div>
                )}
              </div>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4 items-start md:items-end"
          >
            <div className="flex gap-3">
              <a href={RESUME_DATA.socials.github} className="tech-card p-2.5 rounded-lg border-white/10 hover:bg-brand-neon hover:text-black transition-all">
                <Github size={18} />
              </a>
              <a href={RESUME_DATA.socials.linkedin} className="tech-card p-2.5 rounded-lg border-white/10 hover:bg-brand-neon hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${RESUME_DATA.email}`} className="tech-card p-2.5 rounded-lg border-white/10 hover:bg-brand-neon hover:text-black transition-all text-brand-neon">
                <Mail size={18} />
              </a>
              {RESUME_DATA.phone && (
                <a href={`tel:${RESUME_DATA.phone}`} className="tech-card p-2.5 rounded-lg border-white/10 hover:bg-brand-neon hover:text-black transition-all text-brand-neon">
                  <Phone size={18} />
                </a>
              )}
            </div>
            <div className="font-mono text-[9px] text-white/30 tracking-widest px-4 py-1.5 rounded-full border border-white/5 uppercase">
              Location: {RESUME_DATA.location}
            </div>
          </motion.div>
        </header>

        {/* Structured Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          {/* Bio & Intro */}
          <motion.section variants={itemVariants} className="md:col-span-12 space-y-6">
             <p className="text-2xl md:text-3xl font-medium leading-tight tracking-tight text-white/90 max-w-4xl">
               {RESUME_DATA.bio}
             </p>
          </motion.section>

          {/* AI PROJECTS - MOVED FRONT */}
          <motion.section variants={itemVariants} className="md:col-span-12 space-y-8">
            <div className="flex items-center gap-4">
              <span className="tech-label text-brand-neon">Selected_AI_Works</span>
              <div className="flex-1 h-px bg-brand-neon/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESUME_DATA.projects.map((p, i) => (
                <div key={i} className="tech-card group border-white/5 hover:border-brand-neon/40 flex flex-col justify-between">
                   <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold uppercase transition-colors group-hover:text-brand-neon">{p.title}</h3>
                        <BrainCircuit size={18} className="text-brand-neon/30 p-1 border border-brand-neon/20 rounded" />
                      </div>
                      <p className="text-xs text-white/50 font-light leading-relaxed">{p.description}</p>
                   </div>
                   <div className="mt-8 flex flex-col gap-4">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(t => <span key={t} className="text-[9px] font-mono text-white/20 border border-white/5 px-2 py-0.5 rounded">#{t}</span>)}
                      </div>
                      {p.link && (
                        <a 
                          href={p.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center justify-center gap-2 py-2 bg-brand-neon/5 border border-brand-neon/20 rounded font-mono text-[9px] uppercase text-brand-neon hover:bg-brand-neon hover:text-black transition-all"
                        >
                          Visit_Project <ExternalLink size={10} />
                        </a>
                      )}
                   </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={itemVariants} className="md:col-span-8 space-y-12">
            <div className="flex items-center gap-4">
              <span className="tech-label">Professional_Experience</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="space-y-12">
              {RESUME_DATA.experience.map((exp, i) => (
                <div key={i} className="group grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <div className="text-[10px] font-mono text-white/30 uppercase mb-1">{exp.period}</div>
                    <div className="text-brand-neon/50 font-mono text-[11px]">{exp.company}</div>
                  </div>
                  <div className="md:col-span-3 space-y-4 border-l border-white/5 pl-8 group-hover:border-brand-neon/20 transition-all">
                    <h3 className="text-2xl font-bold tracking-tight uppercase italic">{exp.role}</h3>
                    <ul className="space-y-3 text-sm text-white/60 font-light leading-relaxed">
                      {exp.description.map((d, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-brand-neon/40">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Sidebar: Skills & Education */}
          <motion.section variants={itemVariants} className="md:col-span-4 space-y-8">
            <div className="tech-card space-y-10">
              <div className="space-y-6">
                <span className="tech-label border-b border-white/10 block pb-2">Technical_Inventory</span>
                <div className="space-y-6">
                   <div className="space-y-3">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">AI & Data</div>
                      <div className="flex flex-wrap gap-2 text-[9px] font-bold">
                        {RESUME_DATA.skills.ai.map(s => <span key={s} className="px-2 py-1 bg-brand-neon/10 text-brand-neon border border-brand-neon/20 rounded uppercase">{s}</span>)}
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Product</div>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                        {RESUME_DATA.skills.product.map(s => <span key={s} className="border border-white/10 px-2 py-0.5 rounded italic">{s}</span>)}
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <span className="tech-label border-b border-white/10 block pb-2">Academic</span>
                <div className="space-y-4">
                  {RESUME_DATA.education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-sm font-bold text-white/80">{edu.school}</div>
                      <div className="text-[10px] font-mono text-white/40">{edu.degree} // {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Social Impact / Volunteer Section */}
          <motion.section variants={itemVariants} className="md:col-span-12 py-10 bg-brand-neon/5 rounded-2xl border border-brand-neon/10 p-8 md:p-12 space-y-12">
            <div className="flex items-center gap-3">
              <Rocket size={18} className="text-brand-neon" />
              <span className="tech-label text-brand-neon/80 font-bold">Social_Impact_&_Volunteer</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h3 className="text-lg font-bold text-white/90">华东师大数字支教教师</h3>
                  <span className="font-mono text-[9px] text-white/30">2025.03 - 2025.05</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  依托腾讯支教平台，自主研发“生成式 AI 与 Prompt 工程”科普课程。通过线上授课引导乡村学生掌握人机交互能力，致力弥合数字鸿沟。
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h3 className="text-lg font-bold text-white/90">乡村笔记 - 未来的旅行</h3>
                  <span className="font-mono text-[9px] text-white/30">2023.06 - 2023.08</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  作为公益项目管理实习生，统筹县乡青少年职业启蒙项目。联动多家企业资源，带领 40 名乡村孩子赴沪开展职业探索与实证调研。
                </p>
              </div>
            </div>
          </motion.section>

        </motion.div>

        {/* Footer info */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 font-mono text-[10px] uppercase tracking-widest">
           <div>&copy; 2026 {RESUME_DATA.name.split(' ')[0]} Portfolio</div>
           <div className="flex gap-8">
              <span>Shanghai / Xi'an</span>
           </div>
        </footer>
      </div>

      <AIResumeAssistant />

      <style>{`
        @keyframes scan {
          from { top: -10%; }
          to { top: 110%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .serif {
          font-family: Georgia, serif;
        }
      `}</style>
    </div>
  );
}
