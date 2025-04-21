export const Logo: React.FC = () => {
  return (
    <div className="absolute bottom-0 w-full flex justify-center">
      <a
        href="https://blue-bliss.gr/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 bg-[#0bb4aa] rounded-[25px] w-[50vw] sm:w-[25vw] md:w-[15vw]"
      >
        <img src="/logo-map.png" alt="Blue Bliss Logo" className="w-full py-1" />
      </a>
    </div>
  );
};