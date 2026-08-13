# Cấu hình tracking TeenCare Webinar

## Biến môi trường production

- `VITE_GTM_ID`: ID container Google Tag Manager, dạng `GTM-XXXXXXX`.
- `VITE_META_PIXEL_ID`: ID Meta Pixel chỉ gồm chữ số.
- `VITE_GA4_ID`: phương án GA4 trực tiếp nếu không dùng GTM.
- `META_PIXEL_ID`: cùng ID Pixel, dùng riêng ở API phía máy chủ.
- `META_CAPI_ACCESS_TOKEN`: token Conversion API, chỉ lưu dưới dạng secret trên hosting; tuyệt đối không dùng tiền tố `VITE_`.
- `META_GRAPH_API_VERSION`: phiên bản Graph API, mặc định `v23.0`.
- `META_TEST_EVENT_CODE`: không bắt buộc, chỉ bật trong lúc kiểm tra bằng Test Events.

Nếu có `VITE_GTM_ID`, mã nguồn không tải GA4 trực tiếp để tránh đếm hai lần. Hãy tạo Google tag trong GTM, nhập Measurement ID `G-...` và dùng trigger `Initialization - All Pages`.

## Sự kiện được đẩy sẵn

| Data Layer event | Ý nghĩa | Meta event |
| --- | --- | --- |
| `registration_cta_click` | Người dùng nhấn CTA đăng ký | `RegistrationCtaClick` (custom) |
| `generate_lead` | API đã lưu đăng ký thành công | `Lead` |

`generate_lead` có `event_id`, `webinar_session` và thông tin UTM/click ID nếu URL có cung cấp. Không đưa họ tên, số điện thoại hoặc email vào pixel/data layer.

Liên kết quảng cáo chuẩn phải dùng dấu `?`, ví dụ `https://webinar.teencare.vn/?utm_source=FB&utm_medium=CVS`. Mã nguồn cũng tự sửa dạng cũ `/utm_source=...` để các quảng cáo đã tạo không bị mất nguồn. API gửi cả URL landing page và tên trường UTM dạng chuẩn/camelCase để tương thích với Google Apps Script.

## Cấu hình trong GTM

1. Tạo Google tag với Measurement ID GA4 và trigger `Initialization - All Pages`.
2. Tạo GA4 Event tag cho `registration_cta_click`, trigger Custom Event cùng tên.
3. Tạo GA4 Event tag cho `generate_lead`, trigger Custom Event cùng tên.
4. Tạo Data Layer Variable cho `cta_source`, `webinar_session`, `event_id` và các trường `utm_*` cần báo cáo.
5. Dùng Tag Assistant Preview để xác nhận mỗi sự kiện chỉ chạy một lần, sau đó publish container.

Meta Pixel được mã nguồn tải trực tiếp. Dùng Meta Pixel Helper và Events Manager Test Events để xác nhận `PageView`, `RegistrationCtaClick` và `Lead`.

Sự kiện `Lead` phía trình duyệt và máy chủ dùng chung `event_id` để Meta loại bỏ bản ghi trùng. Email và số điện thoại được chuẩn hóa, băm SHA-256 ở API trước khi gửi; token không bao giờ được đưa xuống trình duyệt. Sau khi kiểm tra xong, xóa `META_TEST_EVENT_CODE` để chuyển sang dữ liệu production.
