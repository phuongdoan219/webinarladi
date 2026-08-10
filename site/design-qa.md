# TeenCare Webinar Mobile — Design QA

- Source visual truth: `E:\webinarladi\site\references\selected-mobile-design.png`
- Source content references: `E:\Teencare\Webinar\Section Image\1.png` through `5.png`
- Additional expert references:
  - `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-20958eb0-3427-48ab-bd32-09ce35fd2b8d.png`
  - `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-5594327e-dc9c-4e82-a810-f96756b0fc39.png`
- Compact event-info reference: `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-46b29832-9b75-4673-a6c3-8df33efeedc2.png`
- Event color/compactness review references:
  - `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-0245e0df-d382-476c-b361-d1a6eb281863.png`
  - `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-1040a525-fef2-4687-9efb-895212987613.png`
- Hero redesign reference: `C:\Users\Admin\AppData\Local\Temp\codex-clipboard-ec8c0f6a-54f3-4145-b970-64b1453b49c1.png`
- Official TeenCare logo: `E:\Teencare\TeenCare\Logo PNG\Logo chính thức.png`
- Generated hero mother asset: `E:\webinarladi\site\public\assets\hero-mother-tablet.png`
- Unified expert portrait assets:
  - `E:\webinarladi\site\public\assets\expert-hoang-linh-gradient.png`
  - `E:\webinarladi\site\public\assets\expert-giang-dang-gradient.png`
  - `E:\webinarladi\site\public\assets\expert-tu-nguyen-gradient.png`
- Implementation URL: `http://localhost:4173/`
- Browser evidence:
  - `E:\webinarladi\site\implementation-mobile-hero.png`
  - `E:\webinarladi\site\implementation-mobile-problems.png`
  - `E:\webinarladi\site\implementation-mobile-lower.png`
  - `E:\webinarladi\site\implementation-mobile-expert.png`
  - `E:\webinarladi\site\implementation-mobile-form.png`
  - `E:\webinarladi\site\implementation-experts-added-1.png`
  - `E:\webinarladi\site\implementation-experts-added-2.png`
  - `E:\webinarladi\site\implementation-experts-added-3.png`
  - `E:\webinarladi\site\implementation-expert-carousel-hoang-linh.png`
  - `E:\webinarladi\site\implementation-expert-carousel-giang-dang.png`
  - `E:\webinarladi\site\implementation-expert-carousel-tu-nguyen.png`
  - `E:\webinarladi\site\implementation-compact-event-hero.png`
  - `E:\webinarladi\site\implementation-compact-event-form.png`
  - `E:\webinarladi\site\implementation-event-harmony-hero.png`
  - `E:\webinarladi\site\implementation-event-harmony-form.png`
  - `E:\webinarladi\site\implementation-hero-logo-centered-mother.png`
- State: mobile landing page, initial form state; CTA scroll and submitted success state also tested.
- CSS viewport: 390 × 844 at device pixel ratio 1. A 320 × 720 resilience check was also completed.
- Source pixels: 753 × 2087. The source is an approximately @2x-wide compressed concept board, so it was normalized by width to roughly 376.5 CSS px and compared section-by-section rather than treated as a literal full-page height specification.
- Implementation evidence pixels: 375 × 812 per in-app browser viewport capture.

## Full-view comparison evidence

The source concept and all five browser-rendered implementation captures were opened together in one comparison input. The implementation preserves the selected direction: warm cream canvas, navy/orange TeenCare hierarchy, fully vertical mobile layout, stacked event rows, full-width CTA, full-width problem images with copy below, three vertically stacked outcomes, expert portrait above credentials, and vertically stacked registration fields. The intentionally removed mother–son image does not appear below Section 1.

## Focused region comparison evidence

- Hero: logo, webinar eyebrow, three-line headline, supporting copy, event rows, CTA, reassurance line, and direct transition to “Ba mẹ có đang...?” were checked in `implementation-mobile-hero.png`.
- Problem stories: crop quality, image-above-copy anatomy, Vietnamese wrapping, card spacing, and one-column stacking were checked in `implementation-mobile-problems.png`.
- Outcomes: icon hierarchy, full-width benefit cards, and CTA were checked in `implementation-mobile-lower.png`.
- Expert: portrait crop, identity, credentials, vertical anatomy, and transition into registration were checked in `implementation-mobile-expert.png`.
- Registration: full-width event rows, labels, inputs, textarea, consent copy, and CTA were checked in `implementation-mobile-form.png`.

## Required fidelity surfaces

- Fonts and typography: Roboto Condensed is used for display headings to match the naturally narrow reference weight without CSS distortion. Be Vietnam Pro is used for readable Vietnamese body copy. Headline and section titles do not clip or overflow at 390 px or 320 px.
- Spacing and layout rhythm: 20 px mobile gutters, full-width stacked rows, 14–20 px card gaps, and 28 px section padding create the requested one-column rhythm. No horizontal overflow was found.
- Colors and visual tokens: cream surfaces, deep navy headings, orange/yellow emphasis, warm borders, and restrained soft elevation closely match the selected concept and TeenCare reference page.
- Image quality and asset fidelity: problem images and the expert portrait reuse supplied Section Image artwork. Crops preserve the correct subjects, remain sharp at mobile width, and do not introduce placeholders.
- Copy and content: webinar copy follows the supplied Section Image references. Bracketed event values are preserved instead of using the generated mock’s invented dates.
- Interaction and accessibility: semantic buttons and form labels, visible focus styles, reduced-motion support, 50–58 px primary tap targets, CTA smooth-scroll, required-field validation, and a visible success state are implemented.

## Comparison history

### Pass 1 — blocked

- P2: the first browser render used a wide display face, causing the orange headline to wrap onto an extra line and drift from the selected concept.
- Fix: introduced a freely available Vietnamese-capable type system using Roboto Condensed for display headings and Be Vietnam Pro for body text; reduced display sizing to a mobile optical scale.

### Pass 2 — passed

- Post-fix evidence: hero headline follows the intended three-line rhythm; all sections remain single-column; no selected hero image appears; problem, benefit, expert, and form sections retain image/text top-to-bottom order.
- Responsive evidence: document width equals viewport width at 320 px; no horizontal overflow.
- Primary interaction tested: hero CTA → registration form; required fields filled with synthetic data; form submitted; success status displayed.
- Browser console errors and warnings checked: none.

### Pass 3 — passed

- Added Cô Giang Đặng and Thầy Tú Nguyễn immediately after Cô Hoàng Linh in the expert section.
- Both supplied profile cards are preserved in full, stacked vertically at mobile width, and remain legible without cropping or horizontal overflow.
- The transition from the final expert card into the registration section remains clear and evenly spaced.
- Browser console errors and warnings checked after the update: none.

### Pass 4 — passed

- Replaced the vertically stacked expert profiles with a horizontal scroll-snap carousel supporting touch swiping, previous/next buttons, and direct pagination dots.
- Standardized all three portraits to the same warm cream background, golden lower transition, 4:3 crop, lighting direction, card radius, typography, and credential treatment.
- P2 found in the first carousel capture: the track inherited the height of the longest profile, leaving excessive blank space on shorter profiles.
- Fix: the carousel now measures the active slide and animates to that slide's natural height; revised captures show the controls immediately after each profile.
- Source artwork and all three revised browser captures were opened together in one comparison input. Portrait identity, roles, credential copy, active pagination state, and consistent card anatomy were visually checked.
- Interaction evidence: next button changed slide 1 → 2; horizontal track movement changed slide 2 → 3; active dot and carousel height updated correctly in both states.
- Responsive evidence: viewport width 390 px, document content width 375 px, carousel width 335 px, and each slide width 335 px; no horizontal page overflow.

### Pass 5 — passed

- Replaced the three separate event rows in both the hero and registration sections with the compact two-row capsule shown in the supplied reference.
- Preserved the reference anatomy: calendar and time on the first row with a vertical divider, platform on the second row below a subtle horizontal divider, and a fully rounded dark surface.
- Final copy verified in both locations: “Chủ nhật tuần này”, “20:00 - 21:30”, and “Google Meet”.
- Reference and both browser captures were opened together in one comparison input. Font weight, spacing, icon alignment, dividers, radius, surface color, and copy were visually checked.
- Responsive evidence: both capsules measure 335 × 86 CSS px at a 390 px viewport; document width remains 375 px with no horizontal overflow.
- The laptop, calendar, and clock use the existing icon library; no placeholder or custom-drawn icon assets were introduced.

### Pass 6 — passed

- P2 identified from the supplied current-state captures: the dark navy capsule carried too much visual weight against the warm cream TeenCare canvas and sat too close in prominence to the primary CTA.
- Fix: changed the surface to warm ivory, mapped text to TeenCare navy, mapped icons to brand orange, replaced the cool divider with a warm beige token, softened the border/shadow, and reduced overall dimensions.
- Compactness improvement at 390 px: width reduced from 335 to 323 CSS px and height from 86 to 72 CSS px while preserving the readable two-row hierarchy.
- Resilience check at 320 px: component width 280 px, all three content groups remain inside the 300 px right boundary, and page width equals viewport width with no overflow.
- Both supplied current-state screenshots and both revised browser captures were opened together in one comparison input. The updated component now sits below the headline/form title as supporting metadata instead of competing with the orange CTA and navy section headings.

### Pass 7 — passed

- Replaced the temporary icon/text mark with the supplied official TeenCare raster logo and added a working “ĐĂNG KÝ NGAY” header CTA beside it.
- Centered the webinar eyebrow, headline, rule, supporting copy, event metadata, and primary CTA while preserving the established navy/orange hierarchy.
- Added a dedicated generated mother-and-tablet hero photograph immediately below the primary CTA. The image uses the reference pose and warm cream art direction without copying the reference UI panels or embedded text.
- P2 found at 320 px: the hard line breaks in the supporting paragraph created an isolated short line, and the eyebrow split “PHỤ HUYNH” awkwardly.
- Fix: removed forced paragraph breaks, added a readable centered max width, and reduced the 320 px eyebrow optical size/padding. Revised 320 px evidence shows clean natural wrapping and a single-line eyebrow.
- Responsive evidence: 390 px document width is 375 px; 320 px document width equals the viewport at 320 px. Header logo and CTA remain separated with no overlap, and the mother image scales from 335 to 288 CSS px wide.
- Primary interaction tested: the new header CTA scrolls to the registration section, which lands 41 CSS px from the viewport top.
- Reference mock, official logo, and final browser render were opened together in one comparison input. Logo fidelity, centered alignment, button placement, image subject, crop, spacing, type hierarchy, and palette were visually checked.

### Pass 8 — passed

- Replaced the single-parent hero photograph with a generated Vietnamese mother-and-teenage-daughter scene. Both subjects sit close together, smile naturally, and share the same tablet so the image feels warm and socially complete.
- Removed the visual card treatment from the hero photograph: no border, no radius, and no detached image container remains.
- Added a soft transparency transition at the top of the photograph over the existing warm cream canvas. The CTA now flows directly into the image without a hard rectangular edge.
- P2 found at 320 px: the previous `body` minimum width created a small horizontal page scrollbar in the desktop responsive viewport.
- Fix: removed the fixed body minimum width. Final evidence reports equal document scroll width and client width, with no horizontal page overflow.
- The supplied reference and the final 390 px implementation capture were opened together in one comparison input. Subject count, shared-tablet pose, top fade, edge treatment, crop, palette, and CTA-to-image continuity were visually checked.
- Final asset: `public/assets/hero-mother-daughter-tablet.png`. Final implementation capture: `implementation-hero-mother-daughter-blended.png`.

### Pass 9 — passed

- P2 identified from the supplied crop: the hero photograph used a `-10px` top margin, which pulled its transparent image area underneath the primary CTA and made the photograph appear to overlap the button.
- Fix: changed the photograph spacing to a positive 12px margin while retaining the soft top fade and borderless integration.
- Measured responsive evidence at 320px: CTA bottom 568px, image container top 580px, exact gap 12px, and document scroll width equals client width.
- The supplied overlap crop and the revised 390px render were opened together in one comparison input. The CTA silhouette, shadow clearance, fade continuity, and mother-daughter crop were visually checked.
- Final implementation capture: `implementation-hero-button-image-spacing.png`.

### Pass 10 — passed

- P2 identified from the supplied narrow crop: problem images 2 and 3 reused the composite source artwork with horizontal offsets that were too small, exposing the source card's cream gutter on the left and pushing each subject to the right.
- Fix: recalibrated only the second and third horizontal crop offsets from `-33.4%` / `-60.1%` to `-35.75%` / `-64.65%`, preserving the first image and all vertical cropping.
- Responsive evidence at 320px: all three image frames share the same x-position (17px), width (271px), and right edge (288px); document scroll width equals client width.
- The supplied defect crop and the final 320px render showing images 2 and 3 were opened together in one comparison input. Left-edge fill, subject centering, right-edge crop, card radius, and image height were visually checked.
- Final implementation capture: `implementation-problems-image-crops-fixed.png`.

### Pass 11 — passed

- Converted the three “Ba mẹ có đang...?” cards from a vertical stack into a one-card-per-view horizontal carousel with touch swiping and scroll snapping.
- Added circular brand-orange previous/next buttons vertically centered across the left and right card borders, plus a compact three-position indicator below the card.
- Preserved the corrected image crops, copy, card styling, and parent note. The carousel height now animates to the active card so shorter slides do not leave excessive blank space.
- P2 found at 320px: the first implementation placed the side arrows close to the title text on the narrowest viewport.
- Fix: increased carousel-card copy padding to 24px, keeping the title clear of both arrows without moving the requested edge controls.
- Interaction evidence: next advanced slide 1 → 2 with scrollLeft equal to one carousel width and active dot 1; previous from slide 1 wrapped to slide 3 with active dot 2.
- Responsive evidence at 320px: previous arrow bounds 2–40px, next arrow bounds 265–303px, and document scroll width equals client width. Neither control is clipped.
- The previous stacked implementation and final 390px carousel capture were opened together in one comparison input. Content fidelity, crop alignment, card radius, arrow centering, dots, and spacing were visually checked.
- Final implementation capture: `implementation-problems-carousel.png`.

### Pass 12 — passed

- Moved the expert carousel previous/next controls from the bottom control row to the vertical midpoint of the card's left and right borders, matching the problem carousel interaction pattern.
- Standardized the expert arrows to the same 38px brand-orange button, cream outline, white chevron, and shadow used above. Dots and swipe hint remain below the card.
- Increased expert-copy horizontal padding from 18px to 26px so the edge controls cannot cover names, roles, or credential bullets on long profiles.
- Interaction evidence: next advanced Cô Hoàng Linh → Cô Giang Đặng, active dot changed to 1, horizontal scroll equaled one carousel width, and the active-slide height expanded from 514px to 740px.
- Responsive evidence at 320px: previous arrow bounds 2–40px, next arrow bounds 265–303px, and document scroll width equals client width; neither control is clipped.
- The previous bottom-arrow render and final edge-arrow render were opened together in one comparison input. Arrow alignment, card-border overlap, copy clearance, dots, swipe hint, and section spacing were visually checked.
- Final implementation capture: `implementation-expert-carousel-edge-arrows.png`.

### Pass 13 — passed

- Removed the shield-note row from the end of Section 1, including its unused icon import and styling.
- Browser evidence at 390px: `.trust-note` is absent, the hero bottom and problems-section top both resolve to 392px, and no empty spacer or horizontal overflow remains.
- The mother-daughter image now transitions directly into the “Ba mẹ có đang...?” section.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: replace the icon-library TeenCare mark with the official vector logo when the brand asset is supplied.
- P3: replace bracketed event metadata once the real webinar schedule and platform are confirmed.

## Implementation checklist

- [x] Remove the Section 1 mother–son image.
- [x] Enforce a strict one-column mobile layout throughout.
- [x] Preserve source content and supplied photography.
- [x] Implement working CTA scroll and registration success state.
- [x] Verify 390 px and 320 px layouts with no horizontal overflow.
- [x] Check browser console, build output, and packaging tests.
- [x] Add and visually verify the two additional expert profiles on mobile.
- [x] Convert the expert section to a functional horizontal carousel.
- [x] Normalize all three expert portraits and verify active-slide height changes.
- [x] Replace event metadata cards with the compact reference-style capsule in both requested sections.
- [x] Harmonize the event capsule with TeenCare's cream, orange, and navy tokens and verify the reduced 390/320 px layouts.
- [x] Complete the four requested Section 1 updates and verify the new header CTA interaction.
- [x] Replace the single mother with a smiling mother-and-daughter scene and blend the photograph into the Section 1 background.
- [x] Preserve a 12px safety gap between the primary CTA and the blended hero photograph.
- [x] Recalibrate problem images 2 and 3 so their source gutters no longer appear inside the mobile cards.
- [x] Convert the problem cards into a functional horizontal carousel with edge-centered navigation arrows.
- [x] Match the expert carousel navigation to the same edge-centered arrow pattern.
- [x] Remove the attendance-information note from the end of Section 1 without leaving an empty gap.

final result: passed
