import { Home, ArrowLeft } from "lucide-react";
import { LocaleLink } from "@/app/components/LocaleLink";

export default function NotFound() {
  return (
    <div className="bg-ground min-h-screen flex items-center justify-center px-6">
      <div className="rise text-center max-w-lg">
        <div className="text-8xl md:text-9xl font-bold text-ink-3 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-3">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-ink-2 mb-8">
          요청하신 주소가 잘못되었거나 페이지가 이동·삭제되었을 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LocaleLink
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-invert text-white rounded-xl font-semibold transition-all"
          >
            <Home className="w-5 h-5" />
            홈으로
          </LocaleLink>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-line rounded-xl font-semibold text-ink transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
