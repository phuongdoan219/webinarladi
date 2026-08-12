# Cấu hình tracking TeenCare Webinar

## Biến môi trường production

- `VITE_GTM_ID`: ID container Google Tag Manager, dạng `GTM-XXXXXXX`.
- `VITE_META_PIXEL_ID`: ID Meta Pixel chỉ gồm chữ số.
- `VITE_GA4_ID`: phương án GA4 trực tiếp nếu không dùng GTM.

Nếu có `VITE_GTM_ID`, mã nguồn không tải GA4 trực tiếp để tránh đếm hai lần. Hãy tạo Google tag trong GTM, nhập Measurement ID `G-...` và dùng trigger `Initialization - All Pages`.

## Sự kiện được đẩy sẵn

| Data Layer event | Ý nghĩa | Meta event |
| --- | --- | --- |
| `registration_cta_click` | Người dùng nhấn CTA đăng ký | `RegistrationCtaClick` (custom) |
| `generate_lead` | API đã lưu đăng ký thành công | `Lead` |

`generate_lead` có `event_id`, `webinar_session` và thông tin UTM/click ID nếu URL có cung cấp. Không đưa họ tên, số điện thoại hoặc email vào pixel/data layer.

## Cấu hình trong GTM

1. Tạo Google tag với Measurement ID GA4 và trigger `Initialization - All Pages`.
2. Tạo GA4 Event tag cho `registration_cta_click`, trigger Custom Event cùng tên.
3. Tạo GA4 Event tag cho `generate_lead`, trigger Custom Event cùng tên.
4. Tạo Data Layer Variable cho `cta_source`, `webinar_session`, `event_id` và các trường `utm_*` cần báo cáo.
5. Dùng Tag Assistant Preview để xác nhận mỗi sự kiện chỉ chạy một lần, sau đó publish container.

Meta Pixel được mã nguồn tải trực tiếp. Dùng Meta Pixel Helper và Events Manager Test Events để xác nhận `PageView`, `RegistrationCtaClick` và `Lead`.
