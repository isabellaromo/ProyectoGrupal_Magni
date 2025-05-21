'use client'

import { IGenericTableProps } from '../../types/IGenericTablaProps'
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState, useMemo } from 'react';

export default function GenericTable<T>({
  dataType,
  columns,
  data,
  isLoading,
  error,
}: IGenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

  // Función para cambiar la configuración de orden
  const handleSort = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  // Memo para ordenar los datos solo si cambia la configuración
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortConfig.direction === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <table className="bg-[#DDD] min-w-[80%] p-10 text-black">
        <thead className="bg-brown text-white">
          <tr>
            {columns.map(column => (
              <th
                className="border-x-1 border-x-[#c4c4c4] px-4 py-2 text-center cursor-pointer select-none"
                key={column.key}
                onClick={() => handleSort(column.key as keyof T)}
              >
                {column.label.toUpperCase()}
                {sortConfig?.key === column.key && (
                  <span className="ml-1 text-[8px]">
                    {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length}>Cargando...</td>
            </tr>
          )}
          {!isLoading && sortedData.length > 0 &&
            sortedData.map((row, indexRow: number) => (
              <tr key={indexRow}>
                {columns.map(col => (
                  <td
                    className="border-x-1 border-x-[#313131] border-y-1 border-y-[#c0c0c0b6] px-2 py-2 text-center"
                    key={col.label}
                  >
                    {col.key === 'acciones' ? (
                      <td className='flex items-center justify-around'>
                        <Link 
                          to={`/${dataType}/administracion/editar/${row.id}`}
                          className="mr-2 hover:text-blue-800"
                        >
                          <MdEdit size={25} />
                        </Link>
                        <Link
                          to={`/${dataType}/administracion/eliminar/${row.id}`}
                          className="mr-2 hover:text-red-800"
                        >
                          <FaTrash />
                        </Link>
                      </td>
                    ) : col.key === 'productoActivo' ? (
                      row[col.key] === true ? 'SÍ' : 'NO'
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
