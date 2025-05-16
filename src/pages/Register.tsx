import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { Select } from './ui/select';

const Register: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [rol, setRol] = useState('Visor');
  const [isLoading, setIsLoading] = useState(false);
  
  const { authState, register } = useAuth();
  const { isAuthenticated } = authState;
  const navigate = useNavigate();
  const { toast } = useToast();

  // Usamos useEffect para controlar la redirección tras cambios en el estado de autenticación
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombreUsuario || !clave || !confirmarClave) {
      toast({
        title: 'Error',
        description: 'Por favor, completa todos los campos',
        variant: 'destructive',
      });
      return;
    }

    if (clave !== confirmarClave) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await register(nombreUsuario, clave, rol);
      toast({
        title: 'Registro exitoso',
        description: '¡Bienvenido a Music Elements!',
      });
    } catch (error: any) {
      toast({
        title: 'Error de registro',
        description: error.message || 'No se pudo completar el registro',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Music Elements</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">Crear Cuenta</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700">
                Nombre de Usuario
              </label>
              <Input
                id="nombreUsuario"
                name="nombreUsuario"
                type="text"
                autoComplete="username"
                required
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu nombre de usuario"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="clave" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Input
                id="clave"
                name="clave"
                type="password"
                autoComplete="new-password"
                required
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmarClave" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <Input
                id="confirmarClave"
                name="confirmarClave"
                type="password"
                autoComplete="new-password"
                required
                value={confirmarClave}
                onChange={(e) => setConfirmarClave(e.target.value)}
                className="mt-1"
                placeholder="Confirma tu contraseña"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                disabled={isLoading}
              >
                <option value="Visor">Visor</option>
                <option value="Operador">Operador</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;