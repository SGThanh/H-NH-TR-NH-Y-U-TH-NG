import firstMeetImg from '@/src/assets/images/first_meet_pastel_1789745228911.jpg';
import haGiangImg from '@/src/assets/images/ha_giang_trip_1789746662190.jpg';
import banhTetImg from '@/src/assets/images/tet_banh_tet_1789746676955.jpg';
import engagementImg from '@/src/assets/images/engagement_pastel_1789745255602.jpg';
import travelVungTauImg from '@/src/assets/images/travel_couple_pastel_1789745241940.jpg';
import soulStyleImg from '@/src/assets/images/soul_style_shop_1789746645444.jpg';
import namDuImg from '@/src/assets/images/nam_du_island_1789746690597.jpg';
import weddingNhatBinhImg from '@/src/assets/images/nhat_binh_wedding_1789746628199.jpg';
import royalNhatBinhImg from '@/src/assets/images/nhat_binh_royal_ceremony_1789747892237.jpg';
import cruiseDinnerImg from '@/src/assets/images/cruise_dinner_1789746706993.jpg';
import graduationDegreeImg from '@/src/assets/images/graduation_degree_1789746757029.jpg';
import vungTauStatueImg from '@/src/assets/images/vungtau_paint_statue_1789747255754.jpg';
import daLatTripImg from '@/src/assets/images/dalat_couple_trip_1789747271101.jpg';
import wifeMbaGradImg from '@/src/assets/images/wife_mba_grad_1789747287265.jpg';
import metroRideImg from '@/src/assets/images/metro_couple_ride_1789747302097.jpg';
import weddingPastelImg from '@/src/assets/images/wedding_pastel_1789745270221.jpg';

export interface GalleryAsset {
  id: string;
  name: string;
  tag: string;
  src: string;
  recommendedForMilestoneId?: string;
  description: string;
}

export const builtInGalleryAssets: GalleryAsset[] = [
  {
    id: 'asset-meet-coffee',
    name: 'Ly cà phê gặp gỡ đầu tiên tại E-coffee Trung Nguyên Củ Chi',
    tag: 'Cà phê & Lời yêu',
    src: firstMeetImg,
    recommendedForMilestoneId: 'meet',
    description: 'Khoảnh khắc ngày 30/09/2022 bên ly cà phê tại E-coffee Trung Nguyên Củ Chi bắt đầu cho lời hẹn ước trăm năm giữa Đan Thanh & Ngọc Yến.',
  },
  {
    id: 'asset-hagiang',
    name: 'Khám phá Hà Giang & Đèo Mã Pí Lèng',
    tag: 'Du lịch phương Bắc',
    src: haGiangImg,
    recommendedForMilestoneId: 'hagiang',
    description: 'Chuyến đi xa đầu tiên cùng nhau ngắm dòng Nho Quế ngọc bích ngày 29/12/2022.',
  },
  {
    id: 'asset-banhtet',
    name: 'Gói bánh tét 30 Tết tại nhà vợ',
    tag: 'Tết sum vầy',
    src: banhTetImg,
    recommendedForMilestoneId: 'banhtet',
    description: 'Đan Thanh học gói bánh tét truyền thống bên bếp lửa nhà vợ ngày 21/01/2023.',
  },
  {
    id: 'asset-engagement',
    name: 'Lễ Đính Hôn (Đám Hỏi) tự chuẩn bị 100%',
    tag: 'Đính ước trăm năm',
    src: engagementImg,
    recommendedForMilestoneId: 'engagement',
    description: 'Trao nhẫn đính hôn ngày 30/05/2023, hai đứa tự tay bài trí và chuẩn bị mọi khâu.',
  },
  {
    id: 'asset-vungtau-family',
    name: 'Du lịch Vũng Tàu cùng gia đình vợ',
    tag: 'Tình thân gia đình',
    src: travelVungTauImg,
    recommendedForMilestoneId: 'vungtau_family',
    description: 'Chuyến nghỉ dưỡng biển ấm áp cùng đại gia đình vợ ngày 15/06/2023.',
  },
  {
    id: 'asset-soul-style',
    name: 'Khai trương Shop SOUL STYLE',
    tag: 'Khởi nghiệp chung đôi',
    src: soulStyleImg,
    recommendedForMilestoneId: 'soul_style',
    description: 'Đứa con tinh thần đầu tiên do hai vợ chồng tự tay thiết kế và dựng xây 100% ngày 24/11/2023.',
  },
  {
    id: 'asset-nam-du',
    name: 'Thiên đường Đảo Nam Du (Kiên Giang)',
    tag: 'Biển đảo thanh xuân',
    src: namDuImg,
    recommendedForMilestoneId: 'nam_du',
    description: 'Làn nước xanh ngọc bích và rặng dừa thơ mộng ngày 10/01/2024.',
  },
  {
    id: 'asset-vungtau-statue',
    name: 'Vũng Tàu riêng hai đứa & Tô chung tượng',
    tag: 'Giản dị ngọt ngào',
    src: vungTauStatueImg,
    recommendedForMilestoneId: 'vungtau_statue',
    description: 'Cùng nắn nót pha màu tô chung bức tượng thạch cao bên bờ biển ngày 18/01/2024.',
  },
  {
    id: 'asset-royal-nhatbinh',
    name: 'Lễ Thành Hôn — Cổ Phục Hoàng Triều Áo Nhật Bình',
    tag: 'Hoàng Kim Hôn Lễ',
    src: royalNhatBinhImg,
    recommendedForMilestoneId: 'wedding_nhatbinh',
    description: 'Cô dâu Áo Nhật Bình son đỏ mấn vàng, Chú rể Áo Tấc tôn nghiêm ngày 18/05/2024.',
  },
  {
    id: 'asset-nhatbinh-hall',
    name: 'Lễ đường Cổ Phục Nhật Bình Triều Nguyễn',
    tag: 'Nghi thức hoàng cung',
    src: weddingNhatBinhImg,
    recommendedForMilestoneId: 'wedding_nhatbinh',
    description: 'Ghi dấu ngày cưới thiêng liêng đượm hồn văn hóa hoàng gia Việt Nam.',
  },
  {
    id: 'asset-cruise',
    name: 'Kỷ niệm 2 năm — Ăn tối du thuyền trên sông',
    tag: 'Bữa tối lãng mạn',
    src: cruiseDinnerImg,
    recommendedForMilestoneId: 'anniversary_cruise',
    description: 'Ánh nến lung linh và tiếng sóng vỗ êm đềm ngày 30/09/2024.',
  },
  {
    id: 'asset-dalat',
    name: 'Du lịch Đà Lạt kỷ niệm 1 năm ngày cưới',
    tag: 'Phố núi sương mờ',
    src: daLatTripImg,
    recommendedForMilestoneId: 'dalat_trip',
    description: 'Đồi thông reo và nắng ấm cao nguyên ngày 17/05/2025.',
  },
  {
    id: 'asset-graduation-cantho',
    name: 'Cùng Tốt nghiệp VB2 Ngôn ngữ Anh ĐH Cần Thơ',
    tag: 'Đồng hành tri thức',
    src: graduationDegreeImg,
    recommendedForMilestoneId: 'graduation_cantho',
    description: 'Hai vợ chồng cùng nhận bằng Cử nhân Ngôn ngữ Anh ngày 31/05/2025.',
  },
  {
    id: 'asset-wife-mba',
    name: 'Vợ Ngọc Yến tốt nghiệp Thạc sĩ MBA',
    tag: 'Niềm tự hào to lớn',
    src: wifeMbaGradImg,
    recommendedForMilestoneId: 'graduation_mba',
    description: 'Đồng Thị Ngọc Yến xuất sắc nhận bằng Thạc sĩ Quản trị Kinh doanh ngày 09/08/2025.',
  },
  {
    id: 'asset-metro',
    name: 'Cùng nhau trải nghiệm đi tàu điện Metro',
    tag: 'Hạnh phúc đời thường',
    src: metroRideImg,
    recommendedForMilestoneId: 'metro_ride',
    description: 'Khám phá chuyến tàu điện hiện đại và tay trong tay ngày 21/02/2026.',
  },
  {
    id: 'asset-wedding-pastel',
    name: 'Ảnh cưới Pastel thanh nhã & ngọt ngào',
    tag: 'Hạnh phúc trăm năm',
    src: weddingPastelImg,
    description: 'Khoảnh khắc sánh đôi tinh khôi, ghi dấu tình yêu vĩnh cửu.',
  },
];
