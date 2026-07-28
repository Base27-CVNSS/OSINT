<div align="center">

<img src="./assets/osint-shield.svg" width="118" alt="OSINT Master Toolkit v2"/>

# 🛰️ OSINT Master Toolkit v2

### Dashboard Việt hóa & mở rộng cho kho công cụ OSINT Community Edition

**OSINT ALERT! 🚀 Mệt mỏi vì phải tìm công cụ ở khắp mọi nơi?**

[![Dashboard](https://img.shields.io/badge/Dashboard-index.html-22d3ee?style=for-the-badge)](./index.html)
[![Categories](https://img.shields.io/badge/Categories-34-3b82f6?style=for-the-badge)](#-danh-mục-mở-rộng)
[![Popup](https://img.shields.io/badge/Popup-Mục_đích_%2B_Cách_dùng-8b5cf6?style=for-the-badge)](#-popup-mục-đích--cách-dùng)
[![License](https://img.shields.io/badge/Dashboard-MIT-34d399?style=for-the-badge)](./LICENSE)

**Tìm kiếm • AI • Geolocation • Breaches • Social Media • Blockchain • Public Records • Image/Video • Threat Intel • OPSEC**

### 🧭 Do **Long Ngo** sưu tầm và cập nhật

</div>

---

## 🚨 OSINT ALERT!

**OSINT Master Toolkit v2** là một dashboard directory giúp gom các công cụ điều tra nguồn mở vào một giao diện duy nhất, ưu tiên **tiếng Việt, tốc độ, tìm kiếm nhanh và khả năng chạy trực tiếp trên GitHub Pages**.

Phiên bản cập nhật này tiếp tục bộ dữ liệu trước đó và bổ sung **207 hồ sơ công cụ** được rút gọn từ thư viện GitBook do người dùng cung cấp. Dashboard tự **loại trùng URL ở giao diện khi chạy**, vì vậy số công cụ thực tế được hiển thị phản ánh dữ liệu sau khi hợp nhất.

> Đây là **directory liên kết và tài liệu tham khảo**, không phải công cụ xâm nhập, crawler hay bộ thu thập dữ liệu tự động.

## ✨ Điểm mới

- 🧭 Mở rộng từ **25 lên 34 danh mục Việt hóa**.
- 🪟 **Popup khi rê chuột / focus** cho từng công cụ.
- 🎯 Popup giải thích **“Dùng vào mục đích gì?”**.
- 🧩 Popup có thêm **“Cách dùng ngắn”** để biết nên bắt đầu từ đâu.
- 🔎 Tìm kiếm theo tên, URL và danh mục.
- ♻️ Hạn chế hiển thị trùng công cụ theo URL sau khi hợp nhất nhiều nguồn.
- ★ Lưu công cụ yêu thích bằng `localStorage`, không cần tài khoản.
- 🏷️ Lọc **Miễn phí / Có phí / CLI**.
- 📱 Responsive cho desktop, tablet và điện thoại.
- ⚡ Không framework, không backend, không analytics.

## 🧭 Danh mục mở rộng

Bên cạnh các nhóm cũ như Điện thoại, Email, Username, DNS, Breaches, Social Media, Telegram, AI, Geolocation và Fact-check, phiên bản này bổ sung:

| Danh mục mới | Mục đích |
|---|---|
| 📚 Hồ sơ công khai | Public records, đăng ký, sanctions và cơ sở dữ liệu chính thức |
| 🧲 Trích xuất dữ liệu | Trích xuất và chuẩn hóa dữ liệu công khai phục vụ phân tích |
| 🌍 Dịch thuật & Ngôn ngữ | Hỗ trợ nghiên cứu nguồn đa ngôn ngữ |
| ₿ Blockchain & Tiền mã hóa | Địa chỉ ví, giao dịch và luồng tài sản blockchain |
| 🚨 Xung đột & Khủng hoảng | Theo dõi và xác minh sự kiện, crisis mapping |
| 🌿 Môi trường & Động vật hoang dã | Dữ liệu môi trường, bảo tồn và thương mại động vật |
| 🖼️ Phân tích ảnh & Video | Metadata, kiểm chứng, nhận diện và phân tích media |
| 🌐 Hạ tầng mạng | IP, ASN, chứng chỉ, dịch vụ và tài sản Internet |
| 🧰 OSINT nền tảng | Công cụ đa năng cho nhiều bước điều tra nguồn mở |

## 🪟 Popup “Mục đích + Cách dùng”

Mỗi thẻ công cụ hiện có cửa sổ thông tin ngắn khi rê chuột hoặc focus:

```text
🎯 Mục đích
Công cụ này phù hợp để làm gì trong quy trình OSINT?

🧭 Cách dùng
Loại dữ liệu nào nên nhập và nên xác minh kết quả ra sao?

Nhóm
Danh mục OSINT tương ứng.

Nguồn mở rộng
Hiển thị với các mục được bổ sung từ thư viện GitBook.
```

Thiết kế này giúp người mới không phải mở từng website chỉ để đoán công dụng.

## 🏗️ Cấu trúc repository

```text
OSINT/
├── README.md
├── LICENSE
├── index.html
├── assets/
│   └── osint-shield.svg
└── data/
    ├── tools.js
    ├── tools-1.js ... tools-5.js   # dữ liệu nền hiện có
    ├── tools-6.js ... tools-10.js  # 207 mục mở rộng từ GitBook
    └── enhance.js                  # popup Việt hóa + ghi nhận + chống trùng UI
```

`tools.js` giữ danh sách danh mục và nạp các gói dữ liệu. Lớp `enhance.js` bổ sung popup chi tiết và ghi nhận tác giả mà không làm thay đổi cấu trúc dữ liệu lõi cũ.

## 🔎 Cách sử dụng

1. Mở `index.html` hoặc GitHub Pages.
2. Tìm bằng tên công cụ hoặc domain.
3. Chọn danh mục ở thanh bên.
4. Rê chuột lên thẻ để đọc popup.
5. Nhấn **Mở công cụ ↗** để truy cập website chính thức.
6. Nhấn ★ để lưu công cụ thường dùng trên trình duyệt hiện tại.

## ⚖️ Sử dụng OSINT có trách nhiệm

OSINT không đồng nghĩa với quyền truy cập không giới hạn.

Hãy:

- chỉ sử dụng dữ liệu công khai hoặc dữ liệu bạn có quyền truy cập;
- tuân thủ pháp luật, điều khoản dịch vụ và quyền riêng tư;
- xác minh chéo trước khi đưa ra kết luận;
- không dùng danh mục cho quấy rối, doxxing, xâm nhập trái phép hoặc thu thập dữ liệu nhạy cảm bất hợp pháp.

## 📚 Nguồn & ghi nhận

**Phiên bản Việt hóa / tuyển chọn: Do Long Ngo sưu tầm và cập nhật.**

Bộ dữ liệu mở rộng có tham khảo **OSINT Tools Library / OSINT Newsletter** từ mã nguồn GitBook được cung cấp cho lần cập nhật này. Repository chỉ lấy dữ liệu directory cần thiết như tên công cụ, liên kết và phân loại, sau đó tổ chức lại và viết phần mô tả ngắn bằng tiếng Việt.

Tên sản phẩm, logo, nhãn hiệu, nội dung website và giấy phép của từng công cụ thuộc về chủ sở hữu tương ứng.

## 📄 License

Mã dashboard của repository này được phát hành theo **MIT License**.

MIT của dashboard **không thay thế hoặc mở rộng giấy phép của các dự án / website bên thứ ba** được liệt kê trong danh mục.

---

<div align="center">

**OSINT Master Toolkit v2 · Base27-CVNSS · 2026**

🧭 **Do Long Ngo sưu tầm và cập nhật**

**Vietnamese Edition • Open Source Community • Responsible OSINT**

</div>
