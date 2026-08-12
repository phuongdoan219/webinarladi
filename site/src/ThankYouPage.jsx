import { useEffect } from "react";
import {
  FaCalendarCheck,
  FaCircleCheck,
  FaClock,
  FaFacebookF,
  FaLaptop,
} from "react-icons/fa6";

const sessionLabels = {
  "thu-5": "Thứ 5",
  "chu-nhat": "Chủ nhật",
  "ca-2": "Cả 2 buổi",
};

export function ThankYouPage() {
  const session = new URLSearchParams(window.location.search).get("session");
  const sessionLabel = sessionLabels[session] || "Buổi đã đăng ký";

  useEffect(() => {
    document.title = "Đăng ký thành công | TeenCare Webinar";
  }, []);

  return (
    <main className="thank-you-page">
      <div className="thank-you-glow thank-you-glow--one" aria-hidden="true" />
      <div className="thank-you-glow thank-you-glow--two" aria-hidden="true" />

      <header className="thank-you-header">
        <a href="/" aria-label="TeenCare - về trang chủ">
          <img src="/assets/teencare-logo-official-opt-f528fa8c.webp" width="400" height="141" alt="TeenCare" />
        </a>
      </header>

      <section className="thank-you-hero" aria-labelledby="thank-you-title">
        <div className="thank-you-check" aria-hidden="true">
          <FaCircleCheck />
        </div>
        <p className="thank-you-kicker">ĐĂNG KÝ THÀNH CÔNG</p>
        <h1 id="thank-you-title">Cảm ơn ba mẹ!</h1>
        <p className="thank-you-intro">
          TeenCare đã nhận thông tin đăng ký của ba mẹ.
        </p>

        <div className="thank-you-event" aria-label="Thông tin buổi hội thảo đã đăng ký">
          <div>
            <FaCalendarCheck aria-hidden="true" />
            <span>Buổi tham gia</span>
            <strong>{sessionLabel}</strong>
          </div>
          <div>
            <FaClock aria-hidden="true" />
            <span>Thời gian</span>
            <strong>20:00 - 21:00</strong>
          </div>
          <div>
            <FaLaptop aria-hidden="true" />
            <span>Hình thức</span>
            <strong>Google Meet</strong>
          </div>
        </div>

        <div className="thank-you-note">
          TeenCare sẽ liên hệ xác nhận và gửi link tham gia trước buổi hội thảo.
        </div>

        <div className="thank-you-actions">
          <a
            className="thank-you-primary"
            href="https://www.facebook.com/teencare.vn"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF aria-hidden="true" /> THEO DÕI TEENCARE
          </a>
          <a className="thank-you-secondary" href="/">VỀ TRANG CHỦ</a>
        </div>
      </section>
    </main>
  );
}
