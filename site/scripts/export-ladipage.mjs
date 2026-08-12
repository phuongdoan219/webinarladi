import { mkdir, copyFile, readFile, rm, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const outputRoot = resolve(root, "exports");
const packageRoot = resolve(outputRoot, "teencare-webinar-ladipage-package");
const publicAssets = resolve(root, "public", "assets");

const mimeTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const interactionScript = String.raw`
(() => {
  const initialize = () => {
    const formSection = document.querySelector("#dang-ky");
    const scrollToForm = () => formSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    document.querySelectorAll(".hero-header-cta, .cta-button, .sticky-cta").forEach((button) => {
      button.addEventListener("click", scrollToForm);
    });

    const setupCarousel = ({ carousel, slide, previous, next, dots }) => {
      const track = document.querySelector(carousel);
      if (!track) return;

      const slides = [...track.querySelectorAll(slide)];
      const dotButtons = [...document.querySelectorAll(dots)];
      const previousButton = document.querySelector(previous);
      const nextButton = document.querySelector(next);
      let activeIndex = 0;
      let syncFrame = 0;

      const update = (index, shouldScroll = true) => {
        activeIndex = (index + slides.length) % slides.length;
        if (shouldScroll) {
          track.scrollTo({ left: track.clientWidth * activeIndex, behavior: "smooth" });
        }
        dotButtons.forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === activeIndex);
          if (dotIndex === activeIndex) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
        });
        const activeSlide = slides[activeIndex];
        if (activeSlide) track.style.height = activeSlide.offsetHeight + "px";
      };

      previousButton?.addEventListener("click", () => update(activeIndex - 1));
      nextButton?.addEventListener("click", () => update(activeIndex + 1));
      dotButtons.forEach((dot, index) => dot.addEventListener("click", () => update(index)));
      track.addEventListener("scroll", () => {
        cancelAnimationFrame(syncFrame);
        syncFrame = requestAnimationFrame(() => {
          const nextIndex = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
          update(Math.max(0, Math.min(slides.length - 1, nextIndex)), false);
        });
      }, { passive: true });
      window.addEventListener("resize", () => update(activeIndex, false));
      track.querySelectorAll("img").forEach((image) => image.addEventListener("load", () => update(activeIndex, false)));
      requestAnimationFrame(() => update(0, false));
    };

    setupCarousel({
      carousel: ".problem-carousel",
      slide: ".problem-slide-card",
      previous: ".problem-carousel-arrow.is-prev",
      next: ".problem-carousel-arrow.is-next",
      dots: ".problem-carousel-dots button",
    });

    setupCarousel({
      carousel: ".expert-carousel",
      slide: ".expert-slide-card",
      previous: ".expert-carousel-edge-arrow.is-prev",
      next: ".expert-carousel-edge-arrow.is-next",
      dots: ".carousel-dots button",
    });

    const revealTargets = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealTargets.forEach((target) => observer.observe(target));
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
`;

function buildDocument({ markup, css }) {
  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Webinar TeenCare dành cho phụ huynh đồng hành cùng con tuổi dậy thì trong thời đại AI." />
    <meta name="generator" content="TeenCare HTML export for LadiPage" />
    <title>TeenCare Webinar | Đồng hành cùng con tuổi dậy thì</title>
    <style>${css}</style>
    <noscript><style>.reveal-on-scroll{opacity:1!important;transform:none!important}</style></noscript>
  </head>
  <body>
    ${markup}
    <script>${interactionScript.replaceAll("</script>", "<\\/script>")}</script>
  </body>
</html>
`;
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(resolve(packageRoot, "assets"), { recursive: true });

const vite = await createServer({
  configFile: resolve(root, "vite.config.mjs"),
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

let markup;
try {
  const { App } = await vite.ssrLoadModule("/src/App.jsx");
  markup = renderToStaticMarkup(createElement(App));
} finally {
  await vite.close();
}

const css = await readFile(resolve(root, "src", "styles.css"), "utf8");
const assetPaths = [...new Set(markup.match(/\/assets\/[A-Za-z0-9._-]+/g) ?? [])];

let selfContainedMarkup = markup;
for (const assetPath of assetPaths) {
  const fileName = assetPath.slice("/assets/".length);
  const sourcePath = resolve(publicAssets, fileName);
  const bytes = await readFile(sourcePath);
  const mime = mimeTypes[extname(fileName).toLowerCase()] ?? "application/octet-stream";
  const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
  selfContainedMarkup = selfContainedMarkup.replaceAll(assetPath, dataUri);
  await copyFile(sourcePath, resolve(packageRoot, "assets", fileName));
}

const packageMarkup = markup.replaceAll("/assets/", "./assets/");
const standaloneHtml = buildDocument({ markup: selfContainedMarkup, css });
const packageHtml = buildDocument({ markup: packageMarkup, css });
const instructions = `HƯỚNG DẪN IMPORT VÀO LADIPAGE

Khuyến nghị dùng: teencare-webinar-ladipage.zip

1. Vào LadiPage > Tạo Landing Page > HTML To LadiPage.
2. Chọn Tải file HTML/Zip và tải file teencare-webinar-ladipage.zip.
3. Chọn chế độ Cơ bản để giữ nguyên giao diện, hiệu ứng, carousel và sticky CTA.
4. Sau khi chuyển đổi xong, mở cấu hình form và chọn kênh lưu dữ liệu phù hợp.
5. Xem trước toàn bộ trang trước khi xuất bản.

File teencare-webinar-ladipage.html là bản một-file độc lập đã nhúng ảnh trực tiếp.
Nếu LadiPage giới hạn dung lượng file HTML, hãy sử dụng bản ZIP được khuyến nghị.
`;

await mkdir(outputRoot, { recursive: true });
await writeFile(resolve(outputRoot, "teencare-webinar-ladipage.html"), standaloneHtml, "utf8");
await writeFile(resolve(packageRoot, "index.html"), packageHtml, "utf8");
await writeFile(resolve(outputRoot, "HUONG-DAN-IMPORT-LADIPAGE.txt"), instructions, "utf8");

console.log(`Created ${resolve(outputRoot, "teencare-webinar-ladipage.html")}`);
console.log(`Created ${resolve(packageRoot, "index.html")}`);
console.log(`Included ${assetPaths.length} image assets in the package.`);
