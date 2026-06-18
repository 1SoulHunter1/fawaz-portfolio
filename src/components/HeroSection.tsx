import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#1a1a1b] pt-24">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(/images/hero-pattern.gif)",
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-6">
        {/* Top area: DUNCAN ROBERT + centered photo */}
        <div className="relative mt-8 w-full">
          {/* DUNCAN ROBERT - top left area */}
          <p className="absolute left-0 top-0 text-lg font-light tracking-[2px] text-white uppercase">
            DUNCAN ROBERT
          </p>

          {/* Centered photo */}
          <div className="relative mx-auto h-[476px] w-[340px]">
            <Image
              src="/images/portrait-front.jpg"
              alt="Portrait of portfolio creator – front view"
              width={340}
              height={476}
              className="rounded-[20px] object-cover"
              priority
            />
          </div>
        </div>

        {/* DIGITAL ... DESIGNER heading row */}
        <div className="relative -mt-32 flex w-full items-center justify-between">
          <h1 className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-3.6px] text-white uppercase lg:text-[120px] lg:leading-[132px]">
            DIGITAL
          </h1>
          <h1
            className="font-heading text-[60px] font-bold leading-[1.1] tracking-[-3.6px] uppercase lg:text-[120px] lg:leading-[132px]"
            style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}
          >
            DESIGNER
          </h1>
        </div>

        {/* Bottom row: Hi + wave on left, subtitle on right */}
        <div className="mt-4 flex w-full items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[40px] font-normal text-[#303030]">Hi</span>
            <span className="text-3xl">👋</span>
          </div>
          <p className="max-w-[348px] text-right text-lg font-light leading-[27px] text-white">
            I&apos;m a US-based digital designer and Framer developer
          </p>
        </div>
      </div>
    </section>
  );
}
