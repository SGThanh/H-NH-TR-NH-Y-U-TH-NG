import React, { useState } from 'react';
import {
  Github,
  Rocket,
  Download,
  Upload,
  Copy,
  Check,
  ExternalLink,
  Code,
  Terminal,
  ShieldCheck,
  Sparkles,
  X,
  FileJson,
  FolderArchive,
  RefreshCw,
  Heart,
} from 'lucide-react';
import { LoveLetterData } from '../types';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImages: Record<string, string>;
  letterData: LoveLetterData;
  onImportBackup?: (data: { customImages?: Record<string, string>; letterData?: LoveLetterData }) => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({
  isOpen,
  onClose,
  customImages,
  letterData,
  onImportBackup,
}) => {
  const [activeTab, setActiveTab] = useState<'deploy' | 'backup' | 'local'>('deploy');
  const [githubUsername, setGithubUsername] = useState('SGThanh');
  const [repoName, setRepoName] = useState('danthanh-ngocyen');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const sanitizedUser = githubUsername.trim() || '<username>';
  const sanitizedRepo = repoName.trim() || '<ten-repo>';

  const gitCommands = [
    `git remote add origin https://github.com/${sanitizedUser}/${sanitizedRepo}.git`,
    `git branch -M main`,
    `git push -u origin main`,
  ].join('\n');

  const githubPagesUrl = `https://${sanitizedUser}.github.io/${sanitizedRepo}/`;

  const customPhotoCount = Object.keys(customImages).length;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const handleDownloadBackupJson = () => {
    const backupData = {
      project: 'Đan Thanh & Ngọc Yến — Kỷ Niệm Tình Yêu',
      exportedAt: new Date().toISOString(),
      customImages,
      letterData,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danthanh_ngocyen_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (onImportBackup) {
          onImportBackup({
            customImages: parsed.customImages || {},
            letterData: parsed.letterData,
          });
          alert('Khôi phục dữ liệu ảnh & kỷ niệm thành công!');
        }
      } catch {
        alert('File JSON không hợp lệ. Vui lòng kiểm tra lại!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#D4AF37]/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-[#ECE3D8] bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#852233] text-[#FAF4EA] flex items-center justify-center shadow-xs border border-[#D4AF37]/40">
              <Github className="w-5 h-5 text-[#FFD700]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif-cormorant font-bold text-[#2A2321]">
                  Xuất Dự Án &amp; Chạy Trên GitHub Pages
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#852233]/10 text-[#852233]">
                  Miễn phí 100%
                </span>
              </div>
              <p className="text-xs text-[#7A7067]">
                Đưa trang web kỷ niệm của Đan Thanh &amp; Ngọc Yến lên internet vĩnh viễn với GitHub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#7A7067] hover:text-[#2A2321] transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-8 pt-3 bg-white/50 border-b border-[#EAE1D5] flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'deploy'
                ? 'border-[#852233] text-[#852233]'
                : 'border-transparent text-[#786E65] hover:text-[#241E1C]'
            }`}
          >
            <Rocket className="w-4 h-4 text-[#852233]" />
            <span>3 Bước Đưa Lên GitHub Pages</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-[#852233] text-[#852233]'
                : 'border-transparent text-[#786E65] hover:text-[#241E1C]'
            }`}
          >
            <Download className="w-4 h-4 text-[#852233]" />
            <span>Sao Lưu Ảnh &amp; Dữ Liệu ({customPhotoCount} ảnh)</span>
          </button>

          <button
            onClick={() => setActiveTab('local')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'local'
                ? 'border-[#852233] text-[#852233]'
                : 'border-transparent text-[#786E65] hover:text-[#241E1C]'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#852233]" />
            <span>Chạy Máy Tính (Localhost)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* TAB 1: GITHUB PAGES DEPLOY */}
          {activeTab === 'deploy' && (
            <div className="space-y-6">
              {/* Ready banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 leading-relaxed">
                  <strong className="font-bold text-emerald-950 block text-sm mb-0.5">
                    Mã nguồn đã được cấu hình tối ưu 100% cho GitHub Pages
                  </strong>
                  Hệ thống đã tự động cấu hình đường dẫn tương đối (<code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">base: './'</code>), tự động tải ảnh gốc và tạo sẵn tệp <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code> để GitHub tự động xây dựng và đăng website online ngay khi bạn đẩy mã nguồn lên.
                </div>
              </div>

              {/* Input for user repo customizer */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#852233] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Điền thông tin GitHub của bạn để tạo lệnh chuẩn xác</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#7A7067] font-medium mb-1">
                      Tên tài khoản GitHub (Username):
                    </label>
                    <input
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="ví dụ: danthanh"
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] font-mono text-xs focus:outline-none focus:border-[#852233]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#7A7067] font-medium mb-1">
                      Tên Repository muốn đặt:
                    </label>
                    <input
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder="ví dụ: ky-niem-tinh-yeu"
                      className="w-full px-3 py-2 rounded-xl border border-[#D5C9B8] bg-[#FAF8F5] font-mono text-xs focus:outline-none focus:border-[#852233]"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Download Zip banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FAF0DC] to-[#F5E6CC] border border-[#D4AF37]/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FolderArchive className="w-5 h-5 text-[#852233]" />
                    <h5 className="font-bold text-sm text-[#241E1C]">
                      Tải trọn bộ mã nguồn đã nén sẵn (.ZIP)
                    </h5>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#852233] text-white">
                      Đầy đủ ảnh &amp; Git
                    </span>
                  </div>
                  <p className="text-xs text-[#5A481B]">
                    Bao gồm toàn bộ mã nguồn, ảnh kỷ niệm và thiết lập sẵn cho kho chứa <strong>SGThanh/danthanh-ngocyen</strong>.
                  </p>
                </div>
                <a
                  href="./danthanh-ngocyen-source.zip"
                  download="danthanh-ngocyen-source.zip"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#852233] hover:bg-[#701A29] text-[#FAF4EA] text-xs font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 text-[#FFD700]" />
                  <span>Tải file ZIP về máy</span>
                </a>
              </div>

              {/* 3 Steps */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DAD0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#852233] text-white flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <h5 className="font-bold text-sm text-[#241E1C]">
                        Tạo Repository mới trên GitHub
                      </h5>
                    </div>
                    <a
                      href="https://github.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#852233]/10 text-[#852233] hover:bg-[#852233] hover:text-white transition-all text-xs font-semibold"
                    >
                      <span>Mở github.com/new</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-[#6B6158] leading-relaxed">
                    Đặt tên kho chứa là <code className="font-mono font-bold text-[#852233]">{sanitizedRepo}</code>. Chọn <strong>Public</strong> và <u>không</u> tích chọn "Add a README file" (vì dự án đã có sẵn).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DAD0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#852233] text-white flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <h5 className="font-bold text-sm text-[#241E1C]">
                        Đẩy mã nguồn lên GitHub (Terminal / Command Prompt)
                      </h5>
                    </div>
                    <button
                      onClick={() => handleCopy(gitCommands, 'git-push')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EC] hover:bg-[#F3ECE1] text-[#852233] border border-[#D4AF37]/50 transition-all text-xs font-semibold"
                    >
                      {copiedKey === 'git-push' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép lệnh</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <pre className="p-3.5 rounded-xl bg-[#1E1E1E] text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                      {gitCommands}
                    </pre>
                  </div>
                  <p className="text-[11px] text-[#7A7067]">
                    💡 Mã nguồn đã được khởi tạo sẵn git và commit đầy đủ ảnh kỷ niệm. Chỉ cần dán các lệnh trên vào terminal thư mục dự án!
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DAD0] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#852233] text-white flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h5 className="font-bold text-sm text-[#241E1C]">
                      Bật GitHub Pages để xuất bản website tự động
                    </h5>
                  </div>
                  <div className="text-xs text-[#6B6158] space-y-2 leading-relaxed">
                    <p>
                      1. Trong trang repository trên GitHub, nhấn vào tab <strong>Settings</strong> (Cài đặt) ở thanh trên.
                    </p>
                    <p>
                      2. Ở menu cột bên trái, chọn <strong>Pages</strong>.
                    </p>
                    <p>
                      3. Tại mục <strong>Build and deployment</strong> ➔ <strong>Source</strong>: Chọn 👉 <strong>GitHub Actions</strong>.
                    </p>
                    <div className="p-3 rounded-xl bg-[#FAF0DC] border border-[#D4AF37]/40 flex items-center justify-between gap-3 text-[#5A481B]">
                      <div>
                        <span className="font-bold block">Đường dẫn website của hai bạn sẽ là:</span>
                        <a
                          href={githubPagesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[#852233] underline font-bold"
                        >
                          {githubPagesUrl}
                        </a>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#852233] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SAO LƯU & XUẤT DỮ LIỆU */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAD0] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#241E1C]">
                      Sao lưu toàn bộ ảnh tùy biến &amp; thư tình
                    </h4>
                    <p className="text-xs text-[#7A7067]">
                      Hiện tại bạn đang có <strong>{customPhotoCount} ảnh</strong> đã tùy biến và lưu trữ trong bộ nhớ trình duyệt.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadBackupJson}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#852233] hover:bg-[#701A29] text-[#FAF4EA] font-semibold text-xs shadow-xs transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải file sao lưu (.json)</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-[#EFE8DF] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#7A7067]">
                    Muốn chuyển ảnh sang máy tính khác hoặc trình duyệt mới?
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#D5C9B8] hover:bg-[#FAF6F0] text-xs font-semibold text-[#5A4F46] transition-all">
                    <Upload className="w-3.5 h-3.5 text-[#852233]" />
                    <span>Nạp file sao lưu (.json)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileImport}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Permanent code snippet */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAD0] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#852233]" />
                    <h4 className="font-bold text-sm text-[#241E1C]">
                      Mã cấu hình ảnh (Dành cho dán cố định vào source code)
                    </h4>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        `export const defaultCustomImages: Record<string, string> = ${JSON.stringify(
                          customImages,
                          null,
                          2
                        )};`,
                        'code-snippet'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4EC] text-[#852233] border border-[#D4AF37]/40 text-xs font-semibold"
                  >
                    {copiedKey === 'code-snippet' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã TS</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#7A7067]">
                  Nếu bạn muốn các ảnh bạn đã thêm hiển thị vĩnh viễn cho tất cả khách ghé thăm mà không cần dựa vào bộ nhớ máy cá nhân, bạn có thể sao chép đoạn mã này dán vào <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">src/data/timelineData.ts</code>.
                </p>
                <div className="max-h-40 overflow-y-auto rounded-xl bg-[#1E1E1E] p-3 text-emerald-400 font-mono text-[11px]">
                  <pre>{JSON.stringify(customImages, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOCAL TESTING */}
          {activeTab === 'local' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAD0] space-y-3">
                <h4 className="font-bold text-sm text-[#241E1C] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#852233]" />
                  <span>Cách chạy và kiểm tra website trên máy tính cá nhân</span>
                </h4>
                <div className="space-y-3 text-xs text-[#6B6158]">
                  <div>
                    <span className="font-semibold text-[#241E1C] block mb-1">
                      1. Cài đặt thư viện:
                    </span>
                    <pre className="p-2.5 rounded-lg bg-[#1E1E1E] text-emerald-400 font-mono text-xs">
                      npm install --legacy-peer-deps
                    </pre>
                  </div>
                  <div>
                    <span className="font-semibold text-[#241E1C] block mb-1">
                      2. Khởi chạy chế độ phát triển:
                    </span>
                    <pre className="p-2.5 rounded-lg bg-[#1E1E1E] text-emerald-400 font-mono text-xs">
                      npm run dev
                    </pre>
                    <span className="text-[11px] text-[#7A7067] block mt-1">
                      Mở trình duyệt truy cập: <code className="font-mono">http://localhost:3000</code>
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#241E1C] block mb-1">
                      3. Đóng gói kiểm tra bản phát hành tĩnh (build):
                    </span>
                    <pre className="p-2.5 rounded-lg bg-[#1E1E1E] text-emerald-400 font-mono text-xs">
                      npm run build
                    </pre>
                    <span className="text-[11px] text-[#7A7067] block mt-1">
                      Kết quả nằm trong thư mục <code className="font-mono">dist/</code>.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] border-t border-[#ECE3D8] flex items-center justify-between text-xs text-[#7A7067]">
          <div className="flex items-center gap-1.5 text-[#852233] font-serif-cormorant font-semibold text-sm">
            <Heart className="w-3.5 h-3.5 fill-[#852233]" />
            <span>Kỷ Niệm Tình Duyên Đan Thanh &amp; Ngọc Yến</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadBackupJson}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#D5C9B8] hover:bg-[#FAF4EC] text-[#5A4F46] text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file JSON ({customPhotoCount} ảnh)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-[#852233] hover:bg-[#701A29] text-[#FAF4EA] text-xs font-semibold transition-colors"
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
