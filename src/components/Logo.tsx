export const Logo: React.FC = () => {
  return (
    <div className="absolute top-3 w-full flex justify-center">
      <a
        href="https://blue-bliss.gr/"
        target="_blank"
        rel="noopener noreferrer"
        className=" bg-[#0bb4aa] rounded-[25px] w-[30vw] sm:w-[20vw] md:w-[10vw]"
      >
        <img src="/logo-map.png" alt="Blue Bliss Logo" className="w-full py-1" />
      </a>
    </div>
  );
};