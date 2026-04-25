import { VButton } from "./Button";

export function BottomNav() {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full px-8 py-2 flex items-center gap-4"
      style={{
        boxShadow:
          "0 1px 2px 0 rgba(5,26,36,0.05), 0 4px 16px rgba(5,26,36,0.08), 0 12px 30px rgba(5,26,36,0.06)",
      }}
    >
      <span
        className="text-2xl font-semibold"
        style={{ color: "#051A24", fontFamily: "PP Mondwest, serif" }}
      >
        V
      </span>
      <VButton variant="primary" className="!py-2 !px-5">Start a chat</VButton>
    </div>
  );
}
