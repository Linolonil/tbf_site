import Cards from '../cards';

export default function Integrantes() {


  return (
    <section className="w-full  h-full  md:pt-10 sm:pt-10 lg:pt-1 flex justify-center items-center flex-col py-10  bg-gradient-to-t from-black to-gray-900 box-border " id="integrantes">
      <div className="w-full  flex justify-center items-center flex-col gap-2.5 ">
        <div className="mb-8">
        <h2 className=" w-full h=[20%] font-MyVikingFont font-semibold uppercase pt-10 first-letter:text-red-500 text-5xl lg:text-4xl md:text-6xl md:font-bold md:mt-10 md:text-center text-white">Integrantes</h2>
        </div>
        <Cards className="border"/>

      </div>
    </section>
  );
}
