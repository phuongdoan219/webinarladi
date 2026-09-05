import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export function ThankYouPage() {
  useEffect(() => {
    document.title = "Đăng ký thành công | TeenCare Webinar";
  }, []);

  return (
    <main className="thank-you-page">
      <div className="thank-you-ambient" aria-hidden="true">
        <span className="thank-you-orb thank-you-orb--one" />
        <span className="thank-you-orb thank-you-orb--two" />
        <span className="thank-you-spark thank-you-spark--one">✦</span>
        <span className="thank-you-spark thank-you-spark--two">✦</span>
        <span className="thank-you-spark thank-you-spark--three">✦</span>
      </div>

      <section className="thank-you-community" aria-labelledby="thank-you-title">
        <div className="thank-you-success-mark" aria-hidden="true">
          <span className="thank-you-success-ring" />
          <FaCircleCheck />
        </div>

        <h1 id="thank-you-title">Đăng ký thành công!</h1>

        <div className="thank-you-community__invite">
          <p>
          Ba mẹ hãy tham gia cộng đồng TeenCare Webinar để nhận thông tin mới nhất và những tài liệu nuôi dạy con độc quyền nhé.
          </p>

          <div className="thank-you-benefits" aria-label="Quyền lợi khi tham gia cộng đồng">
            <span><FaCircleCheck aria-hidden="true" /> Thông báo mới nhất</span>
            <span><FaCircleCheck aria-hidden="true" /> Tài liệu độc quyền</span>
          </div>
        </div>

        <a
          href="https://zalo.me/g/uwherfzua8dpbgkbiq6t"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/assets/zalo-app-icon.jpg" width="512" height="512" alt="" aria-hidden="true" />
          <span>Tham Gia Ngay!</span>
        </a>

        <p className="thank-you-community__closing">Hẹn gặp ba mẹ trong cộng đồng TeenCare Webinar <span aria-hidden="true">♥</span></p>
      </section>
    </main>
  );
}
