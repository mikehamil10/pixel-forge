import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex top-0 p-5 space-between sticky bg-white z-50 shadow-md">
      {/* left column */}
      <div className="flex space-x-2 items-center grow">
        <Image
          src="/open-ai-logo-8B9BFEDC26-seeklogo.com.png"
          alt="Logo"
          width={30}
          height={30}
        />

        <div>
          <h1 className="font-bold">
            The <span className="uppercase">PixelForge</span>{" "}
            <span className="text-violet-500">AI</span> Image Generator
          </h1>

          <h2 className="text-xs">
            Powered By DALL&middot;E 2, ChatGPT &amp; Microsoft Azure
          </h2>
        </div>
      </div>

      {/* right column */}
      <div className="flex items-center text-gray-500 text-xs md:text-base divide-x">
        <Link href="#" className="px-2 font-light">
          Github Repo
        </Link>
      </div>
    </header>
  );
}
