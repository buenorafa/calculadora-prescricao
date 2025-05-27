
export function Home() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute flex text-[#2B2823] gap-5 flex-col font-semibold text-7xl z-50 justify-center items-center bg-white/60 p-8 rounded-md fonteLogo">
        <p>CALCULADORA</p>
        <p>DE</p>
        <p>PRESCRIÇÃO</p>
        </div>
        <img src="/Footer.png" alt="Foto escritório" className="object-cover scale-x-125 w-full opacity-100" />
        </div>
    );

}
