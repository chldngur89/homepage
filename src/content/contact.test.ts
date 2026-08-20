import { describe, expect, it } from "vitest";
import { contact as ko } from "./ko/contact";
import { contact as en } from "./en/contact";

/**
 * 문의 페이지는 사이트에서 유일하게 **사용자가 무언가를 보내는** 화면이다.
 * Formspree 가 설정되지 않은 지금은 제출이 전부 `mailto:` 분기로 떨어지므로,
 * 메일 초안의 문구가 사실상 이 페이지의 산출물이다.
 *
 * 그 문구는 `handleSubmit` 안에 한국어 리터럴로 박혀 있었다. 산출 HTML 의
 * 한글을 보는 `check-html.mjs` 의 `/en` 검사는 이것을 볼 수 없다 — 문자열이
 * JS 안에 살기 때문이다. 그래서 `/en/contact` 방문자가 영문 성공 카드를 읽은
 * 직후 한국어 메일 초안을 받고 있었다. 사전으로 옮긴 뒤의 방어가 여기다.
 */

/** 사전 객체 안의 모든 문자열을 모은다 (pricing.test.ts 와 같은 도구). */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("문의 사전", () => {
  it("영어 사전에 한글이 남아 있지 않다", () => {
    expect(strings(en).filter((s) => /[가-힣]/.test(s))).toEqual([]);
  });

  /**
   * `Contact.tsx` 가 이 조각들을 잇는 형식과 같은 형식으로 조립해, 전환 이전
   * 리터럴과 문자 단위로 같은지 본다. `subjectBefore` 끝의 공백처럼 눈에 안
   * 보이면서 결과를 바꾸는 것을 고정하는 것이 목적이다.
   */
  it("한국어 메일 초안이 전환 이전 리터럴과 문자 단위로 같다", () => {
    const mail = ko.form.mail;

    expect(`${mail.subjectBefore}홍길동${mail.subjectAfter}`).toBe("[WooriTeam 문의] 홍길동님 문의");

    expect(
      `${mail.nameLabel} 홍길동\n${mail.emailLabel} hong@example.com\n\n${mail.messageLabel}\n본문`,
    ).toBe("이름: 홍길동\n이메일: hong@example.com\n\n메시지:\n본문");
  });

  it("영문 메일 초안에는 이름이 제목 끝에 온다", () => {
    const mail = en.form.mail;
    expect(`${mail.subjectBefore}Jane Doe${mail.subjectAfter}`).toBe(
      "[WooriTeam] Inquiry from Jane Doe",
    );
  });
});
