// importing image from next
import Image from "next/image";

// footer function component
export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-[#0a0a0a]">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gafor themep-4 px-4 py-6 sm:flex-row sm:px-6">
                {/* left logo */}
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Fitlog Logo" width={28} height={28} className="h-7 w-7 object-contain" />
                    <span className="font-display text-lg font-bold tracking-wide">FITLOG</span>
                </div>
                
                {/* right text */}
                <p className="text-center text-xs text-gray-500 sm:text-right">
                    @2026 Fitlog - Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
}