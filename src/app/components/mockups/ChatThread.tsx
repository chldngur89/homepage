import { useCopy } from "@/app/i18n/useCopy";
import { MockChrome, MockFrame } from "./frame";

export function ChatThread() {
  const { chat } = useCopy().mockups;

  return (
    <MockFrame ratio="16 / 11">
      <MockChrome label={chat.appLabel} />

      <div className="grid grid-cols-4 gap-2 border-b border-line-2 px-4 py-3">
        {chat.fields.map((field) => (
          <div key={field.label} className="rounded-lg border border-line-2 px-2.5 py-1.5">
            <p className="text-[9px] font-semibold tracking-[0.06em] text-ink-3">
              {field.label}
            </p>
            <p className="mt-0.5 truncate text-[12px] font-medium text-ink">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 py-4">
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={message.fromUser ? "flex justify-end" : "flex justify-start"}
          >
            <p
              className={`max-w-[78%] whitespace-pre-line rounded-xl px-3 py-2 text-[12.5px] leading-[1.6] ${
                message.fromUser
                  ? "bg-invert text-white"
                  : "bg-panel text-ink-2"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
