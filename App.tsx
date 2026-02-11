
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Plus, Trash2, Loader2, Check, Search, X, Share2, LogOut, User as UserIcon, Maximize2, MessageSquare, Send, ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { PdfFile, AppStatus, User, Comment } from './types';

const App: React.FC = () => {
  // State for session and library
  const [user, setUser] = useState<User | null>(null);
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  
  // App logic states
  const [namingPdf, setNamingPdf] = useState<{ base64: string, defaultName: string } | null>(null);
  const [tempName, setTempName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<PdfFile | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Comments logic
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Login states
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load: Auth and Data
  useEffect(() => {
    const savedUser = localStorage.getItem('novel_user');
    const savedFiles = localStorage.getItem('novel_library');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFiles) setPdfFiles(JSON.parse(savedFiles));
  }, []);

  // 2. Persist Data
  useEffect(() => {
    localStorage.setItem('novel_library', JSON.stringify(pdfFiles));
  }, [pdfFiles]);

  // 3. Convert base64 to Blob URL for the internal viewer
  useEffect(() => {
    if (selectedPdf) {
      try {
        const byteCharacters = atob(selectedPdf.base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        
        return () => { 
          if (url) URL.revokeObjectURL(url); 
          setPdfUrl(null); 
        };
      } catch (e) {
        console.error("Error creating PDF blob", e);
        setStatus(AppStatus.ERROR);
      }
    }
  }, [selectedPdf]);

  // Actions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = loginName.trim();
    const pass = loginPass.trim();

    if (!name || !pass) {
      setLoginError("يرجى إدخال الاسم وكلمة المرور");
      return;
    }

    const registryStr = localStorage.getItem('novel_user_registry');
    const registry = registryStr ? JSON.parse(registryStr) : {};

    if (registry[name]) {
      if (registry[name] === pass) {
        const loggedUser = { id: name, name: name };
        setUser(loggedUser);
        localStorage.setItem('novel_user', JSON.stringify(loggedUser));
        setLoginError(null);
      } else {
        setLoginError("كلمة المرور خاطئة لهذا المستخدم");
      }
    } else {
      registry[name] = pass;
      localStorage.setItem('novel_user_registry', JSON.stringify(registry));
      const newUser = { id: name, name: name };
      setUser(newUser);
      localStorage.setItem('novel_user', JSON.stringify(newUser));
      setLoginError(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('novel_user');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    setStatus(AppStatus.UPLOADING);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setNamingPdf({ base64, defaultName: file.name.replace('.pdf', '') });
      setTempName(file.name.replace('.pdf', ''));
      setStatus(AppStatus.IDLE);
    };
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const savePdf = () => {
    if (!namingPdf || !user) return;
    const newPdf: PdfFile = {
      id: Math.random().toString(36).substring(2, 9),
      name: tempName || namingPdf.defaultName,
      base64: namingPdf.base64,
      ownerId: user.id,
      ownerName: user.name,
      comments: []
    };
    setPdfFiles(prev => [...prev, newPdf]);
    setNamingPdf(null);
    setTempName('');
  };

  const addComment = (pdfId: string) => {
    if (!newCommentText.trim() || !user) return;
    const comment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name,
      text: newCommentText,
      timestamp: Date.now()
    };
    setPdfFiles(prev => prev.map(pdf => 
      pdf.id === pdfId ? { ...pdf, comments: [...(pdf.comments || []), comment] } : pdf
    ));
    setNewCommentText('');
  };

  const confirmDelete = (id: string) => {
    setPdfFiles(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
  };

  const toggleFullScreen = () => {
    if (!modalRef.current) return;
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch(err => {
        console.error(`Error full-screen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const filteredFiles = useMemo(() => {
    return pdfFiles.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [pdfFiles, searchTerm]);

  if (!user) {
    return (
      <div className="flex h-screen bg-white items-center justify-center p-6">
        <div className="w-full max-w-sm p-10 border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-5xl font-black mb-10 tracking-tighter text-center">روايتي</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-black mb-2 tracking-widest text-zinc-400">الاسم المستعار</label>
              <input type="text" value={loginName} onChange={e => setLoginName(e.target.value)}
                className="w-full border-b-[3px] border-black p-3 outline-none font-bold text-lg bg-transparent" placeholder="من أنت؟" required />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-black mb-2 tracking-widest text-zinc-400">كلمة المرور</label>
              <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)}
                className={`w-full border-b-[3px] p-3 outline-none font-bold text-lg bg-transparent ${loginError ? 'border-red-500' : 'border-black'}`} placeholder="••••••" required />
            </div>
            <button className="w-full bg-black text-white py-5 font-black hover:bg-zinc-800 transition-all uppercase tracking-[0.2em] mt-4">دخول / تسجيل</button>
            {loginError && <p className="text-red-500 text-center text-xs font-black animate-pulse">{loginError}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-black overflow-hidden font-sans">
      <header className="p-8 flex justify-between items-start border-b-[1px] border-zinc-100">
        <div className="flex flex-col gap-3">
           <div className="flex items-center gap-6">
              <button onClick={() => setShowSearch(!showSearch)} className="p-1 hover:scale-125 transition-transform" title="بحث">
                <Search size={32} strokeWidth={3}/>
              </button>
              {showSearch && (
                <input autoFocus type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن رواية..." className="border-b-[3px] border-black p-2 text-2xl outline-none w-48 sm:w-80 font-bold bg-transparent"/>
              )}
           </div>
           <div className="flex items-center gap-4 text-xs font-black px-1 uppercase tracking-tighter text-zinc-400">
              <div className="flex items-center gap-2">
                <UserIcon size={16}/>
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="hover:text-black transition-colors p-1" title="خروج"><LogOut size={16}/></button>
           </div>
        </div>
        <h1 className="text-7xl font-black tracking-tighter select-none cursor-default hover:italic transition-all">روايتي</h1>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 relative overflow-y-auto px-12 pt-12">
          <div className="space-y-24 pb-60">
            {filteredFiles.map((pdf) => (
              <div key={pdf.id} className="relative flex flex-col max-w-5xl py-4 border-r-[4px] border-black pr-10 group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col flex-1 cursor-pointer" onClick={() => setSelectedPdf(pdf)}>
                    <span className="text-5xl font-black tracking-tight group-hover:italic transition-all leading-none">{pdf.name}</span>
                    <div className="flex items-center gap-3 mt-3">
                        <FileText size={14} className="text-zinc-400"/>
                        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">المؤلف: {pdf.ownerName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                    <button onClick={() => setSelectedPdf(pdf)} title="فتح للقراءة" className="p-2 hover:bg-black hover:text-white transition-colors"><Maximize2 size={28}/></button>
                    <button onClick={() => { 
                      const shareUrl = `${window.location.origin}${window.location.pathname}#share=${pdf.base64}&name=${encodeURIComponent(pdf.name)}`;
                      navigator.clipboard.writeText(shareUrl).then(() => { setCopyFeedback(pdf.id); setTimeout(() => setCopyFeedback(null), 2000); });
                    }} title="مشاركة" className="p-2 hover:bg-black hover:text-white transition-colors"><Share2 size={28}/></button>
                    {pdf.ownerId === user.id && (
                      <button onClick={() => setDeleteConfirmId(pdf.id)} title="حذف" className="p-2 text-zinc-300 hover:text-red-600 transition-colors"><Trash2 size={28}/></button>
                    )}
                  </div>
                  {copyFeedback === pdf.id && <span className="text-[10px] font-black text-black animate-bounce absolute -top-8 right-0">تم نسخ الرابط!</span>}
                </div>

                {/* Toggle Visibility for Comments */}
                <div className="mt-6 flex items-center gap-4">
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === pdf.id ? null : pdf.id)}
                    className="flex items-center gap-3 bg-zinc-100 px-4 py-2 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded shadow-sm"
                  >
                    {activeCommentId === pdf.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    <span>{activeCommentId === pdf.id ? 'إخفاء الآراء' : `عرض الآراء (${pdf.comments?.length || 0})`}</span>
                    <MessageSquare size={16}/>
                  </button>
                </div>

                {/* Display Comments directly below when toggled */}
                {activeCommentId === pdf.id && (
                  <div className="mt-8 border-t-[1px] border-zinc-100 pt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="space-y-8">
                      <div className="max-h-80 overflow-y-auto space-y-6 pr-6 custom-scrollbar">
                        {pdf.comments?.map(c => (
                          <div key={c.id} className="text-sm pb-4 border-b border-zinc-50 last:border-0">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-black text-[9px] uppercase text-zinc-300 tracking-widest">{c.userName}</span>
                              <span className="text-[8px] text-zinc-300">{new Date(c.timestamp).toLocaleDateString()}</span>
                            </div>
                            <p className="font-medium text-zinc-800 leading-relaxed text-base">{c.text}</p>
                          </div>
                        ))}
                        {(!pdf.comments || pdf.comments.length === 0) && (
                          <div className="flex flex-col items-center py-6 opacity-30">
                            <MessageSquare size={32} className="mb-2"/>
                            <p className="text-sm italic font-bold">لا توجد نقاشات بعد.</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-4 items-center border-t-[2px] border-black pt-6">
                        <input 
                          type="text" 
                          value={newCommentText} 
                          onChange={e => setNewCommentText(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addComment(pdf.id)}
                          placeholder="اكتب رأيك هنا..."
                          className="flex-1 text-lg outline-none bg-zinc-50 p-5 font-bold transition-all focus:bg-white"
                        />
                        <button onClick={() => addComment(pdf.id)} className="p-5 bg-black text-white hover:bg-zinc-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                          <Send size={24}/>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {pdfFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 opacity-10">
                <p className="text-7xl font-black italic tracking-tighter">الفراغ...</p>
                <p className="text-2xl font-bold mt-6 tracking-widest">ارفع أول رواية PDF لتبدأ الرحلة</p>
              </div>
            )}
          </div>
        </main>
        
        {/* Floating Upload Button */}
        <div className="absolute bottom-12 left-12 z-20">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all active:scale-95 bg-white border-[6px] border-black rounded-full p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <Plus size={64} strokeWidth={4} />
          </button>
        </div>
      </div>

      {/* Internal PDF Reader Modal - Optimized Viewer */}
      {selectedPdf && (
        <div ref={modalRef} className="fixed inset-0 z-[200] bg-black flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-10 py-6 text-white bg-black border-b border-white/20">
            <div className="flex flex-col max-w-2xl">
              <h2 className="text-3xl font-black truncate tracking-tighter italic">{selectedPdf.name}</h2>
              <span className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">المؤلف: {selectedPdf.ownerName}</span>
            </div>
            <div className="flex items-center gap-8">
              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:text-black border border-white/40 rounded transition-all text-sm font-black uppercase tracking-widest">
                  <ExternalLink size={20}/>
                  <span>فتح خارجي</span>
                </a>
              )}
              <button onClick={toggleFullScreen} className="p-2 hover:bg-white/20 rounded transition-colors" title="ملئ الشاشة"><Maximize2 size={28}/></button>
              <button onClick={() => setSelectedPdf(null)} className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors" title="إغلاق"><X size={32}/></button>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900 flex justify-center overflow-hidden">
            {!pdfUrl ? (
              <div className="flex flex-col items-center justify-center text-white gap-6">
                <Loader2 className="animate-spin" size={64} strokeWidth={3}/>
                <span className="font-black uppercase tracking-[0.4em] text-sm animate-pulse">جاري تحضير القارئ...</span>
              </div>
            ) : (
              <iframe 
                src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`} 
                className="w-full max-w-6xl h-full border-none bg-white shadow-[0px_0px_40px_rgba(0,0,0,0.5)]"
                title={selectedPdf.name}
              />
            )}
          </div>
          <div className="bg-black py-3 px-10 border-t border-white/10 text-center flex justify-between items-center">
             <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">فاتح ملفات "روايتي" - تم تمكين العرض المباشر</span>
             <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">{selectedPdf.name}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[210] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white p-12 max-w-md w-full border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
               <Trash2 size={40}/>
            </div>
            <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none">تأكيد الإزالة</h3>
            <p className="text-zinc-500 font-bold mb-10 text-lg">هل أنت متأكد من حذف هذه الرواية نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => confirmDelete(deleteConfirmId)}
                className="w-full bg-red-600 text-white font-black py-5 text-xl hover:bg-red-700 transition-all uppercase tracking-widest active:translate-y-1"
              >
                تأكيد الحذف
              </button>
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="w-full bg-zinc-100 text-black font-black py-5 text-xl hover:bg-zinc-200 transition-all uppercase tracking-widest"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Naming Modal */}
      {namingPdf && (
        <div className="fixed inset-0 z-[220] bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-3xl text-center">
            <h2 className="text-[11px] uppercase tracking-[0.5em] mb-12 opacity-30 font-black">تسمية العمل الجديد</h2>
            <div className="relative flex flex-col items-center">
              <input 
                autoFocus 
                type="text" 
                value={tempName} 
                onChange={e => setTempName(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && savePdf()}
                className="w-full py-10 text-7xl font-black outline-none bg-transparent text-center border-b-[10px] border-black" 
                placeholder="اسم الرواية..."
              />
              <div className="flex gap-6 mt-16 w-full">
                <button onClick={savePdf} className="flex-[2] bg-black text-white py-8 text-2xl font-black hover:bg-zinc-800 transition-all uppercase tracking-widest flex items-center justify-center gap-4 active:scale-95">
                   <Check size={40} strokeWidth={5}/>
                   حفظ الكتاب
                </button>
                <button onClick={() => setNamingPdf(null)} className="flex-1 bg-zinc-100 text-zinc-400 py-8 text-2xl font-black hover:bg-zinc-200 transition-all active:scale-95">
                   إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === AppStatus.UPLOADING && (
        <div className="fixed inset-0 z-[300] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-6">
          <Loader2 className="animate-spin text-black" size={80} strokeWidth={4} />
          <span className="font-black uppercase tracking-[0.5em] text-lg">جاري الرفع والمعالجة...</span>
        </div>
      )}
    </div>
  );
};

export default App;
