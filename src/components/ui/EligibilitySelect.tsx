import { useEffect, useRef, useState } from "react";

const EligibilitySelect: React.FC<{
  label: string;
  icon?: string;
  value: TriBool;
  error?: string;
  onChange: (v: TriBool) => void;
  t: any;
}> = ({ label, icon, value, error, onChange, t }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Fermer si clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { value: "yes" as TriBool, label: t("yes") },
    { value: "no" as TriBool, label: t("no") },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", margin: "15px 0" }}>
      {/* Trigger — même apparence qu'un label copa */}
      <div
        className={`copa-fake-select${error ? " copa-input-invalid" : ""}${open ? " is-open" : ""}`}
        onClick={() => setOpen((p) => !p)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 18px",
          //   border: `1px solid ${error ? "#dc3545" : "rgba(119,119,119,.25)"}`,
          //   borderRadius: 6,
          background: "#fff",
          cursor: "pointer",
          userSelect: "none",
          minHeight: 55,
        }}
      >
        <i
          className={icon ? `fa ${icon}` : "ti ti-shield"}
          style={{ fontSize: 16, color: "#999", flexShrink: 0 }}
        />
        <span
          style={{ flex: 1, fontSize: 14, color: "#919191", lineHeight: 1.4 }}
        >
          {selected ? selected.label : label}
          {/* {!selected && <span style={{ color: "#dc3545" }}> *</span>} */}
        </span>
        <i
          className="fa fa-caret-down"
          style={{
            fontSize: 14,
            color: "#000",
            flexShrink: 0,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid rgba(119,119,119,.2)",
            boxShadow: "0 6px 20px rgba(0,0,0,.1)",
            zIndex: 99,
            overflow: "hidden",
          }}
        >
          {/* Question en tête de dropdown */}
          <div
            style={{
              padding: "10px 14px 8px",
              borderBottom: "1px solid #f0f0f0",
              background: "#f7f7f7"
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#888",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {label}
            </p>
          </div>
          {options.map((o, index) => {
            const isSelected = value === o.value;
            const isHovered = hovered === o.value;
            const highlight = hovered
              ? isHovered
              : value
                ? isSelected
                : index === 0;

            return (
              <div
                key={o.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setHovered(o.value)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "2px 16px",
                  fontSize: 14,
                //   fontWeight: 600,
                  cursor: "pointer",
                  background: highlight ? "#1967D2" : "transparent",
                  color: highlight ? "#fff" : "#333",
                  transition: "background .15s, color .15s",
                }}
              >
                {o.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EligibilitySelect;

type TriBool = "yes" | "no" | "";
