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
        <p className="thank-you-community__lead">
          Cảm ơn ba mẹ đã đăng ký tham gia hội thảo cùng TeenCare.
        </p>

        <a href="/">
          <span>Trở về trang chủ</span>
        </a>
      </section>
    </main>
  );
}
