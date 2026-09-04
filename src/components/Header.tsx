import React from 'react';
import { ShieldCheck, RotateCcw, Database } from 'lucide-react';

interface HeaderProps {
  storageOptIn: boolean;
  onToggleStorageOptIn: (enabled: boolean) => void;
  onClearData: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  storageOptIn,
  onToggleStorageOptIn,
  onClearData,
  answeredCount,
  totalQuestions,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo-lamsep.jpg" 
            alt="LamSep Logo" 
            className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 border border-slate-700 shadow-sm flex-shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white sm:text-xl">
                LamSep <span className="text-blue-400 font-medium text-sm sm:text-base">— Khảo sát Thực thi SME</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Client-Only Privacy
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Mô hình 6 Trụ cột (PSO) & Khung chuyển đổi KUBA® Change Commitment
            </p>
          </div>
        </div>

        {/* Action Controls & Progress summary */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400">Tiến độ:</span>
            <span className="font-semibold text-blue-400">{answeredCount}/{totalQuestions} câu</span>
            <span className="text-slate-500">({Math.round((answeredCount / totalQuestions) * 100)}%)</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Storage Opt-in toggle */}
            <button
              onClick={() => onToggleStorageOptIn(!storageOptIn)}
              title={storageOptIn ? "Đang bật lưu bản nháp trên máy này (bấm để tắt)" : "Đang tắt lưu trữ (bấm để bật lưu bản nháp)"}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
                storageOptIn 
                  ? 'bg-blue-900/60 text-blue-300 border-blue-600 hover:bg-blue-800/80' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{storageOptIn ? 'Lưu nháp: BẬT' : 'Lưu nháp: TẮT'}</span>
            </button>

            {/* Clear Data Button */}
            <button
              onClick={onClearData}
              title="Xóa toàn bộ câu trả lời để làm lại từ đầu"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Làm lại</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
