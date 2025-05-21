// components/Graficos.tsx
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


interface VentaMensual {
  anio: number;
  mes: number;
  total: number;
}

interface VentaInstrumento {
  nombre: string;
  cantidadTotal: number;
}


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const AdminCharts = () => {
  const [mensuales, setMensuales] = useState<VentaMensual[]>([]);
  const [instrumentos, setInstrumentos] = useState<VentaInstrumento[]>([]);


  useEffect(() => {
    fetch('http://localhost:8080/pedido/mensuales')
      .then(res => res.json())
      .then((data: VentaMensual[]) => setMensuales(data));

    fetch('http://localhost:8080/detalle/instrumento/ventas')
      .then(res => res.json())
      .then((data: VentaInstrumento[]) => setInstrumentos(data));
  }, []);

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

  const barData = {
    labels: mensuales.map(item => `${item.mes}/${item.anio}`),
    datasets: [
      {
        label: 'Cantidad de pedidos',
        data: mensuales.map(item => item.total),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      }
    ],
  };

  const pieData = {
    labels: instrumentos.map(item => item.nombre),
    datasets: [
      {
        label: 'Cantidad vendida',
        data: instrumentos.map(item => item.cantidadTotal),
        backgroundColor: [
          '#60a5fa',
          '#f87171',
          '#34d399',
          '#fbbf24',
          '#a78bfa',
          '#f472b6',
        ],
      },
    ],
  };

  return (
  <div className="p-4 flex flex-wrap justify-center gap-6">
    <div className="bg-white p-4 rounded-2xl shadow-md w-[40%] h-[50vh]">
      <h3 className="text-xl font-bold mb-4 text-center">Ventas por mes</h3>
      <Bar data={barData} options={chartOptions} />
    </div>
    <div className="bg-white p-4 rounded-2xl shadow-md w-[40%] h-[50vh]">
      <h3 className="text-xl font-bold mb-4 text-center">Ventas por instrumento</h3>
      <Pie data={pieData} options={chartOptions} />
    </div>
  </div>
  );
};

export default AdminCharts;
