'use client';

import { useState } from 'react';
import { FileText, Folder, Award, ChevronLeft } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: any;
  path?: string;
  children?: FileItem[];
}

const rootFiles: FileItem[] = [
  { name: 'about', type: 'folder', icon: Folder },
  { name: 'projects', type: 'folder', icon: Folder },
  { name: 'skills', type: 'folder', icon: Folder },
  {
    name: 'certificates',
    type: 'folder',
    icon: Award,
    children: [
      { name: 'HACKATHON_WINNER.pdf', type: 'file', icon: FileText, path: '/certificates/HACKATHON_WINNER.pdf' },
      { name: 'DevOps.pdf', type: 'file', icon: FileText, path: '/certificates/DevOps.pdf' },
    ],
  },
  { name: 'resume.pdf', type: 'file', icon: FileText, path: '/resume.pdf' },
];

const FileExplorerApp = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const getCurrentFiles = (): FileItem[] => {
    let files = rootFiles;
    for (const part of currentPath) {
      const folder = files.find((f) => f.name === part && f.type === 'folder');
      if (folder?.children) {
        files = folder.children;
      }
    }
    return files;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name]);
      setSelectedFile(null);
    } else if (file.type === 'file' && file.path) {
      window.open(file.path, '_blank');
    }
    setSelectedFile(file);
  };

  const goBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
    setSelectedFile(null);
  };

  const currentFiles = getCurrentFiles();
  const fullPath = '/home/aryan/' + currentPath.join('/');

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {currentPath.length > 0 && (
            <button
              onClick={goBack}
              className="glass p-2 rounded-lg hover:bg-primary/10 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
          )}
          <h1 className="text-3xl font-bold text-primary">File Explorer</h1>
        </div>
        {selectedFile?.type === 'file' && selectedFile?.path && (
          <a
            href={selectedFile.path}
            download
            className="bg-primary hover:bg-primary/80 text-[#050505] font-bold px-4 py-2 rounded-lg transition-all"
          >
            Download
          </a>
        )}
      </div>
      <div className="glass p-4 rounded-xl flex-1 overflow-auto">
        <div className="text-secondary mb-4 font-mono text-sm">{fullPath}</div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentFiles.map((file, i) => (
            <div
              key={i}
              onClick={() => handleFileClick(file)}
              className={`p-4 rounded-xl text-center cursor-pointer transition-all border-2 ${
                selectedFile?.name === file.name
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent hover:border-primary/50 hover:bg-[#111]'
              }`}
            >
              <file.icon className="w-10 h-10 mx-auto mb-2 text-primary" />
              <div className="text-xs text-gray-300 break-all">{file.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileExplorerApp;
