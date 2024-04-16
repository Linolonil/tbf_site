import style from './footer.module.css'

export default function Footer(){
  return(
    <section className="w-full bg-slate-900 text-center p-2.5 border-t border-red-800  flex justify-center items-center">
      <h4 className='text-white font-sans font-extrabold italic'>&copy;TBF team  2024 </h4>
    </section>
  )
}