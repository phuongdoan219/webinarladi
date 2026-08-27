import { useEffect } from "react";

export function ThankYouPage() {
  useEffect(() => {
    document.title = "Đăng ký thành công | TeenCare Webinar";
  }, []);

  return (
    <main className="thank-you-page">
      <section className="thank-you-community" aria-labelledby="thank-you-title">
        <h1 id="thank-you-title">Đăng ký thành công</h1>
        <p>
          Ba mẹ hãy tham gia cộng đồng TeenCare Webinar để nhận thông tin mới nhất và những tài liệu nuôi dạy con độc quyền
        </p>
        <a
          href="https://zalo.me/g/dn2o6scsnu33cg2ydrht"
          target="_blank"
          rel="noreferrer"
        >
          THAM GIA CỘNG ĐỒNG TEENCARE WEBINAR
        </a>
      </section>
    </main>
  );
}
