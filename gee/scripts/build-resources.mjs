import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const sourcePath = path.join(root, "source", "awesome-gee-en.md");
const outputPath = path.join(root, "data", "resources.js");

const sectionNames = {
  "Earth Engine official websites": "Nguồn chính thức",
  "Get Started": "Bắt đầu",
  "Get Help": "Trợ giúp",
  "JavaScript API": "JavaScript API",
  "Python API": "Python API",
  R: "Ngôn ngữ R",
  QGIS: "QGIS",
  "GitHub Developers": "Nhà phát triển",
  Twitter: "Cộng đồng X/Twitter",
  Apps: "Ứng dụng",
  "Free Courses": "Khóa học miễn phí",
  Presentations: "Bài trình bày",
  Videos: "Video",
  Projects: "Dự án",
  Websites: "Website chuyên đề",
  Datasets: "Bộ dữ liệu",
  Papers: "Nghiên cứu khoa học",
};

const groupNames = {
  Playground: "Môi trường thử nghiệm",
  Repositories: "Kho mã nguồn",
  Tutorials: "Hướng dẫn",
  Books: "Sách",
  Installation: "Cài đặt",
  Packages: "Thư viện và gói",
  Community: "Cộng đồng",
  Individuals: "Chuyên gia",
  Bots: "Tài khoản tự động",
  "Google affiliated": "Liên kết với Google",
  geemap: "geemap",
  General: "Tổng hợp",
  Google: "Google",
  "Community Datasets": "Dữ liệu cộng đồng",
  Landsat: "Landsat",
  Sentinel: "Sentinel",
  NAIP: "NAIP",
  "Land Cover": "Lớp phủ đất",
  Highlights: "Công trình tiêu biểu",
  "Journal Special Issues": "Chuyên san",
  Review: "Tổng quan",
  Hydrology: "Thủy văn",
  Urban: "Đô thị",
  Vegetation: "Thảm thực vật",
  Agriculture: "Nông nghiệp",
  Wetlands: "Đất ngập nước",
  "Disaster Management": "Quản lý thiên tai",
  Coastal: "Ven biển",
};

const descriptions = {
  "Nguồn chính thức": "Cổng chính thức để truy cập, học, tra cứu API, dữ liệu và dịch vụ Google Earth Engine.",
  "Bắt đầu": "Tài liệu nhập môn giúp thiết lập tài khoản, hiểu mô hình client–server và bắt đầu phân tích trên Earth Engine.",
  "Trợ giúp": "Kênh cộng đồng hoặc hệ thống hỗ trợ để hỏi đáp, báo lỗi và đề xuất dữ liệu hay tính năng.",
  "JavaScript API": "Mã nguồn, thư viện hoặc bài học phục vụ phân tích Earth Engine bằng JavaScript trong Code Editor.",
  "Python API": "Gói, notebook, mã nguồn hoặc tài liệu để điều khiển Earth Engine bằng Python và hệ sinh thái khoa học dữ liệu.",
  "Ngôn ngữ R": "Gói và ví dụ kết nối Earth Engine với R cho thống kê, viễn thám và khoa học dữ liệu không gian.",
  QGIS: "Tiện ích, ví dụ hoặc hướng dẫn tích hợp khả năng xử lý đám mây của Earth Engine vào QGIS.",
  "Nhà phát triển": "Hồ sơ tổ chức hoặc chuyên gia có đóng góp đáng chú ý cho hệ sinh thái Earth Engine.",
  "Cộng đồng X/Twitter": "Kênh cộng đồng từng được nguồn gốc tuyển chọn để theo dõi tin tức và chuyên gia Earth Engine.",
  "Ứng dụng": "Ứng dụng web hoặc danh mục ứng dụng công khai được xây dựng trên Google Earth Engine.",
  "Khóa học miễn phí": "Khóa học miễn phí giúp học Earth Engine theo lộ trình từ cơ bản đến ứng dụng thực tế.",
  "Bài trình bày": "Slide hoặc webinar trình bày phương pháp, trường hợp sử dụng và quy trình phân tích Earth Engine.",
  Video: "Video hướng dẫn, hội thảo hoặc danh sách phát về Earth Engine, geemap và viễn thám.",
  "Dự án": "Dự án nghiên cứu hoặc cộng đồng liên quan đến Google Earth Engine.",
  "Website chuyên đề": "Cổng bản đồ và hệ thống theo dõi môi trường khai thác dữ liệu viễn thám công khai.",
  "Bộ dữ liệu": "Bộ dữ liệu viễn thám hoặc danh mục dữ liệu có thể dùng trong quy trình Earth Engine.",
  "Nghiên cứu khoa học": "Bài báo, tổng quan hoặc chuyên san về phương pháp và ứng dụng Google Earth Engine.",
};

const nameTranslations = {
  "Official homepage": "Trang chủ chính thức",
  "JavaScript Code Editor": "Trình soạn thảo mã JavaScript",
  "API Documentation": "Tài liệu API",
  "Data Catalog": "Danh mục dữ liệu",
  Timelapse: "Dòng thời gian Trái Đất",
  "Earth Engine Apps": "Ứng dụng Earth Engine",
  Blog: "Blog chính thức",
  "Sign up": "Đăng ký tài khoản",
  "Developer Forum": "Diễn đàn nhà phát triển",
  "Issue Tracker": "Theo dõi sự cố",
  "Earth Engine API on GitHub": "Earth Engine API trên GitHub",
  "Google Earth Engine Community Tutorials": "Hướng dẫn Earth Engine của cộng đồng",
  "Google Earth Engine Community Developer Resources": "Tài nguyên dành cho nhà phát triển cộng đồng",
  "Get Started with Earth Engine": "Bắt đầu với Earth Engine",
  "Client vs. Server": "Phân biệt phía máy khách và máy chủ",
  "Coding Best Practices": "Thực hành lập trình tốt nhất",
  "Earth Engine Developer Forum": "Diễn đàn nhà phát triển Earth Engine",
  "Report a bug": "Báo lỗi",
  "Dataset requests": "Yêu cầu bộ dữ liệu",
  "Feature requests": "Đề xuất tính năng",
  "Slack channel for geemap and Earth Engine": "Kênh Slack geemap và Earth Engine",
  "Introduction to Google Earth Engine": "Nhập môn Google Earth Engine",
  "Introduction to JavaScript for Earth Engine": "Nhập môn JavaScript cho Earth Engine",
  "Introduction to the Earth Engine JavaScript API": "Nhập môn Earth Engine JavaScript API",
  "Global Forest Change Analysis": "Phân tích biến động rừng toàn cầu",
  "Global Surface Water Change Analysis": "Phân tích biến động nước mặt toàn cầu",
  "Beginner's Cookbook": "Sổ tay thực hành cho người mới",
  "Combining FeatureCollections": "Kết hợp các FeatureCollection",
  "Customizing Base Map Styles": "Tùy chỉnh kiểu bản đồ nền",
  "Forest Cover and Loss Estimation": "Ước tính độ che phủ và suy giảm rừng",
  "Getting Started with Drawing Tools": "Bắt đầu với công cụ vẽ",
  "Identifying Annual First Day of No Snow Cover": "Xác định ngày đầu tiên không còn tuyết hằng năm",
  "Interactive Region Reduction App": "Ứng dụng giảm vùng tương tác",
  "Land Surface Temperature in Uganda": "Nhiệt độ bề mặt đất tại Uganda",
  "Landsat ETM+ to OLI Harmonization": "Đồng nhất Landsat ETM+ và OLI",
  "MODIS NDVI Times Series Animation": "Hoạt ảnh chuỗi thời gian MODIS NDVI",
  "Non-parametric trend analysis": "Phân tích xu hướng phi tham số",
  "Calculating Area in Google Earth Engine": "Tính diện tích trong Google Earth Engine",
  "Extracting Time Series using Google Earth Engine": "Trích xuất chuỗi thời gian bằng Google Earth Engine",
  "Histogram Matching in Google Earth Engine": "Khớp biểu đồ tần suất trong Google Earth Engine",
  "Getting Git Right on Google Earth Engine": "Sử dụng Git đúng cách với Google Earth Engine",
  "Earth Engine Python API installation": "Cài đặt Earth Engine Python API",
  "A Quick Introduction to Google Earth Engine": "Nhập môn nhanh Google Earth Engine",
  "Google Earth Engine (GEE) and Image Analysis": "Google Earth Engine và phân tích ảnh",
  "Earth Engine Python API Colab Setup": "Thiết lập Earth Engine Python API trên Colab",
  "Earth Engine TensorFlow demonstration notebook": "Notebook minh họa Earth Engine với TensorFlow",
  "Creating Maps with Google Earth Engine": "Tạo bản đồ với Google Earth Engine",
  Website: "Trang dự án",
  GitHub: "Kho mã nguồn GitHub",
  "An image gallery of almost all publicly available Google Earth Engine Apps": "Thư viện ảnh các ứng dụng Earth Engine công khai",
  "A searchable list of all publicly available Google Earth Engine Apps": "Danh sách có thể tìm kiếm các ứng dụng Earth Engine công khai",
  "Earth Engine App Filter": "Bộ lọc ứng dụng Earth Engine",
  "Professor Iain Woodhouse’s guide to GEE resources and courses": "Hướng dẫn tài nguyên và khóa học GEE của Giáo sư Iain Woodhouse",
  "Geo For Good 2019 on YouTube": "Geo For Good 2019 trên YouTube",
  "Geo For Good 2022 on YouTube": "Geo For Good 2022 trên YouTube",
  "Geo For Good 2023 on YouTube": "Geo For Good 2023 trên YouTube",
  "Earth Engine Video2Tutorials": "Video hướng dẫn Earth Engine",
  video: "Video",
  slides: "Trang trình chiếu",
  "Global Surface Water Explorer": "Trình khám phá nước mặt toàn cầu",
  "Global Forest Cover Change": "Biến động độ che phủ rừng toàn cầu",
  "Surface Water Mapping Tool": "Công cụ lập bản đồ nước mặt",
  "Surface water changes (1985-2016)": "Biến động nước mặt giai đoạn 1985–2016",
  "Decision Support Tools": "Công cụ hỗ trợ quyết định",
  "CoastSat shoreline change database": "Cơ sở dữ liệu biến động đường bờ CoastSat",
  "Landsat 9 Surface Reflectance": "Landsat 9 — phản xạ bề mặt",
  "Landsat 9 TOA Reflectance": "Landsat 9 — phản xạ đỉnh khí quyển",
  "Landsat 8 Surface Reflectance": "Landsat 8 — phản xạ bề mặt",
  "Landsat 8 TOA Reflectance": "Landsat 8 — phản xạ đỉnh khí quyển",
  "Sentinel-2 MSI Surface Reflectance": "Sentinel-2 MSI — phản xạ bề mặt",
  "Sentinel-2 MSI TOA Reflectance": "Sentinel-2 MSI — phản xạ đỉnh khí quyển",
  "NAIP: National Agriculture Imagery Program": "NAIP: Chương trình ảnh nông nghiệp quốc gia Hoa Kỳ",
  "NLCD: USGS National Land Cover Database": "NLCD: Cơ sở dữ liệu lớp phủ đất quốc gia USGS",
  "Call for Papers": "Mời gửi bài",
  "Published Papers": "Các bài đã xuất bản",
};

const cleanText = (value) => value
  .replace(/<[^>]+>/g, "")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/_([^_]+)_/g, "$1")
  .replace(/\*([^*]+)\*/g, "$1")
  .replace(/\s+/g, " ")
  .replace(/^[-*\d.()\s]+/, "")
  .trim();

const normalizeUrl = (value) => value.replace(/&amp;/g, "&").replace(/[),.;]+$/, "");

const inferTags = (section, group, url) => {
  const tags = [section];
  if (group && group !== section) tags.push(group);
  if (/github\.com/i.test(url)) tags.push("GitHub");
  if (/developers\.google\.com|earthengine\.google\.com|code\.earthengine\.google\.com|github\.com\/google\//i.test(url)) tags.push("Chính thức");
  if (/youtube|bilibili|ixigua|video/i.test(url) || section === "Video") tags.push("Video");
  if (/doi\.org|researchgate|mdpi|nature\.com|sciencedirect|journal|paper/i.test(url) || section === "Nghiên cứu khoa học") tags.push("Học thuật");
  if (/dataset|catalog|landsat|sentinel|naip/i.test(url) || section === "Bộ dữ liệu") tags.push("Dữ liệu");
  if (/python|pypi|geemap/i.test(url) || section === "Python API") tags.push("Python");
  if (/javascript|code\.earthengine/i.test(url) || section === "JavaScript API") tags.push("JavaScript");
  if (/qgis/i.test(url) || section === "QGIS") tags.push("QGIS");
  if (/twitter\.com|t\.co|(^|\/)x\.com/i.test(url)) tags.push("X/Twitter");
  if (/^http:\/\//i.test(url) || /appspot\.com|twitter\.com|t\.co/i.test(url)) tags.push("Cần rà soát");
  return [...new Set(tags)];
};

const lines = fs.readFileSync(sourcePath, "utf8").split(/\r?\n/);
let h2 = "";
let h3 = "";
const resources = [];
const seen = new Set();

for (const line of lines) {
  const h2Match = line.match(/^##\s+(.+)$/);
  if (h2Match) {
    h2 = h2Match[1].trim();
    h3 = "";
    continue;
  }
  const h3Match = line.match(/^###\s+(.+)$/);
  if (h3Match) {
    h3 = h3Match[1].trim();
    continue;
  }
  if (!sectionNames[h2] || !/^\s*(?:[-*]|\d+\.)\s+/.test(line)) continue;

  const section = sectionNames[h2];
  const group = groupNames[h3] || h3 || section;
  const matches = [...line.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)];
  const angleMatches = [...line.matchAll(/<((?:https?):\/\/[^>]+)>/g)];
  const directMatches = matches.length || angleMatches.length
    ? []
    : [...line.matchAll(/(?<!\()https?:\/\/[^\s)>]+/g)];

  const candidates = [
    ...matches.map((match) => ({ name: cleanText(match[1]), url: normalizeUrl(match[2]) })),
    ...angleMatches.map((match) => ({ name: cleanText(line.split(match[0])[0]), url: normalizeUrl(match[1]) })),
    ...directMatches.map((match) => ({ name: cleanText(line.split(match[0])[0]), url: normalizeUrl(match[0]) })),
  ];

  for (const candidate of candidates) {
    if (!candidate.url || candidate.url.startsWith("#")) continue;
    const key = candidate.url.toLowerCase().replace(/^http:\/\//, "https://").replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    const fallbackName = new URL(candidate.url).hostname.replace(/^www\./, "");
    const originalName = candidate.name || fallbackName;
    const name = nameTranslations[originalName] || originalName;
    const legacy = /^http:\/\//i.test(candidate.url) || /appspot\.com|twitter\.com|t\.co/i.test(candidate.url);
    resources.push({
      id: `gee-${String(resources.length + 1).padStart(3, "0")}`,
      name,
      originalName: name === originalName ? undefined : originalName,
      url: candidate.url,
      section,
      group,
      description: descriptions[section],
      tags: inferTags(section, group, candidate.url),
      official: /developers\.google\.com|earthengine\.google\.com|code\.earthengine\.google\.com|github\.com\/google\//i.test(candidate.url),
      legacy,
    });
  }
}

const output = `/* Tệp sinh tự động từ source/awesome-gee-en.md (CC0). Không sửa trực tiếp. */\n` +
  `window.GEE_META = ${JSON.stringify({
    source: "https://github.com/opengeos/Awesome-GEE",
    sourceAuthor: "Qiusheng Wu",
    importedAt: "2026-08-04",
    license: "CC0-1.0",
  }, null, 2)};\n` +
  `window.GEE_RESOURCES = ${JSON.stringify(resources, null, 2)};\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Đã tạo ${resources.length} tài nguyên tại ${outputPath}`);
