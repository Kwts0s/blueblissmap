import { FC, useEffect, useRef } from "react";

interface ModalProps {
  landmark: {
    name?: string;
    img?: string;
    lngLat: [number, number];
  };
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ landmark, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!landmark.name || !landmark.img) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl mx-4 sm:mx-6 p-6 sm:p-8 flex flex-col h-[85vh] sm:h-[90vh] max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-montserrat font-semibold text-gray-800">
            {landmark.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <img
          src={landmark.img}
          alt={landmark.name}
          className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] object-cover rounded-md mb-4 flex-grow"
        />
        
        <button
          onClick={onClose}
          className="w-full md:w-24 bg-teal-600 text-white font-montserrat py-2 sm:py-3 rounded-md hover:bg-teal-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
