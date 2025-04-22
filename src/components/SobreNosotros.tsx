const SobreNosotros: React.FC = () => {
  return (
    <div className="flex w-[80%] h-[250px] items-center justify-center gap-[50px] self-center justify-self-center" id='sobreNosotros'>
      <div>
        <div className='w-[80%] text-left flex gap-[50px]'>
          <div>
            <p className="text-[20px] font-semibold text-[#E2AA11] mt-[20px]">Email</p>
            <p className="text-[25px] font-normal text-black mb-[10px]">difusa@gmail.com</p>
            <p className="text-[20px] font-semibold text-[#E2AA11] mt-[20px]">Telefono</p>
            <p className="text-[25px] font-normal text-black mb-[10px]">+54294555112</p>
          </div>
          <div>
            <p className="text-[20px] font-semibold text-[#E2AA11] mt-[20px]">Instagram</p>
            <p className="text-[25px] font-normal text-black mb-[10px]">@difusamusica</p>
            <p className="text-[20px] font-semibold text-[#E2AA11] mt-[20px]">Dirección</p>
            <p className="text-[25px] font-normal text-black mb-[10px]">Av. Las Heras y Av. San Martin, Ciudad de Mendoza</p>
          </div>
        </div>
      </div>
      <p className='border border-[rgba(224,224,104,0.452)] text-[20px] font-normal text-black mb-[10px] mt-[20px] text-center w-[30%]'>
        Difusa es una tienda de instrumentos musicales con ya más de 15
        años de experiencia. Tenemos el conocimiento y la capacidad como para
        informarte acerca de las mejores elecciones para tu compra musical.
      </p>
    </div>
  );
};

export default SobreNosotros;
