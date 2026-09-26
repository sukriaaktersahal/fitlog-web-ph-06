// importing image from next
import Image from "next/image";

// hero function component
export default function Hero() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                {/* left text */}
                <div >
                    {/* Eyebrow text */}
                    <span className="mb-4 inline-block rounded-full border border-[#ccff00]/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ccff00]">
                    Workout Library</span>

                    {/* heading */}
                    <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
                        Train with intent.{" "}
                        <span className="text-[#ccff00]">Log every set.</span>
                    </h1>

                    {/* paragraph */}
                    <p className="mt-5 max-w-lg text-gray-400">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    {/* buttons */}
                    <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-[#b8e600]">
                        🏋️Browse Workouts
                     </a>
                </div>

                {/* right hero image */}
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Image
                        src="/banner.png"
                        alt="FitLog workout illustration"
                        className="h-full w-full object-cover"
                        width={700}
                        height={700}
                        priority
                    />
                     </div>
                    
                </div>
            </div>

        </section>
    );
}