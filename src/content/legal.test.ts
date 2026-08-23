import { describe, expect, it } from "vitest";
import { legal } from "./ko/legal";

/**
 * 개인정보처리방침·이용약관은 법적 효력이 있는 문서다. 아래 리터럴은
 * **전환 이전 `Privacy.tsx`/`Terms.tsx`(커밋 1090df0)에서 기계적으로 뽑은
 * 것**이다 — 추출 스크립트와 산출물은
 * `.superpowers/sdd/2026-08-20-redesign-03-remaining-pages/legal-baseline-*.json`에
 * 있지만 그 디렉터리는 gitignore 대상이라(`.superpowers/`) 커밋에 남지 않는다.
 * 그래서 이 테스트가 원문 값을 직접 들고 있어야 한다. 사전에서 옮겨 적은
 * 것이 아니므로, 사전이 틀리면 여기서 걸린다.
 *
 * 요금 페이지의 판매 조건 고정 테스트(`pricing.test.ts`)와 같은 종류의 가드다.
 * 이 테스트가 실패하면 "테스트를 고치는" 것이 아니라, 법무 검토를 거쳐 문구를
 * 정말 바꾸기로 한 결정이 있었는지부터 확인한다.
 */

const PRIVACY_HEADINGS = [
  "1. 수집하는 개인정보",
  "2. 이용 목적",
  "3. 보관 기간",
  "4. 제3자 제공",
  "5. 분석 도구",
  "6. 문의",
];

const PRIVACY_BODIES = [
  "WooriTeam은 서비스 이용·문의·IR 요청 시 아래 정보를 수집할 수 있습니다.",
  "수집한 정보는 문의 응답, 서비스 안내, IR 미팅 및 파트너십 검토에만 사용됩니다.",
  "문의 및 IR 목적 달성 후 필요한 기간 동안 보관하며, 관계 법령에 따라 파기합니다.",
  "원칙적으로 이용자의 동의 없이 제3자에게 제공하지 않습니다. 법령에 따른 경우에만 예외로 합니다.",
  "웹사이트 이용 통계 및 개선을 위해 Google Analytics 등 분석 도구를 사용할 수 있습니다. 수집 데이터는 익명화·집계에 활용될 수 있으며, 개인정보처리방침의 범위 내에서 운영됩니다.",
  "개인정보 처리에 관한 문의는 문의하기 페이지를 통해 남겨 주시면 됩니다.",
];

const TERMS_HEADINGS = [
  "제1조 (목적)",
  "제2조 (서비스 내용)",
  "제3조 (이용 계약)",
  "제4조 (금지 행위)",
  "제5조 (면책)",
  "제6조 (약관 변경)",
  "제7조 (문의)",
];

const TERMS_BODIES = [
  "본 약관은 WooriTeam(이하 “서비스”)이 제공하는 같이 성장하기 등 팀 서비스의 이용 조건 및 절차, 이용자와의 권리·의무 관계를 규정함을 목적으로 합니다.",
  "서비스는 성장 과제 제안, 승인, 실행, 반복 성장 등 같이 성장하기 관련 기능을 제공합니다. 구체적인 기능은 서비스 내 안내에 따릅니다.",
  "이용 계약은 이용자가 서비스 가입·결제·이용 동의 절차를 완료한 시점에 성립합니다. 서비스는 필요한 경우 가입 승인을 거부하거나 사전 고지 후 서비스 내용을 변경할 수 있습니다.",
  "이용자는 법령 및 약관을 위반하거나, 서비스 운영을 방해하거나, 타인의 정보를 부정 사용하는 행위를 하여서는 안 됩니다. 위반 시 서비스 이용 제한 및 법적 조치가 있을 수 있습니다.",
  "서비스는 이용자가 생성·업로드한 콘텐츠에 대한 책임은 이용자에게 있으며, 서비스는 관련 법령이 정하는 범위 내에서만 책임을 집니다.",
  "서비스는 필요한 경우 약관을 변경할 수 있으며, 변경 시 서비스 내 공지 또는 이메일 등으로 안내합니다. 변경 후에도 이용을 계속하면 변경 약관에 동의한 것으로 봅니다.",
  "약관 및 서비스 이용에 관한 문의는 홈페이지 문의하기를 이용해 주세요.",
];

describe("법무 문서 사전의 문구 고정", () => {
  it("개인정보처리방침 제목과 업데이트 표기가 원문과 같다", () => {
    expect(legal.privacy.title).toBe("개인정보처리방침");
    expect(legal.privacy.updated).toBe("최종 업데이트: 2026년 3월");
  });

  it("이용약관 제목과 업데이트 표기가 원문과 같다", () => {
    expect(legal.terms.title).toBe("이용약관");
    expect(legal.terms.updated).toBe("최종 업데이트: 2026년 3월");
  });

  it("개인정보처리방침 조항 제목의 순서가 원문(1~6)과 같다", () => {
    expect(legal.privacy.sections.map((s) => s.heading)).toEqual(PRIVACY_HEADINGS);
  });

  it("이용약관 조항 제목의 순서가 원문(제1조~제7조)과 같다", () => {
    expect(legal.terms.sections.map((s) => s.heading)).toEqual(TERMS_HEADINGS);
  });

  it("두 문서의 조항 본문이 전환 이전과 한 글자도 다르지 않다", () => {
    expect(legal.privacy.sections.map((s) => s.body)).toEqual(PRIVACY_BODIES);
    expect(legal.terms.sections.map((s) => s.body)).toEqual(TERMS_BODIES);
  });

  it("개인정보처리방침 1번 조항에만 수집 항목 목록이 있고 나머지 열두 개 조항은 비어 있다", () => {
    expect(legal.privacy.sections[0].bullets).toEqual(["필수: 이름, 이메일, 문의 내용", "선택: 전화번호, 회사명 (문의 유형에 따라)"]);
    for (const section of legal.privacy.sections.slice(1)) {
      expect(section.bullets).toEqual([]);
    }
    for (const section of legal.terms.sections) {
      expect(section.bullets).toEqual([]);
    }
  });

  it("맨 아래 홈 링크 라벨이 원문과 같다", () => {
    expect(legal.homeLink).toBe("← 홈으로");
  });
});
