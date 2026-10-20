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
import { CoupleProfile, LoveLetterData, TimelineMilestone } from '../types';

export const coupleData: CoupleProfile = {
  husband: {
    fullName: 'Trần Đan Thanh',
    shortName: 'Đan Thanh',
    birthDate: '01/12/1992',
    rawBirth: '1992-12-01',
    zodiac: 'Nhân Mã (Sagittarius)',
    description: 'Ấm áp, chu đáo, người luôn kề vai sát cánh cùng vợ trong mọi dự án lớn nhỏ và vun đắp cho tổ ấm gia đình.',
  },
  wife: {
    fullName: 'Đồng Thị Ngọc Yến',
    shortName: 'Ngọc Yến',
    birthDate: '28/01/1995',
    rawBirth: '1995-01-28',
    zodiac: 'Bảo Bình (Aquarius)',
    description: 'Dịu dàng, tài năng, tốt nghiệp Thạc sĩ MBA, người đồng hành tuyệt vời trong kinh doanh SOUL STYLE và cuộc sống.',
  },
};

export const initialMilestones: TimelineMilestone[] = [
  {
    id: 'meet',
    order: 1,
    title: 'Lần Đầu Gặp Gỡ & Ngày Bắt Đầu Yêu',
    subtitle: 'Khoảnh khắc định mệnh gắn kết hai tâm hồn',
    date: '30 Tháng 09, 2022',
    rawDate: '2022-09-30',
    category: 'meet',
    tag: 'Khởi đầu tình yêu',
    location: 'E-coffee Trung Nguyên Củ Chi',
    quote: 'Có những cuộc gặp gỡ trong đời không phải ngẫu nhiên, mà là sự sắp đặt diệu kỳ của định mệnh.',
    description:
      'Ngày 30/09/2022, giữa nhịp sống hối hả, hai ánh mắt đã tìm thấy nhau bên ly cà phê tại quán E-coffee Trung Nguyên Củ Chi. Một lời chào ngập ngừng, một nụ cười ấm áp đã mở ra một chương mới ngọt ngào nhất trong cuộc đời của Đan Thanh và Ngọc Yến.',
    defaultImage: firstMeetImg,
    highlights: [
      'Ly cà phê gặp gỡ đầu tiên tại E-coffee Trung Nguyên Củ Chi',
      'Những buổi trò chuyện thâu đêm suốt sáng thấu hiểu tâm hồn',
      'Cái nắm tay ấm áp đầu tiên đánh dấu lời yêu',
    ],
    romanticDetails:
      'Kể từ ngày 30/09/2022 bên ly cà phê tại E-coffee Trung Nguyên Củ Chi, thế giới của anh từ một bức tranh đơn sắc đã bừng sáng rực rỡ bởi sự xuất hiện của em — cô gái có nụ cười tỏa nắng Đồng Thị Ngọc Yến.',
    emotionId: 'spark',
  },
  {
    id: 'hagiang',
    order: 2,
    title: 'Hành Trình Khám Phá Hà Giang Kỳ Vĩ',
    subtitle: 'Chuyến đi xa đầu tiên cùng nhau trên miền cao nguyên đá',
    date: '29 Tháng 12, 2022',
    rawDate: '2022-12-29',
    category: 'travel',
    tag: 'Chuyến đi xa đầu tiên',
    location: 'Hà Giang — Mã Pí Lèng & Dòng sông Nho Quế',
    quote: 'Băng qua gió lạnh và đèo cao, chỉ cần bàn tay em luôn trong túi áo anh, cả chặng đường đều hóa ấm áp.',
    description:
      'Ngày 29/12/2022, hai đứa mình cùng nhau vượt hàng nghìn cây số để đặt chân đến cực Bắc Tổ quốc. Ngắm dòng Nho Quế xanh như ngọc bích từ đỉnh Mã Pí Lèng, cùng sẻ chia chiếc khăn len ấm giữa cái rét mùa đông miền núi — chuyến đi xa đầu tiên ghi dấu tình yêu son trẻ bền chặt.',
    defaultImage: haGiangImg,
    highlights: [
      'Chinh phục đèo Mã Pí Lèng hùng vĩ giữa sương mây',
      'Cùng ngắm dòng Nho Quế xanh ngọc bích huyền thoại',
      'Cảm giác ấm áp lạ kỳ khi cùng nhau vượt qua cái lạnh phương Bắc',
    ],
    romanticDetails:
      'Chuyến đi Hà Giang đã chứng minh hai đứa mình sinh ra là để đồng hành cùng nhau trên mọi nẻo đường đời.',
    emotionId: 'passion',
  },
  {
    id: 'banhtet',
    order: 3,
    title: 'Gói Bánh Tét Đầu Tiên Tại Nhà Vợ',
    subtitle: 'Kỷ niệm 30 Tết ấm cúng bên bếp lửa gia đình',
    date: '21 Tháng 01, 2023',
    rawDate: '2023-01-21',
    category: 'family',
    tag: 'Kỷ niệm gia đình',
    location: 'Tư gia ấm cúng nhà vợ',
    quote: 'Mùi lá chuối thơm nồng, ánh lửa bập bùng và nụ cười em đã biến nơi đây thành mái nhà thân thương từ lúc nào.',
    description:
      'Ngày 21/01/2023 (ngày 30 Tết Quý Mão), Đan Thanh lần đầu tiên sang nhà ba mẹ Ngọc Yến đón Tết và được học cách gói bánh tét truyền thống. Những đòn bánh còn vụng về nhưng đong đầy tình cảm chân thành, tiếng cười rộn rã bên nồi bánh sôi sùng sục thâu đêm.',
    defaultImage: banhTetImg,
    highlights: [
      'Lần đầu tiên học xếp lá chuối, buộc lạt gói đòn bánh tét',
      'Không khí ấm áp sum vầy bên ba mẹ và gia đình vợ',
      'Cảm nhận sâu sắc sự gắn kết và tình thân ruột thịt',
    ],
    romanticDetails:
      'Khoảnh khắc ngồi bên nồi bánh tét cùng em và gia đình, anh biết mình đã thực sự tìm thấy bến đỗ bình yên của cuộc đời.',
    emotionId: 'warmth',
  },
  {
    id: 'engagement',
    order: 4,
    title: 'Lễ Đính Hôn (Đám Hỏi) Tự Tay Chuẩn Bị 100%',
    subtitle: 'Lời hẹn ước trăm năm đong đầy tâm huyết của hai đứa',
    date: '30 Tháng 05, 2023',
    rawDate: '2023-05-30',
    category: 'engagement',
    tag: 'Đính ước trăm năm',
    location: 'Tư gia hai họ đầm ấm',
    quote: 'Từng cánh hoa, từng mâm tráp đều do hai đứa tự tay chuẩn bị với trọn vẹn sự nâng niu và thành kính.',
    description:
      'Ngày 30/05/2023, ngày lễ đính hôn chính thức diễn ra. Điểm đặc biệt và tự hào nhất là toàn bộ khâu chuẩn bị từ mâm quả, trang trí gia tiên, trang phục đến từng chi tiết nhỏ đều do chính Đan Thanh & Ngọc Yến cùng nhau tự tay lên kế hoạch và hoàn thiện 100%. Chiếc nhẫn đính ước trao tay trước sự xúc động của đấng sinh thành.',
    defaultImage: engagementImg,
    highlights: [
      'Tự tay chuẩn bị và decor 100% mọi nghi thức lễ đính hôn',
      'Trao nhau chiếc nhẫn đính hôn đong đầy lời hứa tương lai',
      'Nụ cười rạng rỡ và những cái ôm siết chặt chúc phúc từ hai họ',
    ],
    romanticDetails:
      'Ngày 30/05/2023 đánh dấu sự trưởng thành của tình yêu chúng mình: đồng lòng từ suy nghĩ đến hành động.',
    emotionId: 'sacred',
  },
  {
    id: 'vungtau_family',
    order: 5,
    title: 'Du Lịch Biển Vũng Tàu Cùng Gia Đình Vợ',
    subtitle: 'Gắn kết tình thân thắm thiết bên tiếng sóng vỗ',
    date: '15 Tháng 06, 2023',
    rawDate: '2023-06-15',
    category: 'family',
    tag: 'Du lịch đại gia đình',
    location: 'Thành phố biển Vũng Tàu',
    quote: 'Hạnh phúc nhân đôi khi thấy những người thân yêu nhất của em cũng là gia đình ruột thịt của anh.',
    description:
      'Chỉ nửa tháng sau lễ đính hôn, ngày 15/06/2023, cả hai cùng đại gia đình bên vợ có chuyến nghỉ dưỡng tuyệt vời tại Vũng Tàu. Cùng gia đình dạo biển chiều hoàng hôn, thưởng thức hải sản tươi ngon và lưu giữ những tấm ảnh kỷ niệm đầy ắp tiếng cười.',
    defaultImage: travelVungTauImg,
    highlights: [
      'Chuyến nghỉ dưỡng biển ngập tràn niềm vui cùng đại gia đình vợ',
      'Những bữa tiệc hải sản ấm cúng, chuyện trò rôm rả',
      'Sự hòa nhập tự nhiên, gắn bó thân thương như ruột thịt',
    ],
    romanticDetails:
      'Nhìn thấy nụ cười hạnh phúc của em bên ba mẹ và người thân, lòng anh ngập tràn sự bình yên và tự hào.',
    emotionId: 'warmth',
  },
  {
    id: 'soul_style',
    order: 6,
    title: 'Khai Trương Cửa Hàng Thời Trang "SOUL STYLE"',
    subtitle: 'Đứa con tinh thần đầu tiên — Tự tay chuẩn bị và dựng xây 100%',
    date: '24 Tháng 11, 2023',
    rawDate: '2023-11-24',
    category: 'business',
    tag: 'Đứa con tinh thần',
    location: 'Shop thời trang nữ SOUL STYLE',
    quote: 'SOUL STYLE không chỉ là thời trang, mà là ước mơ và tâm huyết của hai vợ chồng cùng chung tay xây đắp.',
    description:
      'Ngày 24/11/2023, shop quần áo nữ SOUL STYLE chính thức mở cửa. Từ việc lên ý tưởng tên thương hiệu, chọn từng cây sào, sơn từng mảng tường, thiết kế logo pastel đến tuyển chọn từng mẫu váy áo — hai vợ chồng tự tay làm 100%. Đây là cột mốc lớn đánh dấu sự đồng lòng của hai đứa trên con đường sự nghiệp.',
    defaultImage: soulStyleImg,
    highlights: [
      'Hai vợ chồng tự tay thiết kế, decor và chuẩn bị 100% cửa hàng',
      'Thương hiệu thời trang nữ SOUL STYLE ra đời với bao kỳ vọng',
      'Kề vai sát cánh từ những ngày đầu khởi nghiệp đầy nhiệt huyết',
    ],
    romanticDetails:
      'Có em làm bạn đồng hành, mọi vất vả của những đêm thức muộn chuẩn bị shop SOUL STYLE đều trở thành những kỷ niệm ngọt ngào nhất.',
    emotionId: 'perseverance',
  },
  {
    id: 'nam_du',
    order: 7,
    title: 'Chuyến Đi Khám Phá Đảo Nam Du',
    subtitle: 'Đắm mình trong làn nước xanh ngọc và thiên nhiên hoang sơ',
    date: '10 Tháng 01, 2024',
    rawDate: '2024-01-10',
    category: 'travel',
    tag: 'Biển đảo thanh xuân',
    location: 'Quần đảo Nam Du (Kiên Giang)',
    quote: 'Dưới bầu trời Nam Du trong vắt, anh nhận ra biển đẹp đến mấy cũng không bằng ánh mắt trong veo của em.',
    description:
      'Đầu năm mới 2024, hai đứa cùng lên tàu ra quần đảo Nam Du. Làn nước xanh ngọc bích phẳng lặng, rặng dừa nghiêng bóng và bãi cát trắng mịn như tách biệt khỏi thế giới xô bồ. Hai đứa cùng nhau ngắm hoàng hôn buông xuống mặt biển bao la.',
    defaultImage: namDuImg,
    highlights: [
      'Khám phá thiên đường đảo hoang sơ với làn nước trong vắt',
      'Dạo bước dưới rặng dừa xanh ngát bên bờ cát trắng',
      'Những bức ảnh kỷ niệm thanh xuân rực rỡ và lãng mạn',
    ],
    romanticDetails:
      'Mỗi chuyến đi cùng em là một lần anh được yêu lại từ đầu, say đắm và trọn vẹn hơn.',
    emotionId: 'passion',
  },
  {
    id: 'vungtau_statue',
    order: 8,
    title: 'Vũng Tàu Riêng Hai Đứa & Cùng Cố Tô Tượng Chung',
    subtitle: 'Khoảnh khắc giản dị, cùng nhau nắn nót từng gam màu kỷ niệm',
    date: '18 Tháng 01, 2024',
    rawDate: '2024-01-18',
    category: 'travel',
    tag: 'Kỷ niệm ngọt ngào',
    location: 'Bờ biển Vũng Tàu yên bình',
    quote: 'Tình yêu không cần phô trương, chỉ cần hai đứa cùng ngồi bên nhau, tô chung một bức tượng nhỏ cũng đủ thấy trọn vẹn cả thế gian.',
    description:
      'Ngày 18/01/2024, một chuyến đi Vũng Tàu ngẫu hứng chỉ riêng hai đứa. Buổi chiều mát mẻ, cả hai ngồi cạnh nhau bên quán ven biển, cùng cầm cọ nắn nót pha màu tô chung một bức tượng thạch cao. Từng vệt màu lem, từng nụ cười trêu đùa đã tạo nên kỷ niệm giản dị mà ấm áp đến nao lòng.',
    defaultImage: vungTauStatueImg,
    highlights: [
      'Chuyến đi riêng tư ngập tràn những khoảnh khắc dịu dàng',
      'Cùng nhau phối màu, kiên nhẫn nắn nót tô chung bức tượng kỷ niệm',
      'Lắng nghe tiếng sóng vỗ và tâm sự về ngày cưới sắp đến',
    ],
    romanticDetails:
      'Bức tượng nhỏ năm ấy vẫn là minh chứng cho sự kiên nhẫn, hòa hợp và sẻ chia từng điều nhỏ bé nhất giữa anh và em.',
    emotionId: 'simplicity',
  },
  {
    id: 'wedding_nhatbinh',
    order: 9,
    title: 'Lễ Thành Hôn — Cổ Phục Hoàng Triều Áo Nhật Bình',
    subtitle: 'Nghi thức cung đình quý tộc sang trọng — Tự tay chuẩn bị 100% từ A-Z',
    date: '18 Tháng 05, 2024',
    rawDate: '2024-05-18',
    category: 'wedding',
    tag: 'Hoàng Kim Hôn Lễ',
    location: 'Lễ đường trang trọng & Cổ phục Hoàng Triều',
    quote: 'Khoác lên mình tà áo Nhật Bình cung đình quý phái, hôm nay anh cưới người con gái anh yêu nhất về làm vợ.',
    description:
      'Ngày 18/05/2024 — Ngày trọng đại nhất cuộc đời. Hôn lễ của Đan Thanh & Ngọc Yến tỏa sáng với phong cách Cổ phục Việt Nam triều Nguyễn: cô dâu kiêu sa trong tà Áo Nhật Bình gấm đỏ son thêu phượng hoàng, hoa sen và dải ngũ hành uyển chuyển, đầu đội mấn hoàng gia quý phái; chú rể đĩnh đạc trong bộ Áo Tấc tôn nghiêm nho nhã. Toàn bộ từ kịch bản, trang phục cổ phục, hoa cầm tay, thiệp cưới đến từng tiểu tiết đều do hai vợ chồng tự tay chuẩn bị 100%, tạo nên dấu ấn hoàng gia thanh tao, sang trọng và đậm đà hồn cốt văn hóa dân tộc.',
    defaultImage: royalNhatBinhImg,
    highlights: [
      'Cô dâu kiêu sa trong Cổ phục Áo Nhật Bình hoàng cung gấm thêu phượng hoàng & mấn vàng quý tộc',
      'Chú rể đĩnh đạc trong tà Áo Tấc tôn nghiêm, mang đậm phong thái trượng phu quân tử',
      'Toàn bộ lễ phục, kịch bản, sính lễ và bài trí đều do hai vợ chồng tự tay chuẩn bị 100%',
      'Chính thức về chung một nhà trong ngày trọng đại đầy tôn nghiêm, thiêng liêng và viên mãn',
    ],
    romanticDetails:
      'Khoảnh khắc nhìn thấy em bước vào lễ đường kiêu sa, đoan trang trong tà áo Nhật Bình son đỏ triều Nguyễn ngày 18/05/2024, từng giọt nước mắt hạnh phúc của anh đã rơi vì biết mình là người đàn ông may mắn và hạnh phúc nhất trần đời.',
    emotionId: 'sacred',
  },
  {
    id: 'anniversary_cruise',
    order: 10,
    title: 'Kỷ Niệm Ngày Quen Nhau — Ăn Tối Trên Du Thuyền Sông',
    subtitle: 'Bữa tối lãng mạn lướt trên làn sóng nước êm đềm',
    date: '30 Tháng 09, 2024',
    rawDate: '2024-09-30',
    category: 'anniversary',
    tag: 'Kỷ niệm tình yêu',
    location: 'Du thuyền thưởng ngoạn trên sông',
    quote: 'Hai năm nhìn lại, dòng sông có thể chảy mãi không ngừng, nhưng tình yêu anh dành cho em chỉ ngày một sâu sắc hơn.',
    description:
      'Ngày 30/09/2024, kỷ niệm tròn 2 năm ngày hai người chính thức yêu nhau. Cả hai đã có một buổi tối đáng nhớ trên con tàu du ngoạn chạy trên sông. Dưới ánh nến lung linh, tiếng nhạc violin du dương và làn gió sông mát rượi, hai vợ chồng cùng nâng ly chúc mừng chặng đường đã qua và mở ra những trang mới.',
    defaultImage: cruiseDinnerImg,
    highlights: [
      'Bữa tối kỷ niệm lãng mạn dưới ánh nến trên con tàu lướt sóng',
      'Ngắm ánh đèn thành phố lung linh phản chiếu trên mặt nước',
      'Cùng nhìn lại hành trình từ lúc quen nhau đến khi thành vợ thành chồng',
    ],
    romanticDetails:
      'Dưới màn đêm lung linh ánh đèn của con tàu trên sông, anh siết chặt tay em và thầm cảm ơn vì chúng mình đã luôn có nhau.',
    emotionId: 'simplicity',
  },
  {
    id: 'dalat_trip',
    order: 11,
    title: 'Du Lịch Đà Lạt Kỷ Niệm 1 Năm Ngày Cưới',
    subtitle: 'Thành phố sương mờ và những đồi thông reo trong gió',
    date: '17 Tháng 05, 2025',
    rawDate: '2025-05-17',
    category: 'travel',
    tag: 'Kỷ niệm ngày cưới',
    location: 'Đà Lạt — Thành phố ngàn hoa',
    quote: 'Đà Lạt se lạnh nhưng lòng ngập tràn hơi ấm, vì bên cạnh luôn có bờ vai em tựa vào.',
    description:
      'Ngày 17/05/2025, đúng dịp kỷ niệm tròn 1 năm ngày cưới, Đan Thanh và Ngọc Yến cùng nhau lên Đà Lạt. Thưởng thức tách cà phê sớm ngắm mây luồn qua thung lũng thông, dạo bước trên những con dốc hoa dã quỳ và ghi lại những khoảnh khắc bình yên không vướng bận âu lo.',
    defaultImage: daLatTripImg,
    highlights: [
      'Chuyến đi kỷ niệm tròn 1 năm ngày về chung một mái nhà',
      'Đón bình minh se lạnh và hoàng hôn tím biếc nơi đồi thông',
      'Tận hưởng những giây phút lắng đọng ngọt ngào của đôi vợ chồng trẻ',
    ],
    romanticDetails:
      'Một năm hôn nhân trôi qua thật êm đềm, và chuyến đi Đà Lạt như lời khẳng định tình yêu của chúng mình luôn nở hoa tươi mới.',
    emotionId: 'eternity',
  },
  {
    id: 'graduation_cantho',
    order: 12,
    title: 'Cùng Tốt Nghiệp Văn Bằng 2 Ngôn Ngữ Anh Tại ĐH Cần Thơ',
    subtitle: 'Đồng hành trên giảng đường tri thức — Cùng nhận tấm bằng cử nhân',
    date: '31 Tháng 05, 2025',
    rawDate: '2025-05-31',
    category: 'education',
    tag: 'Trưởng thành cùng nhau',
    location: 'Trường Đại học Cần Thơ',
    quote: 'Yêu nhau không chỉ là nhìn về một hướng, mà là cùng nhau nỗ lực tiến bước để trở thành phiên bản tốt hơn mỗi ngày.',
    description:
      'Ngày 31/05/2025, hai vợ chồng cùng khoác lên mình chiếc áo cử nhân tại Đại học Cần Thơ, chính thức tốt nghiệp Văn bằng 2 ngành Ngôn ngữ Anh. Những buổi tối cùng nhau ôn bài, làm đồ án sau giờ làm việc bận rộn đã được đền đáp bằng hai tấm bằng xuất sắc cầm trên tay.',
    defaultImage: graduationDegreeImg,
    highlights: [
      'Hai vợ chồng cùng đồng hành trên giảng đường Đại học Cần Thơ',
      'Khoảnh khắc tự hào cùng tung mũ cử nhân Văn bằng 2 Ngôn ngữ Anh',
      'Minh chứng cho sự nỗ lực và chia sẻ mọi mục tiêu lớn của cuộc sống',
    ],
    romanticDetails:
      'Cảm giác tuyệt vời nhất là được nắm tay người bạn đời cùng bước lên bục vinh danh nhận bằng tốt nghiệp.',
    emotionId: 'pride',
  },
  {
    id: 'graduation_mba',
    order: 13,
    title: 'Vợ Ngọc Yến Tốt Nghiệp Thạc Sĩ Quản Trị Kinh Doanh (MBA)',
    subtitle: 'Niềm tự hào to lớn của gia đình — Người phụ nữ tài năng',
    date: '09 Tháng 08, 2025',
    rawDate: '2025-08-09',
    category: 'education',
    tag: 'Niềm tự hào gia đình',
    location: 'Lễ trao bằng Thạc sĩ trang trọng',
    quote: 'Em là nguồn cảm hứng lớn nhất của anh. Nhìn em rạng rỡ nhận bằng Thạc sĩ MBA, anh tự hào vô cùng về người vợ của mình.',
    description:
      'Ngày 09/08/2025, Đồng Thị Ngọc Yến xuất sắc nhận bằng Thạc sĩ Quản trị Kinh doanh (MBA). Vừa quán xuyến kinh doanh SOUL STYLE, vừa chu toàn gia đình nhỏ và xuất sắc hoàn thành học vị Thạc sĩ — Ngọc Yến chính là niềm kiêu hãnh lớn nhất của Đan Thanh.',
    defaultImage: wifeMbaGradImg,
    highlights: [
      'Ngọc Yến chính thức vinh quy nhận bằng Thạc sĩ Quản trị Kinh doanh (MBA)',
      'Đan Thanh gửi trao bó hoa tươi thắm và cái ôm đầy tự hào tới vợ',
      'Đánh dấu bước ngoặt lớn về tri thức và năng lực quản trị cho tương lai',
    ],
    romanticDetails:
      'Chúc mừng Thạc sĩ của lòng anh! Cảm ơn em vì đã luôn nỗ lực không ngừng và là người vợ tuyệt vời nhất.',
    emotionId: 'pride',
  },
  {
    id: 'metro_ride',
    order: 14,
    title: 'Cùng Nhau Trải Nghiệm Đi Tàu Điện Metro',
    subtitle: 'Những chuyến đi đời thường — Cùng nhau đi khắp mọi nẻo đường',
    date: '21 Tháng 02, 2026',
    rawDate: '2026-02-21',
    category: 'lifestyle',
    tag: 'Hạnh phúc giản dị',
    location: 'Tuyến Metro hiện đại',
    quote: 'Dù là xe máy, du thuyền hay tàu điện hiện đại, chỉ cần người ngồi cạnh là em, mọi hành trình đều hóa tuyệt vời.',
    description:
      'Ngày 21/02/2026, hai vợ chồng cùng nhau thử trải nghiệm chuyến tàu điện Metro hiện đại. Dạo bước qua những ga tàu ánh sáng, ngắm nhìn phố thị qua ô cửa kính lướt nhanh và nắm chặt tay nhau giữa dòng người tấp nập. Hạnh phúc đôi khi chỉ giản đơn là được đồng hành trong từng nhịp thở đời thường.',
    defaultImage: metroRideImg,
    highlights: [
      'Trải nghiệm khám phá tuyến tàu điện Metro hiện đại cùng nhau',
      'Những bức hình check-in ngập tràn năng lượng tươi trẻ',
      'Cam kết cùng nhau đi khắp mọi cung đường của tương lai',
    ],
    romanticDetails:
      'Điểm đến không nằm ở ga tàu cuối cùng, mà nằm ở bàn tay em luôn đặt gọn trong tay anh trên mọi chuyến đi.',
    emotionId: 'simplicity',
  },
];

export const initialLoveLetter: LoveLetterData = {
  title: 'Gửi Em, Đồng Thị Ngọc Yến — Tình Yêu To Lớn Nhất Đời Anh',
  sender: 'Trần Đan Thanh (01/12/1992)',
  receiver: 'Đồng Thị Ngọc Yến (28/01/1995)',
  dateStr: 'Món quà bất ngờ dành tặng vợ yêu',
  paragraphs: [
    'Ngọc Yến yêu dấu của anh,',
    'Nhìn lại hành trình từ ngày 30/09/2022 khi hai đứa mình chính thức quen nhau, anh luôn cảm ơn duyên số vì đã đưa em đến bên anh. Chúng mình đã cùng nhau đi qua bao nhiêu cột mốc kỳ diệu: từ chuyến đi Hà Giang buốt giá mà ấm áp, lần đầu về nhà em học gói bánh tét đón Tết, đến ngày đính hôn 30/05/2023 và đặc biệt là ngày cưới 18/05/2024 trong trang phục Áo Nhật Bình truyền thống mà hai đứa tự tay chuẩn bị 100%.',
    'Rồi chúng mình cùng nhau khai trương đứa con tinh thần SOUL STYLE — từ từng góc kệ, ánh đèn đến từng chiếc váy áo do hai đứa tự tay chuẩn bị từ A-Z. Chúng mình cùng nhau đi Nam Du, đi Vũng Tàu tô tượng, ăn tối trên con tàu chạy trên sông, đi Đà Lạt, và cùng nhau nhận bằng Cử nhân Văn bằng 2 Ngôn ngữ Anh tại Đại học Cần Thơ, chứng kiến em xuất sắc tốt nghiệp Thạc sĩ MBA.',
    'Trang web nhỏ này anh tự tay làm để lưu giữ trọn vẹn 14 cột mốc thanh xuân vô giá của vợ chồng mình. Dù thời gian có trôi đi bao lâu, anh vẫn luôn là chỗ dựa vững chãi nhất, luôn tự hào và yêu thương em hơn mỗi ngày!',
  ],
  signature: 'Chồng của em — Đan Thanh ❤️',
  postscript: 'P.S: Cảm ơn em vì đã đồng hành và cùng anh chuẩn bị 100% cho mọi giấc mơ của chúng mình!',
};
