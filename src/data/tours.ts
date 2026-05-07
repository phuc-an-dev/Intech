export type ItineraryRow = { period: string; theme: string; activities: string }
export type TourHighlight = { title: string; desc: string }

export type TourData = {
  slug: string
  duration: string
  name: string
  subtitle: string
  destination: string
  price: string
  groupSize: string
  certificate: string
  whyJoin: string
  highlights: TourHighlight[]
  audience: string[]
  itinerary: ItineraryRow[]
  includes: string[]
  excludes: string[]
  customization: string
  gallery?: Array<{ src?: string; alt: string; name: string }>
}

const toursEn: TourData[] = [
  {
    slug: 'vietnam-industry-culture-experience',
    duration: '7 Days',
    name: 'Vietnam Industry & Culture Experience',
    subtitle: '7-Day International Immersion Program in Ho Chi Minh City & Mekong Delta',
    destination: 'Ho Chi Minh City & Mekong Delta',
    price: 'USD 500 – 900 / participant (depending on customization and group size)',
    groupSize: '15 – 40 participants',
    certificate: 'Certificate of Completion issued by INTECH ISC.',
    whyJoin:
      'This 7-day program offers participants a unique opportunity to explore Vietnam through three key experiences: academic learning, industry exposure, and cultural immersion. Participants will gain practical insights into Vietnam\'s business environment, digital transformation, manufacturing, logistics, and local culture.',
    highlights: [
      {
        title: 'Academic Learning',
        desc: 'Explore Vietnam\'s economic growth, industrial transformation, and regional business environment through workshops and discussions.',
      },
      {
        title: 'Industry Exposure',
        desc: 'Gain practical insights through company visits, professional exchanges, and exposure to manufacturing, logistics, and business operations.',
      },
      {
        title: 'Cultural Immersion',
        desc: 'Experience Vietnam\'s culture, traditions, and local lifestyle through field trips, community interaction, and cultural activities.',
      },
    ],
    audience: ['Business & Management', 'Technology & Engineering', 'International Studies', 'Intercultural Communication'],
    itinerary: [
      { period: 'Day 1', theme: 'Arrival & Orientation', activities: 'Arrival, safety briefing, welcome dinner' },
      { period: 'Day 2', theme: 'Economy & Education', activities: 'Workshop, university visit, student exchange' },
      { period: 'Day 3', theme: 'Industry Visit', activities: 'Manufacturing/logistics company visit' },
      { period: 'Day 4', theme: 'Digital Transformation & AI', activities: 'Workshop, case studies, team presentation' },
      { period: 'Day 5', theme: 'Mekong Delta Experience', activities: 'Rural economy, agriculture, community interaction' },
      { period: 'Day 6', theme: 'Culture & Student Exchange', activities: 'Cultural landmarks, networking, local experience' },
      { period: 'Day 7', theme: 'Reflection & Closing', activities: 'Reflection session, certificate ceremony, departure' },
    ],
    includes: [
      '3-star hotel accommodation, twin sharing',
      'Daily breakfast',
      'Weekday lunches and dinners',
      'Private transportation',
      'English-speaking guide',
      'Workshops and visits',
      'Insurance',
    ],
    excludes: ['International airfare', 'Visa fees'],
    customization:
      'The program can be customized based on participants\' academic background, institutional goals, industry interests, and preferred learning outcomes.',
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
  {
    slug: 'vietnam-tech-immersion',
    duration: '10 Days',
    name: 'Vietnam Tech Immersion Program',
    subtitle: '10-Day International Learning Experience in Ho Chi Minh City & Mekong Delta',
    destination: 'Ho Chi Minh City & Mekong Delta',
    price: 'USD 1,000 – 1,800 / participant (depending on customization, accommodation options, and group size)',
    groupSize: '15 – 40 participants',
    certificate: 'Certificate of Completion issued by INTECH ISC.',
    whyJoin:
      'This 10-day international immersion program provides participants with a unique opportunity to experience Vietnam through three integrated dimensions: academic learning, industry exposure, and applied innovation. Participants will gain practical insights into Vietnam\'s digital transformation, smart manufacturing, logistics, AI, startup ecosystems, and modern industrial operations while engaging directly with universities, industry professionals, and local communities.',
    highlights: [
      {
        title: 'Academic Learning',
        desc: "Explore Vietnam's economic development, digital transformation, automation trends, and innovation ecosystem through workshops, expert talks, and interactive discussions.",
      },
      {
        title: 'Industry Exposure',
        desc: 'Gain firsthand experience through visits to smart factories, logistics hubs, technology companies, startup ecosystems, and modern industrial operations.',
      },
      {
        title: 'Applied Learning',
        desc: 'Participate in collaborative projects, case discussions, and business scenario analysis that connect academic knowledge with real industry practice.',
      },
      {
        title: 'Cultural Immersion',
        desc: "Experience Vietnam's culture, traditions, local lifestyle, and regional economy through field studies and cultural activities.",
      },
    ],
    audience: ['Business & Management', 'Technology & Engineering', 'International Studies', 'Intercultural Communication'],
    itinerary: [
      { period: 'Day 1', theme: 'Arrival & Orientation', activities: 'Arrival, welcome session, safety briefing, networking activities' },
      { period: 'Day 2', theme: 'Vietnam Economy & Digital Transformation', activities: "Workshops on Vietnam's economy, manufacturing growth, and digital transformation" },
      { period: 'Day 3', theme: 'Smart Manufacturing', activities: 'Smart factory visit, automation systems, robotics observation, operational discussions' },
      { period: 'Day 4', theme: 'AI & Data Analytics', activities: 'AI workshop, case studies, business analytics activities, group discussions' },
      { period: 'Day 5', theme: 'Logistics & Supply Chain', activities: 'Logistics hub/container terminal visit, warehouse systems, transportation operations' },
      { period: 'Day 6', theme: 'Innovation & Startup Ecosystem', activities: 'Startup hub visit, entrepreneur exchange, innovation and digital business discussions' },
      { period: 'Day 7', theme: 'Mekong Delta Field Study', activities: 'Rural economy exploration, agricultural supply chains, local business visits' },
      { period: 'Day 8', theme: 'Cultural Immersion & Community Experience', activities: 'Cultural activities, local interaction, experiential learning' },
      { period: 'Day 9', theme: 'Applied Project Presentation', activities: 'Team project preparation, presentations, industry feedback session' },
      { period: 'Day 10', theme: 'Reflection & Closing Ceremony', activities: 'Reflection session, certificate presentation, farewell and departure' },
    ],
    includes: [
      '3-star hotel accommodation, twin sharing',
      'Daily breakfast',
      'Weekday lunches and dinners',
      'Private transportation',
      'English-speaking guide',
      'Workshops and visits',
      'Insurance',
    ],
    excludes: ['International airfare', 'Visa fees'],
    customization:
      "The program can be customized based on participants' academic backgrounds, institutional objectives, industry interests, preferred learning outcomes, and duration requirements.",
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
  {
    slug: 'global-industry-leadership',
    duration: '20 Days',
    name: 'Global Industry & Leadership',
    subtitle: '20-Day International Immersion Program in Vietnam',
    destination: 'Vietnam',
    price: 'USD 2,000 – 4,000 / participant (depending on customization, accommodation options, and group size)',
    groupSize: '15 – 40 participants',
    certificate: 'Certificate of Completion issued by INTECH ISC.',
    whyJoin:
      "The Global Industry & Leadership Program is a premium international immersion experience that integrates academic learning, industry engagement, consulting-style projects, and intercultural collaboration. Participants will not only observe how modern organizations operate, but also analyze operational systems, understand strategic business challenges, and develop practical recommendations inspired by real-world environments.",
    highlights: [
      {
        title: 'Academic Learning',
        desc: 'Explore global industry trends, digital transformation, supply chains, innovation, and strategic management through workshops, discussions, and expert-led sessions.',
      },
      {
        title: 'Industry Immersion',
        desc: 'Gain practical exposure through visits to factories, logistics centers, technology firms, and innovation ecosystems across Vietnam.',
      },
      {
        title: 'Consulting Practice',
        desc: 'Participate in team-based consulting projects focused on analyzing business challenges, developing strategic recommendations, and presenting practical solutions.',
      },
      {
        title: 'Leadership Development',
        desc: 'Strengthen leadership, communication, teamwork, adaptability, and intercultural collaboration skills through experiential learning activities.',
      },
    ],
    audience: ['Business & Management', 'Technology & Engineering', 'International Studies', 'Intercultural Communication'],
    itinerary: [
      {
        period: 'Phase 1 (Day 1–5)',
        theme: 'Foundation & Global Context',
        activities: "Introduction to Vietnam's economy and industrial transformation, workshops, case studies, global supply chains, strategic discussions",
      },
      {
        period: 'Phase 2 (Day 6–12)',
        theme: 'Industry Immersion & Field Experience',
        activities: 'Company visits, operational observations, exposure to manufacturing and logistics systems, interaction with industry professionals',
      },
      {
        period: 'Phase 3 (Day 13–18)',
        theme: 'Consulting Project & Application',
        activities: 'Team-based consulting activities, business challenge analysis, mentoring sessions, strategic solution development',
      },
      {
        period: 'Phase 4 (Day 19–20)',
        theme: 'Leadership & Program Closing',
        activities: 'Leadership workshops, communication and collaboration activities, final presentations, closing ceremony',
      },
    ],
    includes: [
      '3-star hotel accommodation, twin sharing',
      'Daily breakfast',
      'Weekday lunches and dinners',
      'Private transportation',
      'English-speaking guide',
      'Workshops and visits',
      'Insurance',
    ],
    excludes: ['International airfare', 'Visa fees'],
    customization:
      "The program can be customized based on participants' academic backgrounds, institutional objectives, industry interests, preferred learning outcomes, and duration requirements.",
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
]

const toursVi: TourData[] = [
  {
    slug: 'vietnam-industry-culture-experience',
    duration: '7 Ngày',
    name: 'Vietnam Industry & Culture Experience',
    subtitle: 'Chương trình trải nghiệm quốc tế 7 ngày tại TP. HCM & Đồng bằng Sông Cửu Long',
    destination: 'TP. Hồ Chí Minh & Đồng bằng Sông Cửu Long',
    price: 'USD 500 – 900 / học viên (tùy theo tùy chỉnh và quy mô nhóm)',
    groupSize: '15 – 40 học viên',
    certificate: 'Chứng chỉ hoàn thành cấp bởi INTECH ISC.',
    whyJoin:
      'Chương trình 7 ngày mang đến cơ hội khám phá Việt Nam qua ba trải nghiệm cốt lõi: học thuật, tiếp xúc ngành công nghiệp và đắm chìm văn hóa. Học viên sẽ có cái nhìn thực tiễn về môi trường kinh doanh, chuyển đổi số, sản xuất, logistics và văn hóa địa phương của Việt Nam.',
    highlights: [
      {
        title: 'Học thuật',
        desc: 'Khám phá tăng trưởng kinh tế, chuyển đổi công nghiệp và môi trường kinh doanh khu vực của Việt Nam qua các buổi workshop và thảo luận.',
      },
      {
        title: 'Tiếp xúc ngành công nghiệp',
        desc: 'Có được cái nhìn thực tiễn qua các chuyến tham quan doanh nghiệp, giao lưu chuyên nghiệp và tiếp xúc với hoạt động sản xuất, logistics.',
      },
      {
        title: 'Đắm chìm văn hóa',
        desc: 'Trải nghiệm văn hóa, truyền thống và lối sống địa phương của Việt Nam qua các chuyến thực địa, giao lưu cộng đồng và hoạt động văn hóa.',
      },
    ],
    audience: ['Kinh doanh & Quản lý', 'Công nghệ & Kỹ thuật', 'Nghiên cứu quốc tế', 'Giao tiếp liên văn hóa'],
    itinerary: [
      { period: 'Ngày 1', theme: 'Đến nơi & Định hướng', activities: 'Nhận phòng, briefing an toàn, bữa tối chào mừng' },
      { period: 'Ngày 2', theme: 'Kinh tế & Giáo dục', activities: 'Workshop, tham quan đại học, giao lưu sinh viên' },
      { period: 'Ngày 3', theme: 'Tham quan nhà máy', activities: 'Tham quan doanh nghiệp sản xuất/logistics' },
      { period: 'Ngày 4', theme: 'Chuyển đổi số & AI', activities: 'Workshop, tình huống thực tế, thuyết trình nhóm' },
      { period: 'Ngày 5', theme: 'Trải nghiệm Đồng bằng SCL', activities: 'Kinh tế nông thôn, nông nghiệp, giao lưu cộng đồng' },
      { period: 'Ngày 6', theme: 'Văn hóa & Giao lưu sinh viên', activities: 'Các địa danh văn hóa, kết nối, trải nghiệm địa phương' },
      { period: 'Ngày 7', theme: 'Tổng kết & Bế mạc', activities: 'Phiên tổng kết, lễ trao chứng chỉ, lên đường' },
    ],
    includes: [
      'Khách sạn 3 sao, phòng đôi',
      'Bữa sáng hàng ngày',
      'Bữa trưa và tối các ngày trong tuần',
      'Xe riêng đưa đón',
      'Hướng dẫn viên tiếng Anh',
      'Workshop và các chuyến tham quan',
      'Bảo hiểm',
    ],
    excludes: ['Vé máy bay quốc tế', 'Phí visa'],
    customization:
      'Chương trình có thể được tùy chỉnh dựa trên nền tảng học thuật, mục tiêu tổ chức, lĩnh vực quan tâm và kết quả học tập mong muốn của học viên.',
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
  {
    slug: 'vietnam-tech-immersion',
    duration: '10 Ngày',
    name: 'Vietnam Tech Immersion Program',
    subtitle: 'Chương trình học tập quốc tế 10 ngày tại TP. HCM & Đồng bằng Sông Cửu Long',
    destination: 'TP. Hồ Chí Minh & Đồng bằng Sông Cửu Long',
    price: 'USD 1.000 – 1.800 / học viên (tùy theo tùy chỉnh, lựa chọn chỗ ở và quy mô nhóm)',
    groupSize: '15 – 40 học viên',
    certificate: 'Chứng chỉ hoàn thành cấp bởi INTECH ISC.',
    whyJoin:
      'Chương trình trải nghiệm quốc tế 10 ngày mang đến cơ hội trải nghiệm Việt Nam qua ba chiều kích tích hợp: học thuật, tiếp xúc ngành công nghiệp và ứng dụng đổi mới sáng tạo. Học viên sẽ có cái nhìn thực tiễn về chuyển đổi số, sản xuất thông minh, logistics, AI, hệ sinh thái startup và vận hành công nghiệp hiện đại.',
    highlights: [
      {
        title: 'Học thuật',
        desc: 'Khám phá phát triển kinh tế, xu hướng chuyển đổi số và tự động hóa của Việt Nam qua các workshop, bài nói chuyện chuyên gia và thảo luận.',
      },
      {
        title: 'Tiếp xúc ngành công nghiệp',
        desc: 'Trải nghiệm thực tế qua tham quan nhà máy thông minh, trung tâm logistics, công ty công nghệ và hệ sinh thái startup.',
      },
      {
        title: 'Học tập ứng dụng',
        desc: 'Tham gia các dự án cộng tác, thảo luận tình huống và phân tích kịch bản kinh doanh kết nối kiến thức với thực tiễn.',
      },
      {
        title: 'Đắm chìm văn hóa',
        desc: 'Trải nghiệm văn hóa, lối sống và kinh tế địa phương qua các chuyến thực địa tại TP. HCM và Đồng bằng SCL.',
      },
    ],
    audience: ['Kinh doanh & Quản lý', 'Công nghệ & Kỹ thuật', 'Nghiên cứu quốc tế', 'Giao tiếp liên văn hóa'],
    itinerary: [
      { period: 'Ngày 1', theme: 'Đến nơi & Định hướng', activities: 'Nhận phòng, phiên chào mừng, briefing an toàn, hoạt động kết nối' },
      { period: 'Ngày 2', theme: 'Kinh tế & Chuyển đổi số VN', activities: 'Workshop về kinh tế, tăng trưởng sản xuất và chuyển đổi số Việt Nam' },
      { period: 'Ngày 3', theme: 'Sản xuất thông minh', activities: 'Tham quan nhà máy thông minh, hệ thống tự động hóa, quan sát robot, thảo luận vận hành' },
      { period: 'Ngày 4', theme: 'AI & Phân tích dữ liệu', activities: 'Workshop AI, tình huống thực tế, hoạt động phân tích kinh doanh, thảo luận nhóm' },
      { period: 'Ngày 5', theme: 'Logistics & Chuỗi cung ứng', activities: 'Tham quan cảng container/trung tâm logistics, hệ thống kho bãi, vận tải' },
      { period: 'Ngày 6', theme: 'Đổi mới & Hệ sinh thái Startup', activities: 'Tham quan startup hub, giao lưu doanh nhân, thảo luận kinh doanh số' },
      { period: 'Ngày 7', theme: 'Thực địa Đồng bằng SCL', activities: 'Khám phá kinh tế nông thôn, chuỗi cung ứng nông nghiệp, tham quan doanh nghiệp địa phương' },
      { period: 'Ngày 8', theme: 'Trải nghiệm văn hóa & Cộng đồng', activities: 'Hoạt động văn hóa, giao lưu địa phương, học tập trải nghiệm' },
      { period: 'Ngày 9', theme: 'Thuyết trình dự án ứng dụng', activities: 'Chuẩn bị dự án nhóm, thuyết trình, phiên phản hồi từ ngành' },
      { period: 'Ngày 10', theme: 'Tổng kết & Lễ bế mạc', activities: 'Phiên tổng kết, trao chứng chỉ, tiễn chân và khởi hành' },
    ],
    includes: [
      'Khách sạn 3 sao, phòng đôi',
      'Bữa sáng hàng ngày',
      'Bữa trưa và tối các ngày trong tuần',
      'Xe riêng đưa đón',
      'Hướng dẫn viên tiếng Anh',
      'Workshop và các chuyến tham quan',
      'Bảo hiểm',
    ],
    excludes: ['Vé máy bay quốc tế', 'Phí visa'],
    customization:
      'Chương trình có thể được tùy chỉnh dựa trên nền tảng học thuật, mục tiêu tổ chức, lĩnh vực quan tâm, kết quả học tập mong muốn và thời gian của học viên.',
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
  {
    slug: 'global-industry-leadership',
    duration: '20 Ngày',
    name: 'Global Industry & Leadership',
    subtitle: 'Chương trình trải nghiệm quốc tế 20 ngày tại Việt Nam',
    destination: 'Việt Nam',
    price: 'USD 2.000 – 4.000 / học viên (tùy theo tùy chỉnh, lựa chọn chỗ ở và quy mô nhóm)',
    groupSize: '15 – 40 học viên',
    certificate: 'Chứng chỉ hoàn thành cấp bởi INTECH ISC.',
    whyJoin:
      'Chương trình Global Industry & Leadership là trải nghiệm trải nghiệm quốc tế cao cấp tích hợp học thuật, tiếp xúc ngành, dự án tư vấn và hợp tác đa văn hóa. Học viên không chỉ quan sát cách thức vận hành của các tổ chức hiện đại, mà còn phân tích hệ thống vận hành, hiểu thách thức kinh doanh chiến lược và phát triển các khuyến nghị thực tiễn.',
    highlights: [
      {
        title: 'Học thuật',
        desc: 'Khám phá xu hướng công nghiệp toàn cầu, chuyển đổi số, chuỗi cung ứng, đổi mới và quản lý chiến lược qua các workshop và phiên chuyên gia.',
      },
      {
        title: 'Trải nghiệm ngành công nghiệp',
        desc: 'Có được tiếp xúc thực tế qua các chuyến tham quan nhà máy, trung tâm logistics, công ty công nghệ và hệ sinh thái đổi mới khắp Việt Nam.',
      },
      {
        title: 'Thực hành tư vấn',
        desc: 'Tham gia các dự án tư vấn nhóm tập trung phân tích thách thức kinh doanh, phát triển khuyến nghị chiến lược và trình bày giải pháp thực tiễn.',
      },
      {
        title: 'Phát triển lãnh đạo',
        desc: 'Tăng cường kỹ năng lãnh đạo, giao tiếp, làm việc nhóm, thích nghi và hợp tác đa văn hóa qua các hoạt động học tập trải nghiệm.',
      },
    ],
    audience: ['Kinh doanh & Quản lý', 'Công nghệ & Kỹ thuật', 'Nghiên cứu quốc tế', 'Giao tiếp liên văn hóa'],
    itinerary: [
      {
        period: 'Giai đoạn 1 (Ngày 1–5)',
        theme: 'Nền tảng & Bối cảnh toàn cầu',
        activities: 'Giới thiệu kinh tế và chuyển đổi công nghiệp Việt Nam, workshop, tình huống thực tế, chuỗi cung ứng toàn cầu, thảo luận chiến lược',
      },
      {
        period: 'Giai đoạn 2 (Ngày 6–12)',
        theme: 'Trải nghiệm ngành & Thực địa',
        activities: 'Tham quan doanh nghiệp, quan sát vận hành, tiếp xúc hệ thống sản xuất và logistics, giao lưu chuyên gia ngành',
      },
      {
        period: 'Giai đoạn 3 (Ngày 13–18)',
        theme: 'Dự án tư vấn & Ứng dụng',
        activities: 'Hoạt động tư vấn nhóm, phân tích thách thức kinh doanh, phiên mentoring, phát triển giải pháp chiến lược',
      },
      {
        period: 'Giai đoạn 4 (Ngày 19–20)',
        theme: 'Lãnh đạo & Bế mạc chương trình',
        activities: 'Workshop lãnh đạo, hoạt động giao tiếp và cộng tác, thuyết trình cuối, lễ bế mạc',
      },
    ],
    includes: [
      'Khách sạn 3 sao, phòng đôi',
      'Bữa sáng hàng ngày',
      'Bữa trưa và tối các ngày trong tuần',
      'Xe riêng đưa đón',
      'Hướng dẫn viên tiếng Anh',
      'Workshop và các chuyến tham quan',
      'Bảo hiểm',
    ],
    excludes: ['Vé máy bay quốc tế', 'Phí visa'],
    customization:
      'Chương trình có thể được tùy chỉnh dựa trên nền tảng học thuật, mục tiêu tổ chức, lĩnh vực quan tâm, kết quả học tập mong muốn và thời gian của học viên.',
    gallery: [
      { name: 'tour-gallery-1.webp', alt: 'Program activity' },
      { name: 'tour-gallery-2.webp', alt: 'Industry visit' },
      { name: 'tour-gallery-3.webp', alt: 'Cultural experience' },
      { name: 'tour-gallery-4.webp', alt: 'Group workshop' },
      { name: 'tour-gallery-5.webp', alt: 'Campus visit' },
      { name: 'tour-gallery-6.webp', alt: 'Networking event' },
    ],
  },
]

const toursByLocale: Record<string, TourData[]> = {
  en: toursEn,
  vi: toursVi,
}

export function getTourBySlug(slug: string, locale: string): TourData | undefined {
  const tours = toursByLocale[locale] ?? toursByLocale['en']
  return tours.find((t) => t.slug === slug)
}

export function getAllTourSlugs(): { slug: string }[] {
  return toursEn.map((t) => ({ slug: t.slug }))
}
