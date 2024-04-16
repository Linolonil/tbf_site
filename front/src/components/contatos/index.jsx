export default function Contatos() {
  return (
    <section className="bg-black md:pt-10 sm:pt-10 lg:pt-1 h-[100vh] text-center" id="contatos">
      <h2 className="w-full h=[20%] font-MyVikingFont font-semibold uppercase pt-10 first-letter:text-red-500 text-5xl lg:text-4xl md:text-6xl md:font-bold md:mt-10 md:text-center text-white">Contatos</h2>
      <div className="h-[80%]  mx-auto mt-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  items-center mx-10 h-full">
          <div className="bg-white shadow-md rounded-md p-6">
            <h4 className="font-semibold mb-2">Email</h4>
            <p className="text-gray-800"><a href="mailto:tbfclan@gmail.com" target='_blank'>tbfclan@gmail.com</a></p>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h4 className="font-semibold mb-2">Telefone</h4>
            <p className="text-gray-800">(92)9400-28922</p>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h4 className="font-semibold mb-2">Discord</h4>
            <p className="text-gray-800"><a href="https://discord.gg/PN78gGNUMQ" target='_blank'>Redirecionador</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
