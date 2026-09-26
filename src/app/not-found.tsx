// 404 - not found page
// importing link
import Link from "next/link";

// not found function
export default function NotFound(){
    return(
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="font-display text-7xl font-bold text-[#ccff00] sm:text-9xl">404</h1>

            {/* heading */}
            <h2 className="font-display mt-4 text-2xl font-bold uppercase sm:text-3xl">Page Not Found</h2>

            {/* description */}
            <p className="mt-3 max-w-md text-sm text-gray-500">
                Looks like you wandered off the training floor. This page doesn&apos;t exit in our workout library.
            </p>

            {/* cta */}
            <Link href="/" className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-[#b8e600]">←Back to Home</Link>
        </div>
    );
}