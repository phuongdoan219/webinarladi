import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaCalendarDays,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaCircleCheck,
  FaClock,
  FaDesktop,
  FaEnvelope,
  FaFacebookF,
  FaHeart,
  FaLaptop,
  FaLock,
  FaPhone,
  FaSeedling,
  FaUserGroup,
} from "react-icons/fa6";

const eventDetails = [
  { icon: FaCalendarDays, label: "Ngày tổ chức", value: "[Ngày tổ chức]" },
  { icon: FaClock, label: "Thời gian", value: "[Thời gian]" },
  { icon: FaDesktop, label: "Nền tảng", value: "[Nền tảng]" },
];

const compactEventDetails = [
  { icon: FaCalendarDays, value: "Chủ nhật tuần này" },
  { icon: FaClock, value: "20:00 - 21:30" },
  { icon: FaLaptop, value: "Google Meet" },
];

function CompactEventInfo({ className = "" }) {
  return (
    <div className={`compact-event-info ${className}`.trim()} aria-label="Thông tin hội thảo">
      {compactEventDetails.map(({ icon: Icon, value }, index) => (
        <div className="compact-event-item" key={value}>
          {index > 0 && <span className="compact-event-separator" aria-hidden="true" />}
          <Icon aria-hidden="true" />
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

const problems = [
  {
    crop: "problem-photo--one",
    imageLabel: "Mẹ muốn trò chuyện nhưng con ngày càng ít chia sẻ",
    title: "CON NGÀY CÀNG ÍT CHIA SẺ?",
    body: "Con vẫn nói “Con bình thường”, nhưng lại dễ cáu, đóng cửa nhiều hơn và không còn kể những chuyện trước đây từng kể.",
  },
  {
    crop: "problem-photo--two",
    imageLabel: "Mẹ nhắc nhở con nhưng con phản ứng và chống đối",
    title: "CÀNG NHẮC, CON CÀNG CHỐNG ĐỐI?",
    body: "Học bài, ngủ đúng giờ hay bớt điện thoại trở thành những cuộc giằng co lặp lại mỗi ngày.",
  },
  {
    crop: "problem-photo--three",
    imageLabel: "Phụ huynh băn khoăn chưa hiểu vấn đề thật sự của con",
    title: "KHÔNG BIẾT VẤN ĐỀ THẬT SỰ NẰM Ở ĐÂU?",
    body: "Lười học, mê điện thoại hay thiếu tự giác có thể chỉ là biểu hiện bên ngoài của một vấn đề sâu hơn.",
  },
];

const outcomes = [
  {
    icon: FaHeart,
    title: "ĐỌC LÝ TRÍ, CHẠM TRÁI TIM",
    body: "Hiểu động lực, nỗi sợ và niềm tin để chọn cách nói con sẵn sàng đón nhận.",
  },
  {
    icon: FaSeedling,
    title: "NHÌN CÂY, HIỂU ĐẤT",
    body: "Nhìn qua hành vi bề mặt để nhận ra gốc rễ con đang cần bồi đắp.",
  },
  {
    icon: FaChartLine,
    title: "TIẾN BỘ NHỎ, THAY ĐỔI LỚN",
    body: "Ghi nhận đúng lúc để nuôi động lực và hình thành thói quen bền vững.",
  },
];

const credentials = [
  "Nhà sáng lập, Chủ tịch Tổ chức Thúc đẩy Bình đẳng giới Việt Nam VOGE.",
  "Chuyên gia nuôi dạy trẻ tại chương trình ‘Chuyện nhà’ – VTV1.",
  "Cố vấn, chủ biên giáo trình và tác giả nhiều đầu sách về giáo dục giới tính, tuổi dậy thì và đồng hành cùng con.",
];

const additionalExperts = [
  {
    src: "/assets/expert-giang-dang.png",
    alt: "Hồ sơ Cô Giang Đặng, Hiệu trưởng, cùng kinh nghiệm chuyên môn và hoạt động giáo dục",
  },
  {
    src: "/assets/expert-tu-nguyen.png",
    alt: "Hồ sơ Thầy Tú Nguyễn, Mentor, cùng học vấn và kinh nghiệm hoạt động về giới",
  },
];

const experts = [
  {
    name: "CÔ HOÀNG LINH",
    role: "NHÀ SÁNG LẬP TEENCARE",
    image: "/assets/expert-hoang-linh-gradient.png",
    imageAlt: "Chân dung Cô Hoàng Linh",
    credentials: [
      "Nhà sáng lập, Chủ tịch Tổ chức Thúc đẩy Bình đẳng giới Việt Nam VOGE.",
      "Chuyên gia nuôi dạy trẻ tại chương trình ‘Chuyện nhà’ – VTV1.",
      "Cố vấn, chủ biên giáo trình và tác giả nhiều đầu sách về giáo dục giới tính, tuổi dậy thì và đồng hành cùng con.",
    ],
  },
  {
    name: "CÔ GIANG ĐẶNG",
    role: "HIỆU TRƯỞNG",
    image: "/assets/expert-giang-dang-gradient.png",
    imageAlt: "Chân dung Cô Giang Đặng",
    credentials: [
      "Chuyên gia cố vấn hàng loạt dự án: FEMALE LEAD - đối tác Bộ Ngoại giao Hoa Kỳ, Nhà Nhiều Cột - đối tác chính phủ Úc...",
      "Giảng viên GDGT tại các chương trình: Youth Voice 2019, VISEO 2019, WeFree 2016 - 2021, GNI 2021...",
      "Tham vấn viên, Hội nghị Quốc gia về sửa đổi luật BĐG Việt Nam 2022",
      "Cựu Giám đốc Nội dung Tổ chức Thúc đẩy Bình đẳng giới Việt Nam",
      "Học bổng chính phủ Canada SEED - Á Khoa Khoa Quản trị, Đại học Kinh tế Quốc dân",
      "Đại học Royal Road, Canada, chuyên ngành Giáo dục vì mục tiêu phát triển bền vững",
    ],
  },
  {
    name: "THẦY TÚ NGUYỄN",
    role: "MENTOR",
    image: "/assets/expert-tu-nguyen-gradient.png",
    imageAlt: "Chân dung Thầy Tú Nguyễn",
    credentials: [
      "Thạc sĩ Giáo dục tại Đại học College London, London, Vương quốc Anh",
      "Học giả tại ĐH Brown, Hoa Kỳ",
      "Học bổng YSEALI, Bộ Ngoại giao Hoa Kỳ",
      "Học bổng chính phủ Anh Chevening",
      "Nhà hoạt động về Giới từ năm 2016",
    ],
  },
];

export function App() {
  const formRef = useRef(null);
  const problemCarouselRef = useRef(null);
  const problemSlideRefs = useRef([]);
  const carouselRef = useRef(null);
  const expertSlideRefs = useRef([]);
  const [submitted, setSubmitted] = useState(false);
  const [activeProblem, setActiveProblem] = useState(0);
  const [problemCarouselHeight, setProblemCarouselHeight] = useState(null);
  const [activeExpert, setActiveExpert] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(null);

  useEffect(() => {
    function updateProblemHeight() {
      const activeSlide = problemSlideRefs.current[activeProblem];
      if (activeSlide) setProblemCarouselHeight(activeSlide.offsetHeight);
    }

    const frame = requestAnimationFrame(updateProblemHeight);
    window.addEventListener("resize", updateProblemHeight);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateProblemHeight);
    };
  }, [activeProblem]);

  useEffect(() => {
    function updateHeight() {
      const activeSlide = expertSlideRefs.current[activeExpert];
      if (activeSlide) setCarouselHeight(activeSlide.offsetHeight);
    }

    const frame = requestAnimationFrame(updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateHeight);
    };
  }, [activeExpert]);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function goToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitForm(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function showProblem(index) {
    const nextIndex = (index + problems.length) % problems.length;
    setActiveProblem(nextIndex);
    const carousel = problemCarouselRef.current;
    carousel?.scrollTo({ left: carousel.clientWidth * nextIndex, behavior: "smooth" });
  }

  function syncProblemSlide() {
    const carousel = problemCarouselRef.current;
    if (!carousel) return;
    const nextIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    setActiveProblem(Math.max(0, Math.min(problems.length - 1, nextIndex)));
  }

  function showExpert(index) {
    const nextIndex = (index + experts.length) % experts.length;
    setActiveExpert(nextIndex);
    const carousel = carouselRef.current;
    carousel?.scrollTo({ left: carousel.clientWidth * nextIndex, behavior: "smooth" });
  }

  function syncExpertSlide() {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const nextIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
    setActiveExpert(Math.max(0, Math.min(experts.length - 1, nextIndex)));
  }

  return (
    <main className="landing-page" id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-decor" aria-hidden="true">
          <span className="hero-orb hero-orb--one" />
          <span className="hero-orb hero-orb--two" />
          <span className="hero-spark hero-spark--one">✦</span>
          <span className="hero-spark hero-spark--two">✦</span>
        </div>
        <div className="hero-header">
          <a className="brand" href="#top" aria-label="TeenCare">
            <img src="/assets/teencare-logo-official.png" alt="TeenCare" />
          </a>
          <button className="hero-header-cta" type="button" onClick={goToForm}>ĐĂNG KÝ NGAY</button>
        </div>

        <p className="eyebrow">HỘI THẢO TRỰC TUYẾN DÀNH CHO PHỤ HUYNH</p>

        <h1 id="hero-title">
          ĐỒNG HÀNH CÙNG CON<br />
          TUỔI DẬY THÌ<br />
          <span>TRONG THỜI ĐẠI AI</span>
        </h1>
        <div className="heading-rule" aria-hidden="true"></div>

        <p className="hero-copy">
          Đừng chỉ sửa hành vi ba mẹ nhìn thấy. Hãy hiểu đúng điều đang diễn ra bên trong để biết nên nói gì và làm gì tiếp theo.
        </p>

        <CompactEventInfo />

        <button className="cta-button" type="button" onClick={goToForm}>
          <span>ĐĂNG KÝ THAM GIA</span><FaArrowRight aria-hidden="true" />
        </button>

        <figure className="hero-mother-image">
          <img src="/assets/hero-mother-daughter-tablet.png" alt="Người mẹ và con gái tuổi teen tươi cười, cùng sử dụng máy tính bảng" />
        </figure>
      </section>

      <section className="content-section problems-section reveal-on-scroll" aria-labelledby="problems-title">
        <div className="section-heading">
          <h2 id="problems-title">BA MẸ CÓ ĐANG...?</h2>
          <div className="heading-rule" aria-hidden="true"></div>
        </div>

        <div className="problem-carousel-shell">
          <div className="problem-carousel-frame">
            <div
              className="problem-carousel"
              ref={problemCarouselRef}
              onScroll={syncProblemSlide}
              style={problemCarouselHeight ? { height: `${problemCarouselHeight}px` } : undefined}
              aria-label="Những vấn đề ba mẹ thường gặp khi đồng hành cùng con"
            >
              {problems.map((problem, index) => (
                <article
                  className="story-card problem-slide-card"
                  key={problem.title}
                  ref={(node) => { problemSlideRefs.current[index] = node; }}
                  aria-label={`${index + 1} trên ${problems.length}: ${problem.title}`}
                >
                  <div className={`source-crop problem-photo ${problem.crop}`} role="img" aria-label={problem.imageLabel}>
                    <img src="/assets/section-problems.png" alt="" />
                  </div>
                  <div className="story-copy">
                    <h3>{problem.title}</h3>
                    <span className="mini-rule" aria-hidden="true"></span>
                    <p>{problem.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" className="problem-carousel-arrow is-prev" onClick={() => showProblem(activeProblem - 1)} aria-label="Xem vấn đề trước">
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="problem-carousel-arrow is-next" onClick={() => showProblem(activeProblem + 1)} aria-label="Xem vấn đề tiếp theo">
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="problem-carousel-dots" aria-label="Chọn vấn đề">
            {problems.map((problem, index) => (
              <button
                type="button"
                key={problem.title}
                className={activeProblem === index ? "is-active" : ""}
                onClick={() => showProblem(index)}
                aria-label={`Xem vấn đề ${index + 1}`}
                aria-current={activeProblem === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <aside className="parent-note">
          <span className="parent-note__icon"><FaHeart /></span>
          <p>Nếu ba mẹ đã thử nhiều cách nhưng vẫn chưa biết cách nào thực sự phù hợp với con, đây là hội thảo dành cho ba mẹ.</p>
        </aside>
      </section>

      <section className="content-section outcomes-section reveal-on-scroll" aria-labelledby="outcomes-title">
        <div className="section-heading">
          <h2 id="outcomes-title">SAU HỘI THẢO, BA MẸ NẮM ĐƯỢC GÌ?</h2>
          <div className="heading-rule" aria-hidden="true"></div>
        </div>

        <div className="stack-list">
          {outcomes.map(({ icon: Icon, title, body }) => (
            <article className="outcome-card" key={title}>
              <span className="outcome-icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

      </section>

      <section className="content-section expert-section reveal-on-scroll" aria-labelledby="expert-section-title">
        <div className="section-heading">
          <h2 id="expert-section-title">ĐỘI NGŨ CHUYÊN GIA ĐỒNG HÀNH CÙNG BA MẸ</h2>
          <div className="heading-rule" aria-hidden="true"></div>
        </div>

        <div className="expert-carousel-shell">
          <div className="expert-carousel-frame">
            <div
              className="expert-carousel"
              ref={carouselRef}
              onScroll={syncExpertSlide}
              style={carouselHeight ? { height: `${carouselHeight}px` } : undefined}
              aria-label="Danh sách chuyên gia TeenCare"
            >
              {experts.map((expert, index) => (
                <article
                  className="expert-slide-card"
                  key={expert.name}
                  ref={(node) => { expertSlideRefs.current[index] = node; }}
                  aria-label={`${expert.name}, ${expert.role}`}
                >
                  <div className="expert-slide-photo">
                    <img
                      src={expert.image}
                      alt={expert.imageAlt}
                      onLoad={() => {
                        if (index === activeExpert) setCarouselHeight(expertSlideRefs.current[index]?.offsetHeight ?? null);
                      }}
                    />
                    <span className="expert-number" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <div className="expert-slide-copy">
                    <h3>{expert.name}</h3>
                    <p className="expert-slide-role">{expert.role}</p>
                    <ul>
                      {expert.credentials.map((item) => (
                        <li key={item}><FaCircleCheck aria-hidden="true" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" className="expert-carousel-edge-arrow is-prev" onClick={() => showExpert(activeExpert - 1)} aria-label="Xem chuyên gia trước">
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="expert-carousel-edge-arrow is-next" onClick={() => showExpert(activeExpert + 1)} aria-label="Xem chuyên gia tiếp theo">
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="expert-carousel-controls">
            <div className="carousel-dots" aria-label="Chọn chuyên gia">
              {experts.map((expert, index) => (
                <button
                  type="button"
                  key={expert.name}
                  className={activeExpert === index ? "is-active" : ""}
                  onClick={() => showExpert(index)}
                  aria-label={`Xem hồ sơ ${expert.name}`}
                  aria-current={activeExpert === index ? "true" : undefined}
                />
              ))}
            </div>
          </div>
          <p className="carousel-hint">Vuốt ngang để xem các chuyên gia</p>
        </div>

        {false && <>
        <article className="expert-card">
          <div className="source-crop expert-photo" role="img" aria-label="Chân dung cô Hoàng Linh, nhà sáng lập TeenCare">
            <img src="/assets/section-expert.png" alt="" />
          </div>
          <div className="expert-copy">
            <h3>CÔ HOÀNG LINH</h3>
            <p className="expert-role">NHÀ SÁNG LẬP TEENCARE</p>
            <ul>
              {credentials.map((item) => <li key={item}><FaCircleCheck aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </div>
        </article>

        <div className="additional-experts" aria-label="Các chuyên gia đồng hành khác">
          {additionalExperts.map((expert) => (
            <article className="reference-expert-card" key={expert.src}>
              <img src={expert.src} alt={expert.alt} />
            </article>
          ))}
        </div>
        </>}
      </section>

      <section className="registration-section reveal-on-scroll" id="dang-ky" ref={formRef} aria-labelledby="registration-title">
        <div className="section-heading">
          <h2 id="registration-title">GIỮ CHỖ THAM GIA HỘI THẢO</h2>
          <div className="heading-rule" aria-hidden="true"></div>
        </div>

        <CompactEventInfo className="registration-event-list" />

        {submitted ? (
          <div className="success-card" role="status">
            <span><FaCircleCheck /></span>
            <h3>Đăng ký thành công!</h3>
            <p>TeenCare sẽ liên hệ và gửi thông tin hội thảo đến ba mẹ ngay khi lịch được xác nhận.</p>
            <button type="button" onClick={() => setSubmitted(false)}>Chỉnh sửa thông tin</button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={submitForm}>
            <label>
              <span>Họ và tên phụ huynh <b>*</b></span>
              <span className="input-wrap"><FaUserGroup /><input name="parentName" required placeholder="Nhập họ và tên của ba/mẹ" /></span>
            </label>
            <label>
              <span>Số điện thoại <b>*</b></span>
              <span className="input-wrap"><FaPhone /><input name="phone" required inputMode="tel" placeholder="Nhập số điện thoại nhận thông tin hội thảo" /></span>
            </label>
            <label>
              <span>Email</span>
              <span className="input-wrap"><FaEnvelope /><input name="email" type="email" placeholder="Không bắt buộc" /></span>
            </label>
            <label>
              <span>Ba mẹ kỳ vọng điều gì khi tham gia hội thảo? <b>*</b></span>
              <textarea name="expectation" required placeholder="Ví dụ: Tôi muốn hiểu vì sao con ngày càng ít chia sẻ và biết cách trò chuyện để con sẵn sàng mở lòng hơn." />
            </label>
            <button className="submit-button" type="submit">XÁC NHẬN THAM GIA <FaArrowRight /></button>
            <p className="consent-note"><FaLock /> Bằng việc đăng ký, ba mẹ đồng ý để TeenCare liên hệ và gửi thông tin liên quan đến hội thảo.</p>
          </form>
        )}
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" aria-label="TeenCare - về đầu trang">
          <img src="/assets/teencare-logo-official.png" alt="TeenCare" />
          <img className="footer-brand__light" src="/assets/teencare-logo-official.png" alt="" aria-hidden="true" />
        </a>

        <div className="footer-social">
          <strong>Theo dõi chúng tôi:</strong>
          <a href="https://www.facebook.com/teencare.vn" target="_blank" rel="noreferrer" aria-label="Theo dõi TeenCare trên Facebook">
            <FaFacebookF aria-hidden="true" />
          </a>
        </div>

        <div className="footer-columns">
          <section className="footer-column" aria-labelledby="footer-about-title">
            <h2 id="footer-about-title">Về chúng tôi</h2>
            <ul>
              <li>Hệ sinh thái</li>
              <li>Hướng dẫn thanh toán</li>
              <li>Bảng giá</li>
              <li>Liên hệ</li>
              <li>Tuyển dụng</li>
              <li>Điều khoản dịch vụ</li>
            </ul>
          </section>

          <section className="footer-column" aria-labelledby="footer-office-title">
            <h2 id="footer-office-title">Văn phòng</h2>
            <address>
              <span>TP. Hà Nội (Trụ sở chính)</span>
              <span>Philippines</span>
              <span>Singapore</span>
            </address>
          </section>
        </div>

        <section className="footer-contact" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Liên hệ</h2>
          <address>
            <span>Hotline: 1900 099 900</span>
            <span>Email: info@teencare.vn</span>
          </address>
        </section>

        <p className="footer-copyright">©2026 by TeenCare VietNam</p>
      </footer>

      <button className="sticky-cta" type="button" onClick={goToForm} aria-label="Đăng ký tham gia hội thảo">
        <span>ĐĂNG KÝ NGAY</span>
        <FaArrowRight aria-hidden="true" />
      </button>
    </main>
  );
}
