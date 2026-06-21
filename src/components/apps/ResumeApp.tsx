'use client';

const ResumeApp = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Resume</h1>
        <a
          href="/resume.pdf"
          download="Aryan_Kumar_Sharma_Resume.pdf"
          className="bg-primary hover:bg-primary/80 text-[#050505] font-bold px-4 py-2 rounded-lg transition-all"
        >
          Download
        </a>
      </div>
      <div className="glass p-2 rounded-xl flex-1 overflow-hidden">
        <iframe
          src="/resume.pdf#toolbar=1"
          className="w-full h-full rounded-lg"
          title="Resume"
        />
      </div>
    </div>
  );
};

export default ResumeApp;
