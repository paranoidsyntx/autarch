type SectionHeadingProps = {
  title: string;
};

export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-display mt-5 text-6xl sm:text-8xl leading-none text-balance text-foreground">
        {title}
      </h2>
      <PixelDivider />
    </div>
  );
}

export function PixelDivider() {
  return (
    <div className="mt-6 flex items-center gap-3" aria-hidden="true">
      <span className="h-px w-12 bg-foreground/30 sm:w-24" />
      <span className="h-2.5 w-2.5 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-foreground/30 sm:w-24" />
    </div>
  );
}
