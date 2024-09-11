
// eslint-disable-next-line react/prop-types
const Navbar = ({theme}) => {
  return (
    // <nav className="flex bg-blue-950 text-white justify-between px-7 py-4 fixed top-0 w-full">
    <nav className={
      theme === "darkGreen"
        ? " bg-[#07232e] text-[#f9e3e5] flex justify-between px-7 py-4 fixed top-0 w-full"
        : theme === "skyBlue"
        ? " bg-[#a6cbdd] text-[#42433f] flex justify-between px-7 py-4 fixed top-0 w-full"
        : theme === "black"
        ? " bg-[#012e40] text-[#fdfeff] flex justify-between px-7 py-4 fixed top-0 w-full"
        : ""}>
        <div className="logo text-xl font-bold cursor-pointer hover:text-slate-200 ">TaskFlow</div>
        <ul className="flex gap-8 ">
            <li className="cursor-pointer hover:text-slate-200 hover:font-bold hover:transition-all ">Home</li>
            <li className="cursor-pointer hover:text-slate-200 hover:font-bold hover:transition-all ">List</li>
        </ul>
    </nav>
  )
}

export default Navbar
