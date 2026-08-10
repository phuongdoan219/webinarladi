# UI Audit — TeenCare Webinar Hero

## Audit scope

- Surface: desktop hero section at `http://localhost:4173/`
- Evidence: `audit/01-hero-desktop.png`
- User goal: understand the webinar quickly and confidently click “Đăng ký tham gia”.
- General health: needs refinement. The structure is clear, but typography, spacing, contrast, and the image boundary reduce polish and trust.

## Strengths

- Two-column structure makes the message and emotional image easy to understand.
- Navy/orange palette is consistent and appropriate for TeenCare.
- CTA is visually prominent and event information appears before the action.
- The mother–child image reinforces the webinar topic immediately.

## Findings

1. **[High] The headline looks mechanically compressed.**
   - Evidence: letterforms are unusually narrow, spacing is tight, and Vietnamese diacritics feel crowded.
   - Impact: the main message looks less polished and is harder to scan than it should be.
   - Recommendation: use a naturally condensed Vietnamese-supporting display font, or reduce font size slightly instead of horizontally scaling the text.

2. **[High] The curved separator creates too much dead space.**
   - Evidence: the large cream strip between the event cards and the photograph contains two competing curved edges.
   - Impact: the two halves feel disconnected, and the final event card appears to run into the curve.
   - Recommendation: narrow the cream band, use one intentional curve, and keep the curve clear of card content.

3. **[Medium] The title block has an unbalanced silhouette.**
   - Evidence: the first line is much longer than the second, while the orange third line has a different width again.
   - Impact: the reading rhythm feels top-heavy and less deliberate.
   - Recommendation: rebalance the left-column measure or adjust the headline size so the three lines form a more stable block.

4. **[Medium] Vertical rhythm is inconsistent.**
   - Evidence: there is a large gap between the eyebrow and headline, then a tight gap between the headline accent and body copy; the event-card-to-CTA gap is comparatively small.
   - Impact: related elements do not feel grouped consistently.
   - Recommendation: use a clear spacing scale and group eyebrow + title, title + description, and event details + CTA intentionally.

5. **[Medium] The CTA contrast is likely insufficient.**
   - Evidence: white text sits on a bright orange fill.
   - Impact: the label may be hard to read for users with low vision, especially on bright displays.
   - Recommendation: darken the orange CTA or use navy text while preserving brand emphasis; verify against WCAG contrast thresholds.

6. **[Medium] Supporting text is too small and light.**
   - Evidence: the privacy/reassurance line is visually much weaker than every nearby element.
   - Impact: an important trust cue is easy to miss.
   - Recommendation: increase it to at least 16 px, slightly increase line height, and keep sufficient color contrast.

7. **[Medium] The metadata cards look unfinished.**
   - Evidence: bracketed placeholders (`[Ngày tổ chức]`, `[Thời gian]`, `[Nền tảng]`) read like internal notes rather than real UI.
   - Impact: this lowers trust and makes the webinar feel unavailable or incomplete.
   - Recommendation: use real values, or clearly label the state as “Sắp công bố” without brackets.

8. **[Low] Card surfaces are too close to the page background.**
   - Evidence: white cards sit on a very light cream field with little border or shadow separation.
   - Impact: the cards lose definition and feel slightly washed out.
   - Recommendation: add a subtle warm border or increase shadow separation consistently.

9. **[Low] Icon style and visual weight vary.**
   - Evidence: the calendar, clock, monitor, shield, and brand mark do not share exactly the same stroke/fill character.
   - Impact: the system looks assembled from multiple sources rather than designed as one set.
   - Recommendation: choose one icon family and normalize size, optical weight, and bounding boxes.

10. **[Low] The brand mark is not fully convincing.**
    - Evidence: the small generic people icon does not match the distinctive TeenCare emblem in the reference identity.
    - Impact: the header feels like a placeholder logo treatment.
    - Recommendation: replace it with the official logo asset and lockup proportions.

## Accessibility risks

- Bright orange/white CTA contrast should be measured.
- Small reassurance text may fail readable text-size and contrast expectations.
- The screenshot cannot confirm semantic headings, keyboard focus, dialog behavior, zoom reflow, or screen-reader labels.

## Recommended fix order

1. Replace compressed headline treatment and rebalance wrapping.
2. Redesign the image curve/cream band so it does not compete with content.
3. Fix CTA and supporting-text contrast.
4. Replace bracketed placeholders with credible content states.
5. Normalize spacing, card separation, icon family, and the brand mark.

## Evidence limits

This review is based on one desktop screenshot. Mobile layout, hover/focus states, keyboard access, form validation, modal behavior, loading states, and full WCAG compliance were not verified.
