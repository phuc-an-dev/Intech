// ============================================================
// MOCK DATA – IntechISC Course Catalog
// Generated for Next.js (TypeScript)
// Icon & color fields intentionally omitted (managed separately)
// ============================================================

export type CourseLevel =
  | "foundation"
  | "tools"
  | "application"
  | "advanced"
  | "strategic";

export type TopicSlug =
  | "ai-in-action"
  | "quality-management"
  | "operations-optimization"
  | "data-analytics-digital-scm"
  | "compliance-legal"
  | "iot-computer-vision"
  | "professional-skills";

export interface CourseDuration {
  hours: number;
  sessions: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  topicSlug: TopicSlug;
  level: CourseLevel;
  duration: CourseDuration;
  price: number; // VND
  tags: string[];
  learningOutcome: string;
  prerequisite: string | null;
}

export interface Topic {
  id: number;
  slug: TopicSlug;
  name: string;
  description: string;
}

// ─────────────────────────────────────────────
// TOPICS
// ─────────────────────────────────────────────

export const topics: Topic[] = [
  {
    id: 1,
    slug: "ai-in-action",
    name: "AI Ứng dụng",
    description:
      "Chuyển đổi tư duy từ làm việc thủ công sang hợp tác với AI để tối ưu hiệu suất cá nhân và tổ chức.",
  },
  {
    id: 2,
    slug: "quality-management",
    name: "Quản lý Chất lượng",
    description:
      "Chuyển dịch tư duy từ kiểm tra chất lượng sang kiểm soát và dự báo chất lượng dựa trên dữ liệu.",
  },
  {
    id: 3,
    slug: "operations-optimization",
    name: "Tối ưu hóa Vận hành",
    description:
      "Trang bị khả năng giải quyết các bài toán đánh đổi trong kinh doanh từ mô hình toán học đến mô phỏng phức tạp.",
  },
  {
    id: 4,
    slug: "data-analytics-digital-scm",
    name: "Phân tích & Chuỗi cung ứng số",
    description:
      "Chuyển hóa dữ liệu thô thành thông tin có giá trị để ra quyết định và xây dựng Supply Chain Analyst thực thụ.",
  },
  {
    id: 5,
    slug: "compliance-legal",
    name: "Quản trị Tuân thủ & Pháp lý",
    description:
      "Trang bị kiến thức về luật chơi toàn cầu, từ hải quan, quy tắc xuất xứ đến tiêu chuẩn vận hành quốc tế.",
  },
  {
    id: 6,
    slug: "iot-computer-vision",
    name: "IoT & Computer Vision",
    description:
      "Xóa nhòa khoảng cách giữa thế giới vật lý và số thông qua cảm biến và camera thông minh.",
  },
  {
    id: 7,
    slug: "professional-skills",
    name: "Kỹ năng Chuyên nghiệp",
    description:
      "Trang bị kỹ năng mềm và tư duy quản trị giúp nhân sự kỹ thuật chuyển hóa năng lực thành giá trị kinh doanh.",
  },
];

// ─────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────

export const courses: Course[] = [
  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 1: AI ỨNG DỤNG
  // ═══════════════════════════════════════════
  {
    id: "ai-001",
    slug: "basic-prompt-engineering",
    title: "Basic Prompt Engineering",
    description:
      "Làm chủ kỹ năng điều khiển AI thông qua ngôn ngữ. Tập trung vào việc tạo ra các 'câu lệnh vàng' để giải quyết nhanh các tác vụ văn phòng Logistics hàng ngày.",
    topicSlug: "ai-in-action",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 3_500_000,
    tags: ["prompt engineering", "AI", "logistics", "ChatGPT", "tự động hóa"],
    learningOutcome:
      "Bộ thư viện Prompt chuẩn cho 20 tình huống Logistics phổ biến.",
    prerequisite: null,
  },
  {
    id: "ai-002",
    slug: "ai-driven-data-analysis",
    title: "AI-Driven Data Analysis",
    description:
      "Biến AI thành một 'Chuyên gia phân tích dữ liệu riêng'. Học cách tải dữ liệu vận hành lên AI để tìm lỗi, phân loại và vẽ biểu đồ xu hướng tự động.",
    topicSlug: "ai-in-action",
    level: "tools",
    duration: { hours: 16, sessions: 8 },
    price: 4_500_000,
    tags: ["AI", "phân tích dữ liệu", "Excel", "báo cáo", "logistics"],
    learningOutcome:
      "Báo cáo phân tích hiệu suất vận hành được thực hiện chỉ trong 5 phút.",
    prerequisite: "basic-prompt-engineering",
  },
  {
    id: "ai-003",
    slug: "genai-in-scm-planning",
    title: "GenAI in Supply Chain Planning",
    description:
      "Sử dụng AI để sáng tạo nội dung và giải pháp. Tập trung vào soạn thảo SOP, kịch bản điều phối vận tải và phương án ứng phó đứt gãy chuỗi cung ứng.",
    topicSlug: "ai-in-action",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 5_500_000,
    tags: ["GenAI", "SOP", "supply chain", "vận tải", "contingency plan"],
    learningOutcome:
      "Bộ quy trình SOP và kế hoạch dự phòng (Contingency Plan) chuẩn hóa.",
    prerequisite: "ai-driven-data-analysis",
  },
  {
    id: "ai-004",
    slug: "low-code-ai-agent-design",
    title: "Low-code AI Agent Design",
    description:
      "Tự thiết kế các 'Robot phần mềm' (AI Agents) am hiểu tài liệu riêng của công ty để hỗ trợ tra cứu chính sách hải quan, quy định kho bãi hoặc trả lời khách hàng 24/7.",
    topicSlug: "ai-in-action",
    level: "advanced",
    duration: { hours: 24, sessions: 12 },
    price: 7_000_000,
    tags: ["AI agent", "low-code", "ChatGPT", "Zapier", "tự động hóa", "chatbot"],
    learningOutcome:
      "Một Custom AI Agent hoạt động thực tế trên nền tảng như ChatGPT hoặc Zapier.",
    prerequisite: "genai-in-scm-planning",
  },
  {
    id: "ai-005",
    slug: "ai-strategic-leadership",
    title: "AI Strategic Leadership",
    description:
      "Dành cho nhà quản lý để hoạch định tương lai. Tập trung vào quản trị sự thay đổi, bảo mật thông tin doanh nghiệp khi dùng AI và đo lường hiệu quả AI trong vận hành.",
    topicSlug: "ai-in-action",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 8_500_000,
    tags: ["AI governance", "chiến lược", "quản lý", "roadmap", "bảo mật"],
    learningOutcome:
      "Bản lộ trình (Roadmap) triển khai AI cho đơn vị/doanh nghiệp.",
    prerequisite: null,
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 2: QUẢN LÝ CHẤT LƯỢNG
  // ═══════════════════════════════════════════
  {
    id: "qm-001",
    slug: "lean-thinking-4",
    title: "Lean Thinking 4.0",
    description:
      "Loại bỏ lãng phí và tối ưu hóa dòng chảy giá trị. Tập trung tinh gọn hóa quy trình từ kho bãi đến sản xuất bằng công nghệ số.",
    topicSlug: "quality-management",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 3_500_000,
    tags: ["lean", "VSM", "tinh gọn", "kho bãi", "sản xuất"],
    learningOutcome:
      "Bản sơ đồ chuỗi giá trị (VSM) hiện tại và tương lai của doanh nghiệp.",
    prerequisite: null,
  },
  {
    id: "qm-002",
    slug: "six-sigma-green-belt",
    title: "Six Sigma Green Belt",
    description:
      "Phương pháp luận giải quyết vấn đề dựa trên dữ liệu (DMAIC). Giúp giảm tỷ lệ sai sót và biến động trong mọi quy trình vận hành.",
    topicSlug: "quality-management",
    level: "tools",
    duration: { hours: 24, sessions: 12 },
    price: 5_000_000,
    tags: ["six sigma", "DMAIC", "dữ liệu", "cải tiến", "green belt"],
    learningOutcome:
      "01 Dự án cải tiến thực tế giúp tiết kiệm chi phí hoặc thời gian cho công ty.",
    prerequisite: "lean-thinking-4",
  },
  {
    id: "qm-003",
    slug: "applied-spc",
    title: "Applied SPC",
    description:
      "Kiểm soát quy trình bằng thống kê thực chiến. Sử dụng phần mềm Minitab/Excel để giám sát và cảnh báo sớm các nguy cơ về chất lượng.",
    topicSlug: "quality-management",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 5_500_000,
    tags: ["SPC", "thống kê", "Minitab", "control chart", "chất lượng"],
    learningOutcome:
      "Hệ thống biểu đồ kiểm soát (Control Charts) cho các chỉ số quan trọng (KPIs).",
    prerequisite: "six-sigma-green-belt",
  },
  {
    id: "qm-004",
    slug: "doe-process-optimization",
    title: "DoE for Process Optimization",
    description:
      "Kỹ thuật thiết kế thí nghiệm để tìm ra thông số vận hành tối ưu. Đặc biệt quan trọng khi thiết lập dây chuyền và cải tiến kỹ thuật.",
    topicSlug: "quality-management",
    level: "advanced",
    duration: { hours: 20, sessions: 10 },
    price: 6_500_000,
    tags: ["DoE", "thiết kế thí nghiệm", "tối ưu hóa", "thông số", "kỹ thuật"],
    learningOutcome:
      "Báo cáo tối ưu hóa thông số (nhiệt độ, áp suất, thời gian) để đạt chất lượng cao nhất.",
    prerequisite: "applied-spc",
  },
  {
    id: "qm-005",
    slug: "quality-4-strategy",
    title: "Quality 4.0 Strategy",
    description:
      "Tích hợp AI và IoT vào hệ thống quản lý chất lượng. Chuyển từ phòng ngừa sang dự báo chất lượng thông minh (Predictive Quality).",
    topicSlug: "quality-management",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 8_500_000,
    tags: ["Quality 4.0", "AI", "IoT", "predictive quality", "QA/QC", "chuyển đổi số"],
    learningOutcome:
      "Đề án chuyển đổi số cho bộ phận Quản lý chất lượng (QA/QC).",
    prerequisite: null,
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 3: TỐI ƯU HÓA VẬN HÀNH
  // ═══════════════════════════════════════════
  {
    id: "ops-001",
    slug: "inventory-masterclass",
    title: "Inventory Masterclass",
    description:
      "Tối ưu hóa dòng vốn nằm trong kho. Học cách thiết lập điểm đặt hàng lại (Reorder Point) và mức tồn kho an toàn để không bao giờ mất đơn hàng do thiếu hàng.",
    topicSlug: "operations-optimization",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 3_500_000,
    tags: ["tồn kho", "reorder point", "safety stock", "SKU", "kho bãi"],
    learningOutcome:
      "Một file Dashboard quản lý và tối ưu tồn kho cho ít nhất 100 SKUs.",
    prerequisite: null,
  },
  {
    id: "ops-002",
    slug: "routing-fleet-ops",
    title: "Routing & Fleet Ops",
    description:
      "Cắt giảm 15-20% chi phí vận tải thông qua sắp xếp lộ trình thông minh. Ứng dụng các thuật toán đơn giản để quản lý đội xe và tải trọng hiệu quả.",
    topicSlug: "operations-optimization",
    level: "tools",
    duration: { hours: 16, sessions: 8 },
    price: 4_500_000,
    tags: ["routing", "vận tải", "đội xe", "tối ưu lộ trình", "logistics"],
    learningOutcome:
      "Bản kế hoạch điều xe tối ưu cho một mạng lưới giao nhận thực tế.",
    prerequisite: null,
  },
  {
    id: "ops-003",
    slug: "warehouse-flow-design",
    title: "Warehouse Flow Design",
    description:
      "Tăng 30% tốc độ lấy hàng (Picking) bằng cách sắp xếp lại vị trí hàng hóa và luồng di chuyển. Học cách vẽ lại mặt bằng kho thông minh.",
    topicSlug: "operations-optimization",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 5_000_000,
    tags: ["kho bãi", "layout", "picking", "material flow", "warehouse design"],
    learningOutcome:
      "Bản thiết kế Layout kho tối ưu hóa không gian và luồng di chuyển (Material Flow).",
    prerequisite: null,
  },
  {
    id: "ops-004",
    slug: "supply-chain-network-design",
    title: "Supply Chain Network Design",
    description:
      "Thiết kế bản đồ logistics cho toàn doanh nghiệp. Trả lời câu hỏi chiến lược về vị trí kho bãi và trung tâm phân phối để giảm chi phí tổng thể.",
    topicSlug: "operations-optimization",
    level: "advanced",
    duration: { hours: 24, sessions: 12 },
    price: 7_000_000,
    tags: ["network design", "phân phối", "kho bãi", "chiến lược", "GIS"],
    learningOutcome:
      "Đề án xác định vị trí kho tối ưu dựa trên dữ liệu địa lý và chi phí.",
    prerequisite: null,
  },
  {
    id: "ops-005",
    slug: "simulation-decision-support",
    title: "Simulation & Decision Support",
    description:
      "Đỉnh cao của tối ưu hóa. Sử dụng mô phỏng (AnyLogic/Arena) để dự đoán nút thắt cổ chai và thử nghiệm thay đổi mà không gây rủi ro cho vận hành thực.",
    topicSlug: "operations-optimization",
    level: "strategic",
    duration: { hours: 24, sessions: 12 },
    price: 9_000_000,
    tags: ["simulation", "AnyLogic", "Arena", "bottleneck", "mô phỏng", "decision support"],
    learningOutcome:
      "Mô hình mô phỏng hoàn chỉnh cho một dây chuyền hoặc hệ thống Logistics.",
    prerequisite: "supply-chain-network-design",
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 4: PHÂN TÍCH DỮ LIỆU & CHUỖI CUNG ỨNG SỐ
  // ═══════════════════════════════════════════
  {
    id: "da-001",
    slug: "logistics-dashboarding",
    title: "Logistics Dashboarding",
    description:
      "Biến những bảng tính Excel rời rạc thành hệ thống báo cáo tự động trên Power BI. Giúp nhà quản lý nắm bắt tình hình kho vận chỉ trong 3 giây nhìn màn hình.",
    topicSlug: "data-analytics-digital-scm",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 3_500_000,
    tags: ["Power BI", "dashboard", "KPI", "Excel", "báo cáo"],
    learningOutcome:
      "Một hệ thống Dashboard báo cáo KPI thực tế của doanh nghiệp.",
    prerequisite: null,
  },
  {
    id: "da-002",
    slug: "sql-for-supply-chain",
    title: "SQL for Supply Chain",
    description:
      "Phá vỡ rào cản giữa 'Dân vận hành' và 'Dân IT'. Học viên làm chủ kỹ năng trích xuất dữ liệu thô từ hệ thống ERP/WMS để phục vụ các phân tích chuyên sâu.",
    topicSlug: "data-analytics-digital-scm",
    level: "tools",
    duration: { hours: 16, sessions: 8 },
    price: 4_500_000,
    tags: ["SQL", "ERP", "WMS", "dữ liệu", "truy vấn", "database"],
    learningOutcome:
      "Khả năng tự viết câu lệnh lấy dữ liệu từ ERP/WMS mà không cần hỗ trợ từ IT.",
    prerequisite: "logistics-dashboarding",
  },
  {
    id: "da-003",
    slug: "advanced-demand-planning",
    title: "Advanced Demand Planning",
    description:
      "Dự báo nhu cầu chính xác hơn để giảm tồn kho thừa và tránh cháy hàng. Tập trung vào xử lý dữ liệu lịch sử và biến động thị trường.",
    topicSlug: "data-analytics-digital-scm",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 5_500_000,
    tags: ["demand planning", "forecasting", "dự báo", "tồn kho", "mua hàng"],
    learningOutcome:
      "Mô hình dự báo nhu cầu (Forecasting Model) ứng dụng vào kế hoạch mua hàng.",
    prerequisite: "sql-for-supply-chain",
  },
  {
    id: "da-004",
    slug: "digital-twin-foundation",
    title: "Digital Twin Foundation",
    description:
      "Xây dựng 'Bản sao số' để theo dõi toàn cảnh chuỗi cung ứng. Giúp nhận diện rủi ro tiềm ẩn tại bất kỳ mắt xích nào từ nhà cung cấp đến khách hàng.",
    topicSlug: "data-analytics-digital-scm",
    level: "advanced",
    duration: { hours: 24, sessions: 12 },
    price: 7_000_000,
    tags: ["digital twin", "bản sao số", "supply chain", "rủi ro", "data flow"],
    learningOutcome:
      "Sơ đồ dòng chảy dữ liệu (Data Flow) xuyên suốt chuỗi cung ứng số.",
    prerequisite: "advanced-demand-planning",
  },
  {
    id: "da-005",
    slug: "digital-transformation-roadmap",
    title: "Digital Transformation Roadmap",
    description:
      "Hoạch định chiến lược đầu tư công nghệ. Giúp lãnh đạo chọn đúng công cụ, đúng thời điểm để tránh lãng phí tiền bạc vào các dự án số hóa thất bại.",
    topicSlug: "data-analytics-digital-scm",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 8_500_000,
    tags: ["chuyển đổi số", "roadmap", "chiến lược", "công nghệ", "lãnh đạo"],
    learningOutcome:
      "Bản lộ trình (Roadmap) chuyển đổi số chi tiết cho đơn vị hoặc công ty.",
    prerequisite: null,
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 5: QUẢN TRỊ TUÂN THỦ & PHÁP LÝ
  // ═══════════════════════════════════════════
  {
    id: "cl-001",
    slug: "customs-trade-practice",
    title: "Customs & Trade Practice",
    description:
      "Làm chủ nghiệp vụ Hải quan thực chiến. Học viên biết cách kiểm soát hồ sơ, áp mã thuế đúng và tự tin làm việc với cơ quan chức năng.",
    topicSlug: "compliance-legal",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 3_500_000,
    tags: ["hải quan", "xuất nhập khẩu", "thuế quan", "mã HS", "thủ tục"],
    learningOutcome:
      "Bộ quy trình tự kiểm tra (Checklist) hồ sơ xuất nhập khẩu chuẩn chỉnh.",
    prerequisite: null,
  },
  {
    id: "cl-002",
    slug: "operations-standards-iso",
    title: "Operations Standards (ISO)",
    description:
      "Xây dựng nền tảng vận hành chuẩn quốc tế. Giúp doanh nghiệp luôn ở trạng thái sẵn sàng đánh giá từ các khách hàng lớn và tổ chức chứng nhận.",
    topicSlug: "compliance-legal",
    level: "tools",
    duration: { hours: 20, sessions: 10 },
    price: 4_500_000,
    tags: ["ISO", "tiêu chuẩn", "chứng nhận", "vận hành", "an toàn môi trường"],
    learningOutcome:
      "Kế hoạch triển khai và duy trì hệ thống quản lý ISO tại đơn vị.",
    prerequisite: null,
  },
  {
    id: "cl-003",
    slug: "fta-rules-of-origin-master",
    title: "FTA & Rules of Origin Master",
    description:
      "Biết cách thiết lập chuỗi cung ứng đáp ứng quy tắc xuất xứ để hưởng lợi ích tối đa từ các hiệp định thương mại tự do.",
    topicSlug: "compliance-legal",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 5_500_000,
    tags: ["FTA", "quy tắc xuất xứ", "thuế quan ưu đãi", "thương mại tự do", "C/O"],
    learningOutcome:
      "Bản phân tích khả năng tận dụng FTA cho danh mục sản phẩm của công ty.",
    prerequisite: "customs-trade-practice",
  },
  {
    id: "cl-004",
    slug: "legal-risk-in-logistics",
    title: "Legal Risk in Logistics",
    description:
      "Kỹ thuật soạn thảo hợp đồng và xử lý khủng hoảng pháp lý. Tập trung vào bảo vệ quyền lợi doanh nghiệp khi có sự cố hư hỏng, mất mát hàng hóa.",
    topicSlug: "compliance-legal",
    level: "advanced",
    duration: { hours: 20, sessions: 10 },
    price: 6_500_000,
    tags: ["hợp đồng", "pháp lý", "rủi ro", "khiếu nại", "logistics law"],
    learningOutcome:
      "Mẫu hợp đồng Logistics và quy trình xử lý khiếu nại (Claim) tiêu chuẩn.",
    prerequisite: null,
  },
  {
    id: "cl-005",
    slug: "integrity-digital-compliance",
    title: "Integrity & Digital Compliance",
    description:
      "Quản trị sự minh bạch và bảo mật trong chuỗi cung ứng số. Đáp ứng các yêu cầu khắt khe về đạo đức kinh doanh của thị trường quốc tế.",
    topicSlug: "compliance-legal",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 8_000_000,
    tags: ["tuân thủ số", "bảo mật dữ liệu", "đạo đức kinh doanh", "minh bạch", "ESG"],
    learningOutcome:
      "Bản dự thảo 'Chính sách tuân thủ nội bộ' và quy trình bảo mật dữ liệu số.",
    prerequisite: null,
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 6: IOT & COMPUTER VISION
  // ═══════════════════════════════════════════
  {
    id: "iot-001",
    slug: "industrial-iot-sensors",
    title: "Industrial IoT & Sensors",
    description:
      "Nền tảng về 'giác quan' của máy móc. Học cách kết nối vạn vật trong nhà máy và kho bãi để dữ liệu luôn chảy về trung tâm một cách tự động.",
    topicSlug: "iot-computer-vision",
    level: "foundation",
    duration: { hours: 16, sessions: 8 },
    price: 4_000_000,
    tags: ["IoT", "cảm biến", "nhà máy thông minh", "kết nối", "sensor map"],
    learningOutcome:
      "Một bản thiết kế hệ thống cảm biến (Sensor Map) cho một khu vực vận hành cụ thể.",
    prerequisite: null,
  },
  {
    id: "iot-002",
    slug: "computer-vision-in-ops",
    title: "Computer Vision in Ops",
    description:
      "Ứng dụng AI Camera để thay thế mắt người trong các tác vụ lặp đi lặp lại: đếm hàng, phân loại sản phẩm và giám sát an toàn 24/7.",
    topicSlug: "iot-computer-vision",
    level: "tools",
    duration: { hours: 20, sessions: 10 },
    price: 5_500_000,
    tags: ["computer vision", "AI camera", "phân loại", "giám sát", "an toàn lao động"],
    learningOutcome:
      "Đề án ứng dụng Camera thông minh để giải quyết 01 vấn đề giám sát thực tế.",
    prerequisite: "industrial-iot-sensors",
  },
  {
    id: "iot-003",
    slug: "realtime-monitoring-systems",
    title: "Real-time Monitoring Systems",
    description:
      "Xây dựng hệ thống 'phản ứng nhanh'. Dữ liệu từ cảm biến được hiển thị tức thì trên điện thoại/máy tính để can thiệp kịp thời khi có sự cố.",
    topicSlug: "iot-computer-vision",
    level: "application",
    duration: { hours: 20, sessions: 10 },
    price: 6_000_000,
    tags: ["real-time", "monitoring", "dashboard", "cảnh báo", "IoT"],
    learningOutcome:
      "Một Dashboard giám sát thời gian thực (Real-time) kết nối với thiết bị giả lập/thực tế.",
    prerequisite: "computer-vision-in-ops",
  },
  {
    id: "iot-004",
    slug: "predictive-maintenance-aiot",
    title: "Predictive Maintenance (AIoT)",
    description:
      "Chuyển từ 'Hỏng mới sửa' sang 'Biết trước để ngừa'. Sử dụng dữ liệu IoT để dự đoán tuổi thọ linh kiện, giúp giảm 50% thời gian dừng máy đột ngột.",
    topicSlug: "iot-computer-vision",
    level: "advanced",
    duration: { hours: 24, sessions: 12 },
    price: 7_500_000,
    tags: ["predictive maintenance", "AIoT", "bảo trì", "dự đoán", "downtime"],
    learningOutcome:
      "Kế hoạch bảo trì dự báo (Predictive Maintenance Plan) dựa trên dữ liệu cảm biến.",
    prerequisite: "realtime-monitoring-systems",
  },
  {
    id: "iot-005",
    slug: "aiot-strategic-roadmap",
    title: "AIoT Strategic Roadmap",
    description:
      "Tầm nhìn chiến lược về kết nối thông minh. Cách lựa chọn công nghệ, đảm bảo an ninh mạng và tích hợp toàn bộ dữ liệu hiện trường vào bộ não của doanh nghiệp.",
    topicSlug: "iot-computer-vision",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 9_000_000,
    tags: ["AIoT", "roadmap", "an ninh mạng", "hạ tầng IoT", "chiến lược số"],
    learningOutcome:
      "Bản lộ trình (Roadmap) triển khai hạ tầng IoT/Vision toàn diện cho doanh nghiệp.",
    prerequisite: null,
  },

  // ═══════════════════════════════════════════
  // CHỦ ĐỀ 7: KỸ NĂNG CHUYÊN NGHIỆP
  // ═══════════════════════════════════════════
  {
    id: "ps-001",
    slug: "technical-presentation-excellence",
    title: "Technical Presentation Excellence",
    description:
      "Biến số liệu khô khan thành câu chuyện thuyết phục. Tập trung vào kỹ thuật kể chuyện bằng dữ liệu (Data Storytelling) dành riêng cho báo cáo vận hành.",
    topicSlug: "professional-skills",
    level: "foundation",
    duration: { hours: 12, sessions: 6 },
    price: 3_000_000,
    tags: ["presentation", "data storytelling", "báo cáo", "slide", "thuyết trình"],
    learningOutcome:
      "Một bộ Slide báo cáo chuyên môn đạt chuẩn 'Executive Ready'.",
    prerequisite: null,
  },
  {
    id: "ps-002",
    slug: "structural-problem-solving",
    title: "Structural Problem Solving",
    description:
      "Làm chủ các phương pháp tư duy có hệ thống để bóc tách các vấn đề hóc búa trong doanh nghiệp. Không giải quyết phần ngọn, tập trung vào căn nguyên.",
    topicSlug: "professional-skills",
    level: "tools",
    duration: { hours: 12, sessions: 6 },
    price: 3_500_000,
    tags: ["problem solving", "root cause", "tư duy hệ thống", "action plan", "phân tích"],
    learningOutcome:
      "Ma trận giải quyết vấn đề và kế hoạch hành động khắc phục (Action Plan).",
    prerequisite: null,
  },
  {
    id: "ps-003",
    slug: "project-execution-for-engineers",
    title: "Project Execution for Engineers",
    description:
      "Kỹ năng điều phối dự án cải tiến. Học viên biết cách kiểm soát tiến độ, quản lý nhà thầu và các bên liên quan để dự án không bị 'vỡ trận'.",
    topicSlug: "professional-skills",
    level: "application",
    duration: { hours: 16, sessions: 8 },
    price: 4_500_000,
    tags: ["project management", "Gantt", "tiến độ", "nhà thầu", "rủi ro dự án"],
    learningOutcome:
      "Biểu đồ Gantt và bảng quản trị rủi ro cho một dự án thực tế tại công ty.",
    prerequisite: null,
  },
  {
    id: "ps-004",
    slug: "operational-leadership",
    title: "Operational Leadership",
    description:
      "Kỹ năng quản lý nhân sự tại hiện trường. Tập trung vào việc tạo động lực cho nhân viên cấp dưới, quản lý hiệu suất và dẫn dắt sự thay đổi.",
    topicSlug: "professional-skills",
    level: "advanced",
    duration: { hours: 16, sessions: 8 },
    price: 5_000_000,
    tags: ["leadership", "quản lý nhân sự", "hiệu suất", "động lực", "change management"],
    learningOutcome:
      "Kỹ năng xử lý 10 tình huống xung đột nhân sự điển hình.",
    prerequisite: null,
  },
  {
    id: "ps-005",
    slug: "supply-chain-executive-path",
    title: "Supply Chain Executive Path",
    description:
      "Tư duy của một lãnh đạo cấp cao. Cách nhìn nhận chuỗi cung ứng dưới góc độ tài chính và chiến lược để định vị bản thân lên các vị trí quản lý tầm cỡ.",
    topicSlug: "professional-skills",
    level: "strategic",
    duration: { hours: 20, sessions: 10 },
    price: 8_000_000,
    tags: ["supply chain", "lãnh đạo cấp cao", "tài chính", "chiến lược", "career path"],
    learningOutcome:
      "Hồ sơ năng lực cá nhân (Professional Portfolio) và lộ trình thăng tiến sự nghiệp.",
    prerequisite: null,
  },
];

// ─────────────────────────────────────────────
// HELPER UTILITIES
// ─────────────────────────────────────────────

/** Lấy tất cả courses thuộc một topic */
export function getCoursesByTopic(slug: TopicSlug): Course[] {
  return courses.filter((c) => c.topicSlug === slug);
}

/** Lấy tất cả courses theo level */
export function getCoursesByLevel(level: CourseLevel): Course[] {
  return courses.filter((c) => c.level === level);
}

/** Tìm course theo slug (dùng cho routing) */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Lấy topic metadata theo slug */
export function getTopicBySlug(slug: TopicSlug): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

/** Tất cả slugs – dùng cho generateStaticParams() trong Next.js */
export const allCourseSlugs = courses.map((c) => ({ slug: c.slug }));

// ─────────────────────────────────────────────
// LABEL MAPS (dùng cho UI filter / badge)
// ─────────────────────────────────────────────

export const levelLabels: Record<CourseLevel, string> = {
  foundation: "Lớp 1 – Nền tảng",
  tools: "Lớp 2 – Công cụ",
  application: "Lớp 3 – Ứng dụng",
  advanced: "Lớp 4 – Nâng cao",
  strategic: "Lớp 5 – Chiến lược",
};