import type { ContactCopy } from "../ko/contact";
import type { DeepWiden } from "../widen";

/**
 * 한국어 사전이 타입의 원본이다. 키가 빠지거나 `faq.items` 의 원소 개수가
 * 달라지면 이 파일이 컴파일되지 않는다.
 *
 * 직역이 아니라 영어로 쓴 글이다 — 홈·솔루션·요금 영문 사전과 같은 톤을 따른다.
 *
 * 연락처 이메일(`CONTACT_EMAIL`)은 여기에 없다. 로케일과 무관한 사실이라
 * `ko/contact.ts` 의 상수 하나가 원본이고, 이 파일이 그 주소를 다시 적을 수
 * 있는 자리를 아예 만들지 않았다.
 */
export const contact: DeepWiden<ContactCopy> = {
  hero: {
    eyebrow: "CONTACT",
    title: "Reach us anytime",
    body: "Product questions, IR meetings, partnerships, hiring — all of it is welcome.",
    irNoteBefore: "The investor summary lives on the ",
    irNoteLink: "IR page",
    irNoteAfter: ".",
  },
  channels: {
    label: "WAYS TO REACH US",
    emailTitle: "Email",
    phoneTitle: "Phone",
    phoneValue: "+82 10-7771-8296",
    officeTitle: "Office",
    officeValue: "To be announced",
    note: "Full contact details and the office address follow once your message reaches us.",
  },
  form: {
    label: "SEND A MESSAGE",
    nameLabel: "Name",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "jane@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us what you need. (General questions, IR meetings, partnerships)",
    submit: "Send message",
    privacyNote: "Sending this form means you accept our privacy policy",
    errorSend: "Sending failed. Please try again in a moment.",
    errorNetwork: "A network error occurred. Please try again in a moment.",
    /** 이름이 제목 끝에 오므로 `subjectAfter` 는 비어 있다. */
    mail: {
      subjectBefore: "[WooriTeam] Inquiry from ",
      subjectAfter: "",
      nameLabel: "Name:",
      emailLabel: "Email:",
      messageLabel: "Message:",
    },
    success: {
      title: "Your message has been sent.",
      bodySent: "Someone from the team will be in touch shortly.",
      bodyMail: "Press send in your mail app and the message reaches us.",
      thanks: "Thank you.",
      recipient: "To:",
    },
  },
  ir: {
    title: "IR meetings and materials",
    body: "Investors and partners: ask for IR materials or a meeting and we will take it from there.",
    primary: "Request IR materials",
    secondary: "Book an online meeting",
  },
  chat: {
    title: "Live chat",
    body: "Need an answer quickly? Start a chat right now",
    button: "Start a chat",
    hours: "Hours: weekdays 09:00 - 18:00 (KST)",
  },
  faq: {
    title: "Frequently asked",
    items: [
      "How long is the free trial?",
      "Which marketplaces do you support?",
      "What is the tech stack?",
      "What is the refund policy?",
    ],
    cta: "See every question",
  },
  social: {
    title: "Social",
    body: "Follow along for news and updates",
  },
  office: {
    label: "OFFICE LOCATION",
    body: "We will share it once it is settled",
    status: "To be announced",
    note: "We will get in touch once the office location is settled",
  },
  response: {
    label: "AVERAGE RESPONSE TIME",
    weekdayValue: "2 hours",
    weekdayNote: "On business days",
    weekendValue: "24 hours",
    weekendNote: "Weekends and holidays",
    body: "For anything urgent, a phone call gets you help faster",
  },
};
