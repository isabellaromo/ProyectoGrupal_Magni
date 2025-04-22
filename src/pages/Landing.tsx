import List from "../common/List";
import Carrousel from "../components/Carrousel";
import DondeEstamos from "../components/DondeEstamos";
import SobreNosotros from "../components/SobreNosotros";

const Landing: React.FC = () => {
  return (
    <>
    <Carrousel />
    <p className="titulo-seccion" id="productos">PRODUCTOS</p>
    <List />

    <div>
      <p className="titulo-seccion">
        DÓNDE ESTAMOS
      </p>
      <DondeEstamos />
    </div>
    <p className="titulo-seccion">
        SOBRE NOSOTROS
    </p>
    <SobreNosotros />
    </>
  );
};

export default Landing;
