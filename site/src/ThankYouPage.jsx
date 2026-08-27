import { useEffect } from "react";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";

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

        <p className="thank-you-community__kicker">TEENCARE ĐÃ NHẬN ĐĂNG KÝ CỦA BA MẸ</p>
        <h1 id="thank-you-title">Đăng ký thành công!</h1>
        <p className="thank-you-community__lead">
          Một bước nhỏ hôm nay, thêm thật nhiều cơ hội để thấu hiểu và đồng hành cùng con.
        </p>

        <div className="thank-you-community__invite">
          <strong>Đừng bỏ lỡ bước cuối cùng</strong>
          <p>
          Ba mẹ hãy tham gia cộng đồng TeenCare Webinar để nhận thông tin mới nhất và những tài liệu nuôi dạy con độc quyền
          </p>

          <div className="thank-you-benefits" aria-label="Quyền lợi khi tham gia cộng đồng">
            <span><FaCircleCheck aria-hidden="true" /> Thông báo mới nhất</span>
            <span><FaCircleCheck aria-hidden="true" /> Tài liệu độc quyền</span>
          </div>
        </div>

        <a
          href="https://zalo.me/g/dn2o6scsnu33cg2ydrht"
          target="_blank"
          rel="noreferrer"
        >
          <span>VÀO NHÓM ZALO NGAY</span>
          <FaArrowRight aria-hidden="true" />
        </a>

        <p className="thank-you-community__closing">Hẹn gặp ba mẹ trong cộng đồng TeenCare Webinar <span aria-hidden="true">♥</span></p>
      </section>
    </main>
  );
}
