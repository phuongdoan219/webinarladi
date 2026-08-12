import { useEffect } from "react";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCircleCheck,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaLaptop,
  FaPhone,
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
          <img src="/assets/teencare-logo-official.png" alt="TeenCare" />
        </a>
      </header>

      <section className="thank-you-hero" aria-labelledby="thank-you-title">
        <div className="thank-you-check" aria-hidden="true">
          <FaCircleCheck />
        </div>
        <p className="thank-you-kicker">ĐĂNG KÝ THÀNH CÔNG</p>
        <h1 id="thank-you-title">Cảm ơn ba mẹ đã đăng ký!</h1>
        <p className="thank-you-intro">
          TeenCare đã nhận được thông tin. Đội ngũ sẽ liên hệ để xác nhận lịch và gửi đường dẫn tham gia hội thảo đến ba mẹ.
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
      </section>

      <section className="thank-you-next" aria-labelledby="next-steps-title">
        <p className="thank-you-section-label">TIẾP THEO SẼ NHƯ THẾ NÀO?</p>
        <h2 id="next-steps-title">Ba mẹ vui lòng để ý điện thoại và email</h2>

        <ol className="thank-you-steps">
          <li>
            <span><FaPhone aria-hidden="true" /></span>
            <div>
              <strong>TeenCare xác nhận đăng ký</strong>
              <p>Đội ngũ sẽ liên hệ theo số điện thoại ba mẹ đã cung cấp.</p>
            </div>
          </li>
          <li>
            <span><FaEnvelope aria-hidden="true" /></span>
            <div>
              <strong>Nhận thông tin tham gia</strong>
              <p>Đường dẫn Google Meet và nhắc lịch sẽ được gửi trước buổi hội thảo.</p>
            </div>
          </li>
        </ol>

        <div className="thank-you-note">
          <strong>Lưu ý nhỏ</strong>
          <p>Nếu chưa thấy thông tin, ba mẹ hãy kiểm tra cả mục Tin nhắn rác hoặc Spam trong email nhé.</p>
        </div>

        <div className="thank-you-actions">
          <a className="thank-you-primary" href="/">
            VỀ TRANG CHỦ <FaArrowRight aria-hidden="true" />
          </a>
          <a
            className="thank-you-secondary"
            href="https://www.facebook.com/teencare.vn"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF aria-hidden="true" /> THEO DÕI TEENCARE
          </a>
        </div>
      </section>

      <footer className="thank-you-footer">
        <p>Cần hỗ trợ? Liên hệ TeenCare qua hotline <strong>1900 099 900</strong></p>
      </footer>
    </main>
  );
}
