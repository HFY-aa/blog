import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code, Rocket, BrainCircuit, Terminal, Zap, Cpu, ChevronRight, X, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { RESUME_DATA } from './constants';
import { AIResumeAssistant } from './components/AIResumeAssistant';

// Glob all images under public/assets/volunteer recursively
const allImages = import.meta.glob('/public/assets/volunteer/**/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', { eager: true });

const STATIC_PHOTOS: Record<string, string[]> = {};

Object.keys(allImages).forEach((key) => {
  const parts = key.split('/');
  // parts will look like ["", "public", "assets", "volunteer", "category-name", "filename.jpg"]
  const category = parts[4];
  const fileName = parts[5];
  if (category && fileName) {
    if (!STATIC_PHOTOS[category]) {
      STATIC_PHOTOS[category] = [];
    }
    // We serve the public assets under /assets dir
    STATIC_PHOTOS[category].push(`/assets/volunteer/${category}/${fileName}`);
  }
});

function VolunteerItem({ v, onOpenGallery }: { v: any, onOpenGallery: (photos: string[]) => void }) {
  const photos = React.useMemo(() => {
    return STATIC_PHOTOS[v.category] || [];
  }, [v.category]);

  const [displayPhotos, setDisplayPhotos] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (photos.length > 0) {
      const shuffled = [...photos].sort(() => 0.5 - Math.random());
      setDisplayPhotos(shuffled.slice(0, 5));
    } else {
      setDisplayPhotos([]);
    }
  }, [photos]);

  const shufflePhotos = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length === 0) return;
    const shuffled = [...photos].sort(() => 0.5 - Math.random());
    setDisplayPhotos(shuffled.slice(0, 5));
  };

  return (
    <div className="min-w-[280px] md:min-w-[420px] snap-start group text-left">
      <div 
        onClick={() => photos.length > 0 && onOpenGallery(photos)}
        className={`tech-card border-white/5 group-hover:border-brand-neon/40 h-full flex flex-col items-start gap-4 transition-all hover:bg-white/[0.02] ${photos.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
      >
         <div className="w-full flex justify-between items-center bg-white/[0.03] px-3 py-2 rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              <Rocket size={14} className="text-brand-neon" />
              <span className="font-mono text-[10px] text-white/70">{v.period}</span>
            </div>
              <div className="flex items-center gap-2">
              {photos.length > 5 && (
                <button 
                  onClick={shufflePhotos}
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[8px] text-white/40 hover:text-brand-neon hover:border-brand-neon/20 transition-all pointer-events-auto"
                >
                  <RefreshCw size={10} />
                  换一换 (SHUFFLE)
                </button>
              )}
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-neon/10 border border-brand-neon/20 rounded font-mono text-[8px] text-brand-neon">
                <ImageIcon size={10} />
                {photos.length > 0 ? `${photos.length} RECORDS` : '0 RECORDS'}
              </div>
            </div>
         </div>
         
         <div className="space-y-3">
            <h4 className="font-bold text-lg group-hover:text-brand-neon transition-colors leading-tight">{v.title}</h4>
            <p className="text-[11px] text-white/50 font-light leading-relaxed line-clamp-2">{v.description}</p>
         </div>

         {/* Mini Preview of 5 Random Photos */}
         {displayPhotos.length > 0 && (
           <div className="w-full grid grid-cols-5 gap-1.5 mt-2">
             {displayPhotos.map((p, idx) => (
               <div key={idx} className="aspect-square rounded overflow-hidden border border-white/5 bg-white/5">
                 <img src={p} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
               </div>
             ))}
           </div>
         )}

         <div className="mt-auto pt-4 flex items-center gap-2 text-[9px] font-mono text-brand-neon/50 group-hover:text-brand-neon transition-colors">
            <Zap size={10} />
            {photos.length > 0 ? 'Click_to_access_visual_records' : 'Cloud_records_syncing_...'}
         </div>
      </div>
    </div>
  );
}

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
  const [selectedPhotos, setSelectedPhotos] = React.useState<string[] | null>(null);

  return (
    <div className="min-h-screen selection:bg-brand-neon selection:text-black bg-zinc-950 relative overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-at-t from-brand-dim/20 via-transparent to-transparent" />
      </div>

      {/* Photo Wall Modal */}
      {selectedPhotos && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhotos(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between items-center mb-8 bg-zinc-900/10 backdrop-blur-sm py-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-brand-neon uppercase">Gallery_Vault_Access</h3>
              </div>
              <button 
                onClick={() => setSelectedPhotos(null)} 
                className="p-2 hover:bg-brand-neon hover:text-black rounded-lg transition-all border border-white/5"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {selectedPhotos.map((url, idx) => (
                <div key={idx} className="break-inside-avoid relative group overflow-hidden rounded-xl border border-white/10">
                  <img 
                    src={url} 
                    alt="Certificate Detail" 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="font-mono text-[8px] text-white/60">IMG_SOURCE_{idx + 1}</span>
                  </div>
                </div>
              ))}
              {/* Coming Soon Placeholder in Modal */}
              <div className="break-inside-avoid aspect-square bg-white/[0.02] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon size={20} className="text-white/10 mb-2" />
                <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">More_Assets_Syncing</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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

          <motion.section variants={itemVariants} className="md:col-span-12 space-y-6">
            <div className="flex items-center gap-4">
              <span className="tech-label text-brand-neon">Selected_AI_Works</span>
              <div className="flex-1 h-px bg-brand-neon/10" />
            </div>
            
            <div className="relative group -mx-6 px-6">
              <div className="flex gap-6 overflow-x-auto pb-6 snap-x no-scrollbar">
                {RESUME_DATA.projects.map((p, i) => (
                  <div key={i} className="min-w-[280px] md:min-w-[380px] snap-start">
                    <div className="tech-card group border-white/5 hover:border-brand-neon/40 flex flex-col justify-between h-full">
                       <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold uppercase transition-colors group-hover:text-brand-neon leading-tight">{p.title}</h3>
                            <BrainCircuit size={16} className="text-brand-neon/30 p-1 border border-brand-neon/20 rounded shrink-0" />
                          </div>
                          <p className="text-[11px] text-white/50 font-light leading-relaxed line-clamp-3">{p.description}</p>
                       </div>
                       <div className="mt-6 flex flex-col gap-4">
                          <div className="flex flex-wrap gap-2">
                            {p.tags.map(t => <span key={t} className="text-[8px] font-mono text-white/20 border border-white/5 px-2 py-0.5 rounded">#{t}</span>)}
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
                  </div>
                ))}
                
                {/* More Projects Hint */}
                <div className="min-w-[180px] snap-start">
                  <div className="tech-card h-full flex flex-col items-center justify-center border-dashed border-white/10 bg-white/[0.01] opacity-50">
                    <Zap size={20} className="text-brand-neon/30 mb-2 animate-pulse" />
                    <p className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] text-center">
                      Next_Project<br/>Compiling_...
                    </p>
                  </div>
                </div>
              </div>
              {/* Fade at ends */}
              <div className="absolute right-0 top-0 bottom-6 w-12 bg-linear-to-l from-black/40 to-transparent pointer-events-none" />
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
                    <div className="text-[10px] font-mono text-white/70 uppercase mb-1">{exp.period}</div>
                  </div>
                  <div className="md:col-span-3 space-y-4 border-l border-white/5 pl-8 group-hover:border-brand-neon/20 transition-all text-left">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-neon transition-colors tracking-tight">{exp.company}</h3>
                      <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                        <span className="w-4 h-px bg-white/10" />
                        {exp.role}
                      </div>
                    </div>
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
                        {RESUME_DATA.skills.ai.map(s => <span key={s} className="px-2 py-1 bg-brand-neon/10 text-brand-neon border border-brand-neon/20 rounded uppercase">{s}</span>) || []}
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Product</div>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                        {RESUME_DATA.skills.product.map(s => <span key={s} className="border border-white/10 px-2 py-0.5 rounded italic">{s}</span>) || []}
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
                      <div className="text-[10px] font-mono text-white/70">{edu.degree} // {edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Social Impact / Volunteer Section */}
          <motion.section variants={itemVariants} className="md:col-span-12 space-y-8">
            <div className="flex items-center gap-4">
              <span className="tech-label text-brand-neon">Social_Impact_&_Volunteer</span>
              <div className="flex-1 h-px bg-brand-neon/10" />
            </div>
            
            <div className="relative group -mx-6 px-6">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                {RESUME_DATA.volunteer.map((v, i) => (
                  <VolunteerItem 
                    key={i} 
                    v={v} 
                    onOpenGallery={(photos) => setSelectedPhotos(photos)} 
                  />
                ))}
                
                {/* Scroll Hint */}
                <div className="min-w-[100px] flex items-center justify-center opacity-20 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center gap-2">
                    <ChevronRight size={20} className="text-white/40 animate-bounce-x" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] vertical-text">Scroll</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-4 w-20 bg-linear-to-l from-black/60 to-transparent pointer-events-none" />
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
    </div>
  );
}
