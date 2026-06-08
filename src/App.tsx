import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code, Rocket, BrainCircuit, Terminal, Zap, Cpu, ChevronRight, X, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { RESUME_DATA } from './constants';
import { AIResumeAssistant } from './components/AIResumeAssistant';

// Glob all images under public/assets/volunteer recursively
const allImages = import.meta.glob('/public/assets/volunteer/**/*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', { eager: true });

export function getPhotoCaption(url: string, index: number, category?: string): string {
  const lowerUrl = url.toLowerCase();
  
  // Future journey photos captions
  if (category === 'future-journey') {
    if (lowerUrl.includes('dsc07881')) {
      return '职业探索报告汇报 // 师生汇聚一堂，聆听乡村少年对于数字产业与未来职业的精彩实证调研成果分享。';
    }
    if (lowerUrl.includes('dsc08212')) {
      return '上海科学馆研学实践 // 大山深处的少年跨越山海走进现代科技殿堂，亲身体验互动前沿科技的迷人魅力。';
    }
    if (lowerUrl.includes('dsc09217')) {
      return '星空下的职业梦想 // 志愿者教师与孩子们在上海地标建筑前合影，种下一颗关于技术、职业与未来的璀璨种子。';
    }
  }

  // Digital teaching photo captions based strictly on matching filename keywords (no index fallbacks)
  if (category === 'digital-teaching') {
    if (lowerUrl.includes('peacock') || lowerUrl.includes('phoenix') || lowerUrl.includes('孔雀') || lowerUrl.includes('凤凰')) {
      return '金冠凤孔雀 // 学生手绘：天空之上的彩色凤凰，拥有孔雀般华丽的金色冠羽，羽翼流光溢彩，瑞意安详。';
    }
    if (lowerUrl.includes('blue-dragon') || lowerUrl.includes('守护龙')) {
      return '碧蓝守护龙 // 学生手绘：一只碧蓝色的西方巨龙盘踞在山峦之上，怀抱着散发微光的金色魔能宝珠。';
    }
    if (lowerUrl.includes('butterfly-rabbit') || lowerUrl.includes('蝴蝶兔')) {
      return '雪晶蝶翼白兔 // 学生手绘：拥有七彩斑斓蝴蝶翅膀的白色毛茸茸小仙兔，飞向天际中的奇妙糖果大城堡。';
    }
    if (lowerUrl.includes('lava-dragon') || lowerUrl.includes('岩浆龙')) {
      return '火山裂岩烈火巨龙 // 学生手绘：周身裂缝中流淌着滚烫熔岩的黑色炎龙，正在发光的深渊熔岩裂隙中熟睡。';
    }
    if (lowerUrl.includes('sleeping-rabbit') || lowerUrl.includes('沉睡兔')) {
      return '糖果城堡与守护仙子兔 // 学生手绘：一只长着彩虹翅膀的小兔子在城堡外的云朵大床里甜美沉睡，五彩缤纷。';
    }
    if (lowerUrl.includes('pegasus') || lowerUrl.includes('unicorn') || lowerUrl.includes('独角兽')) {
      return '彩虹飞天独角兽 // 学生手绘：拥有晶莹双翼与绚烂彩虹色鬃毛的圣洁独角兽，正在无垠星河中自由驰骋。';
    }
    if (lowerUrl.includes('firefox') || lowerUrl.includes('fox') || lowerUrl.includes('狐')) {
      return '萤流幽林灵狐 // 学生手绘：拖曳着如烈火般耀眼尾巴的橙色小仙狐，于静谧而深邃的神奇荧光森林中优雅穿行。';
    }
    if (lowerUrl.includes('blue-wolf') || lowerUrl.includes('wolf') || lowerUrl.includes('狼')) {
      return '星海羽翼蓝狼 // 学生手绘：长有一双绚丽神之羽翼以及多条星云尾巴的冰蓝神狼，翱翔在有流星划过的浪漫夜空中。';
    }
    if (lowerUrl.includes('lightning') || lowerUrl.includes('nine-tails')) {
      return '雷星圣羽九尾狐 // 学生手绘：纯白圣洁的九尾天狐在浩瀚星盘与闪电交织的深邃星云中傲立，威风凛凛。';
    }
  }
  
  // All other uploads do not have automatic naming and description generation
  return '';
}

const STATIC_PHOTOS: Record<string, string[]> = {
  'digital-teaching': [],
  'hui-ta': [],
  'pei-miao': [],
  'future-journey': []
};

Object.keys(allImages).forEach((key) => {
  const norm = key.replace('/public', '');
  if (key.includes('/digital-teaching/')) {
    STATIC_PHOTOS['digital-teaching'].push(norm);
  } else if (key.includes('/hui-ta/')) {
    STATIC_PHOTOS['hui-ta'].push(norm);
  } else if (key.includes('/pei-miao/')) {
    STATIC_PHOTOS['pei-miao'].push(norm);
  } else if (key.includes('/future-journey/')) {
    STATIC_PHOTOS['future-journey'].push(norm);
  }
});

function VolunteerItem({ v, photos, onOpenGallery }: { v: any, photos: string[], onOpenGallery: (category: string, title: string) => void }) {
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
        onClick={() => onOpenGallery(v.category, v.title)}
        className="tech-card border-white/5 group-hover:border-brand-neon/40 h-full flex flex-col items-start gap-4 transition-all hover:bg-white/[0.02] cursor-pointer"
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
            {photos.length > 0 ? 'Click_to_access_visual_records' : 'Cloud_records_empty_click_to_sync_...'}
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
  const [selectedCategory, setSelectedCategory] = React.useState<{ category: string, title: string } | null>(null);
  const [photosByCategory, setPhotosByCategory] = React.useState<Record<string, string[]>>({
    'digital-teaching': [],
    'hui-ta': [],
    'pei-miao': [],
    'future-journey': []
  });

  const [isUploading, setIsUploading] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const fetchPhotos = async () => {
    try {
      const categories = ['digital-teaching', 'hui-ta', 'pei-miao', 'future-journey'];
      const updated: Record<string, string[]> = { ...STATIC_PHOTOS };
      for (const cat of categories) {
        const res = await fetch(`/api/photos/${cat}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.photos)) {
            updated[cat] = data.photos;
          }
        }
      }
      setPhotosByCategory(updated);
    } catch (err) {
      console.error('Failed to fetch photos from server:', err);
    }
  };

  React.useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && selectedCategory) {
      await handleUploadFiles(e.dataTransfer.files, selectedCategory.category);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedCategory) {
      await handleUploadFiles(e.target.files, selectedCategory.category);
    }
  };

  const handleUploadFiles = async (filesList: FileList, category: string) => {
    if (filesList.length === 0) return;
    if (category === 'hui-ta') {
      setUploadStatus({ type: 'error', text: '“慧她”活动由于系统设定限制，当前已禁止上传新图片。' });
      return;
    }
    setIsUploading(true);
    setUploadStatus({ type: 'info', text: '正在同步文件流至本地志愿画册中...' });
    
    try {
      const uploadedFiles: Array<{ name: string; data: string }> = [];
      
      for (let i = 0; i < filesList.length; i++) {
        const file = filesList[i];
        
        if (!file.type.startsWith('image/')) {
          setUploadStatus({ type: 'error', text: `文件 ${file.name} 不是支持的图片格式` });
          setIsUploading(false);
          return;
        }

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        const sanitizedName = file.name.replace(/\s+/g, '_');

        uploadedFiles.push({
          name: sanitizedName,
          data: base64
        });
      }

      const res = await fetch(`/api/upload/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: uploadedFiles }),
      });

      if (res.ok) {
        setUploadStatus({ type: 'success', text: `成功将 ${uploadedFiles.length} 张原始作品存入 ${category} 库！` });
        await fetchPhotos();
        setTimeout(() => setUploadStatus(null), 5000);
      } else {
        const err = await res.json();
        setUploadStatus({ type: 'error', text: `同步失败: ${err.error || '服务器错误'}` });
        setTimeout(() => setUploadStatus(null), 5000);
      }
    } catch (err: any) {
      console.error(err);
      setUploadStatus({ type: 'error', text: `上传出错: ${err.message || err.toString()}` });
      setTimeout(() => setUploadStatus(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  const currentUrls = selectedCategory ? (photosByCategory[selectedCategory.category] || []) : [];

  return (
    <div className="min-h-screen selection:bg-brand-neon selection:text-black bg-zinc-950 relative overflow-hidden">
      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-radial-at-t from-brand-dim/20 via-transparent to-transparent" />
      </div>

      {/* Photo Wall Modal */}
      {selectedCategory && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => { setSelectedCategory(null); setUploadStatus(null); }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between items-center mb-6 bg-zinc-900/10 backdrop-blur-sm py-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse" />
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-brand-neon uppercase">Gallery_Vault_Access // {selectedCategory.title}</h3>
              </div>
              <button 
                onClick={() => { setSelectedCategory(null); setUploadStatus(null); }} 
                className="p-2 hover:bg-brand-neon hover:text-black rounded-lg transition-all border border-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sync Upload Panel */}
            {selectedCategory.category === 'hui-ta' ? (
              <div className="mb-8 border border-white/5 bg-white/[0.01] rounded-xl p-6 text-center text-white/40 font-mono text-xs flex flex-col items-center justify-center gap-2">
                <Terminal size={20} className="text-rose-500/60 animate-pulse" />
                <span>[ STATUS: UPLOAD_PROHIBITED ]</span>
                <p className="text-[10px] text-white/30 leading-relaxed max-w-lg mx-auto">
                  根据系统安全和规则设定，当前“慧她 (Hui-ta)” 县域女大学生职业咨询活动已完全停用了图片同步、上传和自动命名评估。
                </p>
              </div>
            ) : (
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`mb-8 border border-dashed rounded-xl p-6 transition-all duration-300 text-center relative overflow-hidden ${
                  dragActive 
                    ? 'border-brand-neon bg-brand-neon/[0.04]' 
                    : 'border-white/10 bg-white/[0.01] hover:border-brand-neon/20'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center py-4 space-y-3">
                    <RefreshCw className="text-brand-neon animate-spin" size={24} />
                    <p className="text-xs font-mono text-brand-neon">MEMETIC_SYNC_IN_PROGRESS_...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <ImageIcon size={28} className="text-brand-neon/60 mb-2 animate-pulse" />
                    <p className="text-xs text-white/80 font-mono mb-1">
                      [ 拖拽您的画作实地照片到此处，或 <label className="text-brand-neon hover:underline cursor-pointer">点此选取文件<input type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} /></label> ]
                    </p>
                    <p className="text-[10px] text-white/40 font-mono">支持批量上传本地照片，并在画册中直接呈现原始作品</p>
                  </div>
                )}

                {uploadStatus && (
                  <div className={`absolute inset-x-0 bottom-0 py-2 px-4 text-center font-mono text-[10px] flex items-center justify-center gap-2 transition-all ${
                    uploadStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-t border-emerald-500/20' :
                    uploadStatus.type === 'error' ? 'bg-rose-500/10 text-rose-400 border-t border-rose-500/20' :
                    'bg-brand-neon/10 text-brand-neon border-t border-brand-neon/20'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full animate-ping shrink-0 animate-fade-in" style={{ backgroundColor: 'currentColor' }} />
                    {uploadStatus.text}
                  </div>
                )}
              </div>
            )}
            
            {currentUrls.length === 0 ? (
              <div className="text-center py-12 px-6 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] max-w-xl mx-auto my-4">
                <ImageIcon size={48} className="text-brand-neon/30 mx-auto mb-4 animate-bounce" />
                <h4 className="text-white font-bold text-base mb-2">图片待同步 // PHOTO ASSETS READY FOR SYNC</h4>
                <p className="text-xs text-white/60 leading-relaxed mb-6">
                  您已经成功将 <strong>{selectedCategory.title}</strong> 专属图集与本地文件目录进行关联！
                  目前您的项目目录 <code>/public/assets/volunteer/{selectedCategory.category}/</code> 下暂未检测到实物照片。
                </p>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-left font-mono text-[10px] text-white/80 space-y-2 leading-relaxed">
                  <div className="text-brand-neon/70 font-bold uppercase mb-1">// COGNITIVE UPLOAD FLOW (如何同步使用您真实的手机画作照片)：</div>
                  <div>1. 使用本面板上方的 <strong>“本地拖拽 or 文件选取”</strong> 一键上传您手机上的画作。</div>
                  <div>2. 上传完成之后，后台将全自动扫描并将其直接保存进 <code>/public/assets/volunteer/{selectedCategory.category}/</code> 目录中。</div>
                  <div>3. 自动命名和生成描述功能当前已被停用。上传的照片将被纯净直观地呈现，不进行任何非预设描述。</div>
                </div>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {currentUrls.map((url, idx) => {
                  const caption = getPhotoCaption(url, idx, selectedCategory.category);
                  const parts = caption ? caption.split(' // ') : [];
                  const hasCaption = parts.length >= 2;
                  return (
                    <div key={idx} className="break-inside-avoid relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                      <img 
                        src={url} 
                        alt={hasCaption ? parts[0] : "Volunteer Detail"} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {hasCaption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-left">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-brand-neon font-mono uppercase tracking-wider">{parts[0]}</p>
                            <p className="text-[10px] text-white/90 leading-relaxed font-light">{parts[1]}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Coming Soon Placeholder in Modal */}
                <div className="break-inside-avoid aspect-square bg-white/[0.02] border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon size={20} className="text-white/10 mb-2" />
                  <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">More_Assets_Syncing</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 font-sans">
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
                    photos={photosByCategory[v.category] || []}
                    onOpenGallery={(category, title) => setSelectedCategory({ category, title })} 
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
