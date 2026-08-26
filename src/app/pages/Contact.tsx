import { useState } from "react";
import { useCopy } from "@/app/i18n/useCopy";
import { LocaleLink } from "@/app/components/LocaleLink";
import { SHELL, Section, SectionLabel } from "@/app/components/page";
import { CONTACT_EMAIL, type ContactCopy } from "@/content/ko/contact";
import type { SameShape } from "@/content/widen";

/**
 * FAQ 항목의 목적지. 문구는 사전이, 목적지는 코드가 정한다 — 번역이 링크를
 * 옮길 수 없게 하려는 것이다 (요금 페이지의 `PLAN_CTA_TO_CONTACT` 와 같다).
 *
 * 타입을 `string[]` 이 아니라 사전 배열에서 **파생**시킨 것이 핵심이다.
 * `ContactCopy["faq"]["items"]` 는 `as const` 가 만든 길이 4의 튜플이고,
 * `SameShape` 가 그 길이를 그대로 물려주므로 사전의 FAQ 가 하나 늘거나 줄면
 * 이 줄이 컴파일되지 않는다. 인덱스로 짝지은 두 배열이 조용히 어긋나는 경우가
 * 없다.
 */
const FAQ_LINKS: SameShape<ContactCopy["faq"]["items"], string> = [
  "/pricing",
  "/solution",
  "/technology",
  "/pricing",
];

/** 고유명사라 번역 대상이 아니다. 전환 이전에는 글리프(𝕏, in, f, 📷)가 보이는
 *  텍스트였고 이 이름은 `title` 속성에만 있었다. 새 디자인에는 아이콘 세트가
 *  없으므로 글리프를 걷어내고, 원래 접근성 이름이던 이 문자열을 그대로 보이는
 *  텍스트로 올렸다 (요금 페이지에서 💚 를 걷어낸 것과 같은 판단 — 스크린리더가
 *  "camera" 로 읽던 자리다). */
const SOCIAL_NAMES = ["Twitter", "LinkedIn", "Facebook", "Instagram"] as const;

const PHONE_HREF = "tel:+821077718296";

const CARD = "rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,30px)]";
const CARD_TITLE = "text-[19px] font-semibold tracking-[-0.02em]";
const BUTTON =
  "flex h-12 w-full items-center justify-center rounded-[10px] px-5 text-[15.5px] font-semibold";
/** 포커스 링은 theme.css 의 전역 `:focus-visible` 규칙이 그린다 — 여기서 따로 만들지 않는다. */
const FIELD =
  "mt-2 w-full rounded-[10px] border border-line-2 bg-surface px-4 py-3 text-[15.5px] leading-[1.6] text-ink placeholder:text-ink-3";
const FIELD_LABEL = "block text-[13px] font-semibold tracking-[0.04em] text-ink-2";

const CHANNEL_CARD =
  "rounded-[14px] border border-line-2 bg-surface p-[clamp(22px,3vw,28px)]";

/**
 * 연락 수단 카드. 세 장이 같은 모양이라 한 곳에 둔다.
 *
 * `href` 가 없으면(오피스 카드 — 아직 실제 주소가 없다) `<a>` 가 아니라
 * `<div>` 로 렌더한다. 정보는 그대로 보이돼 눌리는 것처럼 보이지 않게
 * 하려는 것이다 — `href="#"` 는 눌러도 아무 일이 없는데 눌리는 것처럼
 * 보여서 더 나쁘다. 실제 주소가 생기면 호출부에서 `href` 를 다시 채우면
 * 된다(레이아웃 변경 없음).
 */
function ChannelCard({ href, title, value }: { href?: string; title: string; value: string }) {
  const content = (
    <>
      <h3 className="text-[12.5px] font-semibold tracking-[0.12em] text-ink-3">{title}</h3>
      <p className="mt-3 break-words text-[17px] font-semibold leading-[1.5] tracking-[-0.01em] text-ink">
        {value}
      </p>
    </>
  );

  if (!href) {
    return <div className={CHANNEL_CARD}>{content}</div>;
  }

  return (
    <a href={href} className={CHANNEL_CARD}>
      {content}
    </a>
  );
}

export default function Contact() {
  const copy = useCopy();
  const t = copy.contact;

  const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (FORMSPREE_FORM_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitted(false), 3000);
        } else {
          setSubmitError(t.form.errorSend);
        }
      } catch {
        setSubmitError(t.form.errorNetwork);
      }
    } else {
      // Formspree 없을 때: mailto 로 사용자 메일 앱 열기 → `CONTACT_EMAIL` 로 보내는 효과.
      // 제목·라벨은 사전에서 온다 — 여기 리터럴로 두면 /en 방문자가 영문 성공 카드를
      // 읽은 뒤 한국어 초안을 받는다 (errorSend·errorNetwork 와 같은 이유).
      const mail = t.form.mail;
      const subject = encodeURIComponent(
        `${mail.subjectBefore}${formData.name}${mail.subjectAfter}`
      );
      const body = encodeURIComponent(
        `${mail.nameLabel} ${formData.name}\n${mail.emailLabel} ${formData.email}\n\n${mail.messageLabel}\n${formData.message}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-ground">
      {/* 히어로 — 제목이 두 줄이 아니라 한 줄이고(PageHero 는 titleLine1/2 를
          <br> 로 잇는다) 본문 아래 IR 안내 문단이 더 붙는다. 모양이 달라
          PageHero 를 쓰지 않는다. */}
      <section aria-labelledby="hero-h" className="border-b border-line">
        <div className={`${SHELL} pb-[clamp(64px,7vw,104px)] pt-[clamp(56px,7vw,96px)]`}>
          <div className="rise">
            <p className="mb-[22px] text-[13px] font-semibold uppercase tracking-[0.1em] text-brand">
              {t.hero.eyebrow}
            </p>
            <h1
              id="hero-h"
              className="max-w-[14em] text-[clamp(38px,5.2vw,60px)] font-bold leading-[1.14] tracking-[-0.035em]"
            >
              {t.hero.title}
            </h1>
            <p className="mt-[26px] max-w-[34em] text-[18px] leading-[1.65] text-ink-2">
              {t.hero.body}
            </p>
            <p className="mt-4 max-w-[34em] text-[15px] leading-[1.7] text-ink-3">
              {t.hero.irNoteBefore}
              <LocaleLink to="/ir" className="font-semibold text-brand underline underline-offset-4">
                {t.hero.irNoteLink}
              </LocaleLink>
              {t.hero.irNoteAfter}
            </p>
          </div>
        </div>
      </section>

      {/* 01 연락 수단 — 원래 이 섹션에는 제목이 없고 카드만 나열됐다. 홈 06·
          솔루션 03·요금 01 과 같이 라벨을 h2 로 승격시켜 섹션의 heading 으로 쓴다. */}
      <Section id="channels-h">
        <SectionLabel index="01" as="h2" id="channels-h">
          {t.channels.label}
        </SectionLabel>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <ChannelCard
            href={`mailto:${CONTACT_EMAIL}`}
            title={t.channels.emailTitle}
            value={CONTACT_EMAIL}
          />
          <ChannelCard
            href={PHONE_HREF}
            title={t.channels.phoneTitle}
            value={t.channels.phoneValue}
          />
          {/* 아직 사무실 실주소가 없다 — href 없이 두면 ChannelCard 가 <div> 로
              렌더해 정보만 보여주고 눌리는 것처럼 보이지 않는다. 주소가
              생기면 href={`https://...`} 를 채워 넣기만 하면 된다. */}
          <ChannelCard title={t.channels.officeTitle} value={t.channels.officeValue} />
        </div>

        <p className="mt-6 max-w-[40em] text-[14.5px] leading-[1.7] text-ink-3">
          {t.channels.note}
        </p>
      </Section>

      {/* 02 문의 남기기 — 폼과 보조 카드가 나란히 선다. 전환 이전의 2열 구성을
          그대로 유지하되, 카드 제목은 섹션 heading 아래의 h3 가 된다. */}
      <Section id="inquiry-h" tone="panel">
        <SectionLabel index="02" as="h2" id="inquiry-h">
          {t.form.label}
        </SectionLabel>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* 폼 카드 — 성공 화면과 폼이 같은 헤어라인 카드 안에서 교대한다 */}
          <div className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]">
            {submitted ? (
              <div role="status" className="py-[clamp(32px,6vw,64px)] text-center">
                <h3 className="text-[23px] font-semibold tracking-[-0.02em]">
                  {t.form.success.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[26em] text-[15.5px] leading-[1.7] text-ink-2">
                  {FORMSPREE_FORM_ID ? t.form.success.bodySent : t.form.success.bodyMail}
                  <br />
                  {t.form.success.thanks}
                </p>
                {!FORMSPREE_FORM_ID && (
                  <p className="mt-5 break-words text-[14px] text-ink-3">
                    {t.form.success.recipient} {CONTACT_EMAIL}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div>
                  <label htmlFor="contact-name" className={FIELD_LABEL}>
                    {t.form.nameLabel}{" "}
                    <span aria-hidden="true" className="text-brand">
                      *
                    </span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={FIELD}
                    placeholder={t.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={FIELD_LABEL}>
                    {t.form.emailLabel}{" "}
                    <span aria-hidden="true" className="text-brand">
                      *
                    </span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={FIELD}
                    placeholder={t.form.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className={FIELD_LABEL}>
                    {t.form.messageLabel}{" "}
                    <span aria-hidden="true" className="text-brand">
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${FIELD} resize-none`}
                    placeholder={t.form.messagePlaceholder}
                  />
                </div>

                {/* 실패 상태 — 헤어라인 보더 카드. role="alert" 는 전환 이전에 없던
                    것으로, 조용히 나타나던 문구를 스크린리더에도 알린다. */}
                {submitError && (
                  <p
                    role="alert"
                    className="rounded-[10px] border border-line-2 bg-panel px-4 py-3.5 text-[14.5px] leading-[1.6] text-ink"
                  >
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  className="flex h-[52px] w-full items-center justify-center rounded-[10px] bg-invert text-[16px] font-semibold text-white"
                >
                  {t.form.submit}
                </button>

                <p className="text-center text-[13px] leading-[1.6] text-ink-3">
                  {t.form.privacyNote}
                </p>
              </form>
            )}
          </div>

          {/* 보조 카드 — IR / 채팅 / FAQ / 소셜 */}
          <div className="grid content-start gap-5">
            <div className={CARD}>
              <h3 className={CARD_TITLE}>{t.ir.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{t.ir.body}</p>
              <div className="mt-6 grid gap-2.5">
                <LocaleLink to="/ir" className={`${BUTTON} bg-invert text-white`}>
                  {t.ir.primary}
                </LocaleLink>
                <LocaleLink to="/contact" className={`${BUTTON} border border-line text-ink`}>
                  {t.ir.secondary}
                </LocaleLink>
              </div>
            </div>

            <div className={CARD}>
              <h3 className={CARD_TITLE}>{t.chat.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{t.chat.body}</p>
              <button type="button" className={`${BUTTON} mt-6 border border-line text-ink`}>
                {t.chat.button}
              </button>
              <p className="mt-3 text-center text-[13px] text-ink-3">{t.chat.hours}</p>
            </div>

            <div className={CARD}>
              <h3 className={CARD_TITLE}>{t.faq.title}</h3>
              <ul className="mt-5 border-t border-line">
                {t.faq.items.map((question, index) => (
                  <li key={question} className="border-b border-line">
                    <LocaleLink
                      to={FAQ_LINKS[index]}
                      className="flex gap-2.5 py-3.5 text-[15px] leading-[1.6] text-ink-2"
                    >
                      <span aria-hidden="true" className="text-brand">
                        &rarr;
                      </span>
                      {question}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
              <LocaleLink to="/pricing" className={`${BUTTON} mt-6 border border-line text-ink`}>
                {t.faq.cta}
              </LocaleLink>
            </div>

            <div className={CARD}>
              <h3 className={CARD_TITLE}>{t.social.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{t.social.body}</p>
              {/* 아직 실제 소셜 계정 주소가 없다 — href="#" 는 눌러도 아무
                  일도 안 하면서 눌리는 것처럼 보인다. <span> 으로 두어 이름은
                  보이돼 클릭 대상이 아님을 드러낸다. 계정이 생기면 이
                  <span> 을 <a href="https://...">로 되돌리면 된다. */}
              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {SOCIAL_NAMES.map((name) => (
                  <li key={name}>
                    <span className="flex h-11 items-center justify-center rounded-[10px] border border-line-2 text-[14.5px] font-semibold text-ink-2">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 오피스 위치 */}
      <Section id="office-h">
        <SectionLabel index="03" as="h2" id="office-h">
          {t.office.label}
        </SectionLabel>
        <p className="max-w-[34em] text-[16.5px] leading-[1.7] text-ink-2">{t.office.body}</p>

        <div className="mt-10 rounded-[14px] border border-line-2 bg-surface px-[clamp(24px,3vw,34px)] py-[clamp(48px,7vw,88px)] text-center">
          <p className="text-[clamp(26px,3vw,32px)] font-bold leading-[1.1] tracking-[-0.035em] text-ink-2">
            {t.office.status}
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-3">{t.office.note}</p>
        </div>
      </Section>

      {/* 04 평균 응답 시간 */}
      <Section id="response-h" tone="panel">
        <SectionLabel index="04" as="h2" id="response-h">
          {t.response.label}
        </SectionLabel>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]">
            <p className="text-[clamp(34px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.035em]">
              {t.response.weekdayValue}
            </p>
            <p className="mt-3 text-[14.5px] text-ink-3">{t.response.weekdayNote}</p>
          </div>
          <div className="rounded-[14px] border border-line-2 bg-surface p-[clamp(24px,3vw,34px)]">
            <p className="text-[clamp(34px,4.2vw,46px)] font-bold leading-[1.05] tracking-[-0.035em]">
              {t.response.weekendValue}
            </p>
            <p className="mt-3 text-[14.5px] text-ink-3">{t.response.weekendNote}</p>
          </div>
        </div>

        <p className="mt-8 max-w-[34em] text-[16px] leading-[1.7] text-ink-2">{t.response.body}</p>
      </Section>
    </div>
  );
}
