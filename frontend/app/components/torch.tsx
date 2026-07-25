import Image from "next/image";

type TorchProps = {
  side: "left" | "right";
  className?: string;
};

export function Torch({ side, className = "" }: TorchProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      } ${className}`}
    >
      <div className="relative">
        {/* Warm glow radiating from the flame */}
        <div className="animate-glow absolute -inset-8 rounded-full bg-torch/30 blur-2xl" />
        <div className="animate-glow absolute -inset-4 rounded-full bg-torch/40 blur-xl" />
        <div className="animate-flicker relative">
          <Image
            src="/images/torch.png"
            alt=""
            width={48}
            height={72}
            className="h-16 w-auto mix-blend-screen sm:h-20"
          />
        </div>
      </div>
    </div>
  );
}
