import React, { useState } from 'react';
import { OnboardingProfile } from '../types/survey';
import { Building2, User, CheckCircle2 } from 'lucide-react';

interface OnboardingModalProps {
  initialProfile: OnboardingProfile | null;
  onSaveProfile: (profile: OnboardingProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  onSaveProfile,
}) => {
  const [profile, setProfile] = useState<OnboardingProfile>(initialProfile || {
    fullName: '',
    role: '',
    department: '',
    experienceYears: '',
    gender: 'Nam',
    companyName: '',
    industry: '',
    companySize: '',
    establishedYears: '3 - 5 năm',
    annualRevenue: '',
    consent: false,
  });

  const requiredFields = [
    profile.role,
    profile.department,
    profile.experienceYears,
    profile.industry,
    profile.companySize,
    profile.annualRevenue,
  ];
  const isProfileComplete = requiredFields.every((value) => value.trim().length > 0) && profile.consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isProfileComplete) return;
    onSaveProfile(profile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-4 sm:p-6 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-400/30 text-blue-300 shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold">Thông Tin Đơn Vị & Người Làm Khảo Sát</h2>
              <p className="text-[11px] sm:text-xs text-blue-200">
                Phục vụ cá nhân hóa báo cáo tư vấn và phân tích đối chuẩn thực thi SME
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body & Sticky Footer */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 overscroll-contain">
          {/* Section 1: Thông tin người làm khảo sát */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3 border-b pb-2">
              <User className="w-4 h-4 text-blue-600" /> 1. Thông tin Người làm khảo sát
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Họ và tên (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn A"
                  value={profile.fullName}
                  onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email (để nhận báo cáo PDF)</label>
                <input
                  type="email"
                  placeholder="VD: ceo@congty.com"
                  value={profile.email || ''}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Chức vụ trong tổ chức *</label>
                <select
                  value={profile.role}
                  onChange={e => setProfile({ ...profile, role: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn chức vụ</option>
                  <option value="Chủ tịch HĐQT / Founder">Chủ tịch HĐQT / Founder</option>
                  <option value="CEO / Tổng Giám Đốc">CEO / Tổng Giám Đốc</option>
                  <option value="Giám đốc Khối / Phó Tổng Giám Đốc">Giám đốc Khối / Phó Tổng Giám Đốc</option>
                  <option value="Trưởng phòng / Quản lý cấp trung">Trưởng phòng / Quản lý cấp trung</option>
                  <option value="Chuyên viên / Nhân viên">Chuyên viên / Nhân viên</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Phòng ban / Bộ phận *</label>
                <select
                  value={profile.department}
                  onChange={e => setProfile({ ...profile, department: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn phòng ban / bộ phận</option>
                  <option value="Ban Điều Hành">Ban Điều Hành</option>
                  <option value="Kinh Doanh & Bán Hàng">Kinh Doanh & Bán Hàng</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Vận Hành & Sản Xuất">Vận Hành & Sản Xuất</option>
                  <option value="Nhân Sự & Đào Tạo">Nhân Sự & Đào Tạo</option>
                  <option value="Tài Chính - Kế Toán">Tài Chính - Kế Toán</option>
                  <option value="Công Nghệ / R&D">Công Nghệ / R&D</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Số năm kinh nghiệm *</label>
                <select
                  value={profile.experienceYears}
                  onChange={e => setProfile({ ...profile, experienceYears: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn số năm kinh nghiệm</option>
                  <option value="Dưới 2 năm">Dưới 2 năm</option>
                  <option value="2 - 5 năm">2 - 5 năm</option>
                  <option value="5 - 10 năm">5 - 10 năm</option>
                  <option value="Trên 10 năm">Trên 10 năm</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Thông tin doanh nghiệp */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3 border-b pb-2">
              <Building2 className="w-4 h-4 text-blue-600" /> 2. Thông tin Doanh nghiệp khảo sát
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tên Doanh nghiệp (Tùy chọn)</label>
                <input
                  type="text"
                  placeholder="VD: Công ty TNHH ABC"
                  value={profile.companyName}
                  onChange={e => setProfile({ ...profile, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Ngành nghề kinh doanh chính *</label>
                <select
                  value={profile.industry}
                  onChange={e => setProfile({ ...profile, industry: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn ngành nghề</option>
                  <option value="Sản xuất / Chế tạo">Sản xuất / Chế tạo</option>
                  <option value="Bán lẻ / Phân phối / Thương mại">Bán lẻ / Phân phối / Thương mại</option>
                  <option value="Dịch vụ / Tư vấn / Đào tạo">Dịch vụ / Tư vấn / Đào tạo</option>
                  <option value="F&B / Nhà hàng / Khách sạn">F&B / Nhà hàng / Khách sạn</option>
                  <option value="Xây dựng / Bất động sản">Xây dựng / Bất động sản</option>
                  <option value="Công nghệ / Phần mềm / Viễn thông">Công nghệ / Phần mềm / Viễn thông</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Quy mô nhân sự *</label>
                <select
                  value={profile.companySize}
                  onChange={e => setProfile({ ...profile, companySize: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn quy mô nhân sự</option>
                  <option value="Dưới 10 nhân sự">Dưới 10 nhân sự</option>
                  <option value="10 - 20 nhân sự">10 - 20 nhân sự</option>
                  <option value="20 - 50 nhân sự">20 - 50 nhân sự</option>
                  <option value="50 - 100 nhân sự">50 - 100 nhân sự</option>
                  <option value="100 - 300 nhân sự">100 - 300 nhân sự</option>
                  <option value="Trên 300 nhân sự">Trên 300 nhân sự</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Doanh thu trung bình năm *</label>
                <select
                  value={profile.annualRevenue}
                  onChange={e => setProfile({ ...profile, annualRevenue: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="" disabled>Chọn doanh thu</option>
                  <option value="Dưới 5 tỷ VNĐ">Dưới 5 tỷ VNĐ</option>
                  <option value="5 - 10 tỷ VNĐ">5 - 10 tỷ VNĐ</option>
                  <option value="10 - 50 tỷ VNĐ">10 - 50 tỷ VNĐ</option>
                  <option value="50 - 200 tỷ VNĐ">50 - 200 tỷ VNĐ</option>
                  <option value="Trên 200 tỷ VNĐ">Trên 200 tỷ VNĐ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Consent */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={profile.consent}
              onChange={e => setProfile({ ...profile, consent: e.target.checked })}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
              <span className="font-semibold text-slate-800">Cam kết bảo mật:</span> Dữ liệu được xử lý 100% cục bộ trên trình duyệt của bạn (Zero Server Egress). Tôi đồng ý sử dụng dữ liệu này để xuất báo cáo tư vấn thực thi.
            </label>
          </div>
        </div>

        {/* Modal Sticky Footer - Always visible on screen */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            {isProfileComplete ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Đã hoàn tất thông tin, bạn có thể bắt đầu!
              </span>
            ) : (
              <span>* Vui lòng điền đủ các mục có dấu (*) và tích đồng ý cam kết bảo mật</span>
            )}
          </div>
          <button
            type="submit"
            disabled={!isProfileComplete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Bắt đầu làm Khảo sát
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
