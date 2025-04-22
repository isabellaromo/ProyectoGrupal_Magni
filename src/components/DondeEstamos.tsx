const DondeEstamos: React.FC = () => {
  return (
      <div id='dondeEstamos' className="relative w-full h-[500px] pb-[35%]">
        <iframe
          src="https://maps.google.com/maps?q=av.+las+heras+y+san+martin%2C+mendoza&output=embed"
          className="absolute top-0 left-0 w-full h-full border-0"
          loading="lazy"
          title="Mapa de ubicación"
        ></iframe>
      </div>
    );
  };

export default DondeEstamos;
