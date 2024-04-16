import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import viking from "../../assets/viking.png";
import EventosModal from "../eventos";

const Navbar = () => {
  const [currentSection, setCurrentSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 4.2) {
          current = section.id;
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed  w-full lg:h-auto md:h-auto top-0 z-50 ease-in duration-300 border-b border-b-slate-800 ${
        isVisible ? "bg-slate-900 " : "bg-transparent"
      }`}
    >
      <div className="w-full h-full sm:px-6 md:px-7 lg:px-8  ">
        <div className="relative flex items-center h-auto-full justify-between ">
          <div className="w-full flex items-center p-2 sm:flex md:flex md:items-center justify-between px-10 lg:items-center lg:justify-between ">
            <div className="flex items-center  justify-between">
              <a href="#">
                <img
                  className={`size-10  md:size-20 lg:size-12`}
                  src={viking}
                  alt="vikiing"
                />
              </a>
            </div>
            {/*Menu desktop  */}
            <div className="hidden lg:block ">
              <div className="flex space-x-4">
                <a
                  href="#sobre"
                  className={`${
                    currentSection === "sobre"
                      ? "text-red-500"
                      : "text-gray-300"
                  } hover:text-red-700 px-4 py-2 rounded-md text-base font-bold hover:bg-slate-700 hover:scale-110  transition-all duration-500 `}
                >
                  Historia
                </a>
                <a
                  href="#integrantes"
                  className={`${
                    currentSection === "integrantes"
                      ? "text-red-500"
                      : "text-gray-300"
                  } hover:text-red-700 px-4 py-2 rounded-md text-base font-bold hover:bg-slate-700 hover:scale-110  transition-all duration-500`}
                >
                  Integrantes
                </a>
                <a
                  href="#desempenho"
                  className={`${
                    currentSection === "desempenho"
                      ? "text-red-500"
                      : "text-gray-300"
                  } hover:text-red-700 px-4 py-2 rounded-md text-base font-bold hover:bg-slate-700 hover:scale-110  transition-all duration-500`}
                >
                  Desempenho
                </a>
                <a
                  href="#contatos"
                  className={`${
                    currentSection === "contatos"
                      ? "text-red-500"
                      : "text-gray-300"
                  } hover:text-red-700 px-4 py-2 rounded-md text-base font-bold hover:bg-slate-700 hover:scale-110  transition-all duration-500`}
                >
                  Contatos
                </a>
                <div className="text-white border-red-800 border   border-l-red-850"></div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-slate-400 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-700 active:bg-purple-900 focus:outline-none"
                >
                  Eventos
                </button>
              </div>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-700 hover:bg-gray-700 focus:outline-none focus:ring-0"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <FiX className="size-8 md:size-20" />
                ) : (
                  <FiMenu className="size-8 md:size-20" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <EventosModal onClose={handleCloseModal} />}

      {/* Menu responsivo drop */}
      {isOpen && (
        <div
          className=" block lg:hidden bg-slate-900 w-full absolute transition-all duration-500 shadow-xl"
          id="mobile-menu"
        >
          <div className="px-2 pt-10 pb-10 space-y-1   flex justify-center items-center flex-col gap-20 ">
            <a
              href="#sobre"
              onClick={() => setIsOpen(!isOpen)}
              className=" text-gray-300  hover:text-red-700 block px-3 py-2 rounded-md text-5xl w-full text-center font-bold "
            >
              Historia
            </a>
            <a
              href="#integrantes"
              onClick={() => setIsOpen(!isOpen)}
              className=" text-gray-300  hover:text-red-700 block px-3 py-2 rounded-md text-5xl w-full text-center font-bold "
            >
              Integrantes
            </a>
            <a
              href="#desempenho"
              onClick={() => setIsOpen(!isOpen)}
              className=" text-gray-300  hover:text-red-700 block px-3 py-2 rounded-md text-5xl w-full text-center font-bold "
            >
              Desempenho
            </a>
            <a
              href="#contatos"
              onClick={() => setIsOpen(!isOpen)}
              className=" text-gray-300  hover:text-red-700 block px-3 py-2 rounded-md text-5xl w-full text-center font-bold "
            >
              Contatos
            </a>
            <button
              onClick={() => setShowModal(true)}
              className=" bg-slate-400 text-white   text-5xl  px-11 py-6  rounded-full transition duration-200 ease-in-out hover:bg-red-700 active:bg-purple-900 focus:outline-none "
            >
              Eventos
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

