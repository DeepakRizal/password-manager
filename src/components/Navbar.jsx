export default function Navbar() {
  return (
    <nav className="bg-slate-700 text-white ">
      <div className="mycontainer flex justify-between  h-14 items-center py-5 ">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </div>
        {/* <ul className="flex">
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button>
          <img className="invert" src="/icons8-github.svg" alt="github logo" />
        </button>
      </div>
    </nav>
  );
}
