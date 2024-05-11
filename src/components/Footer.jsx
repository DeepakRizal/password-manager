export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center  w-full bg-slate-800">
      <div className="logo font-bold text-2xl text-white">
        <span className="text-green-700"> &lt;</span>
        Pass
        <span className="text-green-700">OP/ &gt;</span>
      </div>
      <div className="flex items-center gap-2 text-white pb-2">
        Created with{" "}
        <img
          className="w-5 filter saturate-0"
          src="/heart.png"
          alt="Heart image"
        />{" "}
        with Deepak Rizal
      </div>
    </div>
  );
}
