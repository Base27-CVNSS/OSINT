<div align="center">

<img src="./assets/osint-shield.svg" width="118" alt="OSINT Master Toolkit v2"/>

# 🛰️ OSINT Master Toolkit v2

### Dashboard Việt hóa cho kho công cụ OSINT — 456+ tools, 25 nhóm, Community Edition

**OSINT ALERT! 🚀 Mệt mỏi vì phải tìm công cụ ở khắp mọi nơi?**

[![Dashboard](https://img.shields.io/badge/Dashboard-index.html-22d3ee?style=for-the-badge)](./index.html)
[![Tools](https://img.shields.io/badge/OSINT-456%2B_tools-3b82f6?style=for-the-badge)](#-danh-mục)
[![Community](https://img.shields.io/badge/Edition-Community-8b5cf6?style=for-the-badge)](#-community-edition)
[![License](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](./LICENSE)

**Tìm kiếm • AI Tools • Geolocation • Breaches • Social Media • Telegram • DNS • Fact-check • OPSEC**

</div>

---

## 🚨 OSINT ALERT!

OSINT Master Toolkit v2 là một **dashboard directory** giúp gom các công cụ điều tra nguồn mở vào một giao diện duy nhất, ưu tiên tiếng Việt, tốc độ và khả năng chạy trực tiếp trên GitHub Pages.

Nguồn bundle hiện tại chứa **477 mục thuộc 25 nhóm**. README dùng nhãn **456+ tools** để giữ thông điệp của phiên bản v2, trong khi dashboard tự đếm dữ liệu thực tế khi chạy.

> Đây là **directory liên kết**, không phải công cụ xâm nhập, crawler hay trình thu thập dữ liệu tự động.

## ✨ Điểm nổi bật

- 🔎 **Tìm kiếm tức thì** theo tên công cụ, URL và danh mục.
- 🗂️ **25 nhóm OSINT** được Việt hóa.
- 🧠 Khu vực **Công cụ AI** riêng.
- 📍 **Định vị địa lý**, bản đồ, vệ tinh và dữ liệu vị trí.
- 🛡️ **Rò rỉ dữ liệu & Threat Intel**.
- 🌐 **Mạng xã hội, Telegram, DNS, metadata, ảnh ngược**.
- 🧭 **Hover popup**: rê chuột hoặc focus để xem mô tả ngắn trước khi mở.
- ★ **Yêu thích cục bộ** bằng `localStorage` — không cần tài khoản.
- 🏷️ Lọc **Miễn phí / Có phí / CLI**.
- 📱 Responsive cho desktop, tablet và điện thoại.
- ⚡ Không framework, không backend, không analytics.

## 🧭 Danh mục

| # | Nhóm | Mục tiêu |
|---:|---|---|
| 1 | 📞 Điện thoại | Reverse lookup, carrier, dấu vết số điện thoại |
| 2 | ✉️ Email | Xác minh email, tài khoản liên kết, breach checks |
| 3 | 👤 Tên người dùng | Username footprint trên nhiều nền tảng |
| 4 | 🌐 Tên miền & DNS | WHOIS, DNS, certs, subdomain, infrastructure |
| 5 | 🛡️ Rò rỉ dữ liệu | Breach, leak và threat intelligence |
| 6 | 🧾 Siêu dữ liệu | EXIF, metadata ảnh và tài liệu |
| 7 | 🔎 Công cụ tìm kiếm | Search engines và truy vấn chuyên biệt |
| 8 | 🖼️ Tìm kiếm ảnh ngược | Nguồn gốc và bản sao hình ảnh |
| 9 | 💬 Mạng xã hội | Social discovery và verification |
| 10 | 📍 Định vị địa lý | Maps, satellite, IP, street-level data |
| 11 | 🕰️ Lưu trữ web | Snapshot và lịch sử website |
| 12 | 🏢 Doanh nghiệp | Pháp nhân và dữ liệu doanh nghiệp |
| 13 | 💻 Mã nguồn & Kho mã | Code search, GitHub, repositories |
| 14 | ✈️ Giao thông & Phương tiện | Flight, AIS, vehicle OSINT |
| 15 | 📡 Giám sát & Threat Intel | IOC, monitoring, cyber intelligence |
| 16 | 📚 Tài liệu & Dữ liệu | Document, dataset và open data |
| 17 | 📊 Trực quan hóa dữ liệu | Graph, map và relationship visualization |
| 18 | ✈️ Telegram OSINT | Telegram search và public traces |
| 19 | 🥷 Trình duyệt & OPSEC | Privacy, browser tools và operational security |
| 20 | 🧠 Công cụ AI | AI hỗ trợ phân tích và xác minh |
| 21 | 🧰 Tài nguyên | Directories, guides và learning resources |
| 22 | 🧑 Tìm người & Hồ sơ | Public profiles và identity footprint |
| 23 | 📈 Web, Traffic & SEO | Web footprint, traffic và SEO |
| 24 | ✅ Kiểm chứng & Xác minh | Fact-check và verification |
| 25 | 🇨🇴 Module Colombia | Nguồn dữ liệu công khai chuyên biệt Colombia |

## 🖥️ Dashboard

Mở `index.html` trực tiếp hoặc bật GitHub Pages.

```text
index.html
   │
   ├── data/tools.js
   │     ├── 25 categories
   │     └── 477 tool entries
   │
   ├── Search + Filters
   ├── Category Sidebar
   ├── Hover Popover
   └── Local Favorites
```

### GitHub Pages

Vào:

`Settings → Pages → Deploy from a branch → main → / (root) → Save`

URL dự kiến:

`https://base27-cvnss.github.io/OSINT/`

## 🧩 Cấu trúc repo

```text
OSINT/
├── README.md
├── LICENSE
├── index.html
├── assets/
│   └── osint-shield.svg
└── data/
    └── tools.js
```

## 🔐 Nguyên tắc sử dụng

OSINT không đồng nghĩa với quyền truy cập không giới hạn. Người dùng chịu trách nhiệm tuân thủ luật pháp và điều khoản của từng dịch vụ.

**Không sử dụng danh mục này để:**
- xâm nhập hệ thống hoặc tài khoản trái phép;
- quấy rối, doxxing hoặc theo dõi cá nhân trái pháp luật;
- thu thập, mua bán hoặc khai thác dữ liệu nhạy cảm bất hợp pháp;
- vượt qua cơ chế xác thực hay kiểm soát truy cập.

**Nên sử dụng cho:** nghiên cứu nguồn mở, xác minh thông tin, báo chí, threat intelligence hợp pháp, điều tra nội bộ được ủy quyền, nghiên cứu học thuật và đào tạo an toàn thông tin.

## 🌍 Community Edition

Dashboard không gửi truy vấn tìm kiếm của bạn về máy chủ Base27-CVNSS. Danh sách công cụ nằm trong file local của repo; trạng thái yêu thích được lưu trong trình duyệt bằng `localStorage`.

Các dịch vụ bên thứ ba có chính sách dữ liệu, điều khoản và giấy phép riêng. Việc một công cụ xuất hiện trong danh sách **không đồng nghĩa với chứng thực**.

## 📜 License

Phần mã dashboard, layout và tài liệu do repo này cung cấp được phát hành theo **MIT License**.

Tên thương hiệu, mã nguồn và dịch vụ của các công cụ được liên kết vẫn thuộc giấy phép/chủ sở hữu tương ứng.

---

<div align="center">

**Base27-CVNSS · OSINT Master Toolkit v2**

`Open Source • Community Edition • Vietnamese Dashboard`

</div>
