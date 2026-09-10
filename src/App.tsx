import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { useBusqueda } from "./hooks/useBusqueda";
import BuscadorContactos from "./components/BuscadorContactos";
import FormularioContacto from "./components/FormularioContacto";
import ListaContactos from "./components/ListaContactos";
import type { Contacto } from "./types/Contacto";

function App() {
  const {
    contactos,
    agregarContacto,
    agregarInteraccion,
    eliminarContacto,
    actualizarContacto,
  } = useContacts();

  const {
    busqueda,
    soloPendientes,
    contactosFiltrados,
    buscarContactos,
    setSoloPendientes,
  } = useBusqueda(contactos);

  const [contactoEditando, setContactoEditando] = useState<Contacto | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-900">Agenda de Contactos</h1>
          <p className="mt-2 text-gray-600">¡Bienvenidos!</p>
        </header>

        <FormularioContacto
          onAgregar={agregarContacto}
          onActualizar={actualizarContacto}
          contactoEditando={contactoEditando}
        />

        <div className="mt-8">
          <BuscadorContactos onBuscar={buscarContactos} />
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={soloPendientes}
              onChange={(e) => setSoloPendientes(e.target.checked)}
              className="h-5 w-5 accent-green-900"
            />
            <span className="font-medium text-gray-700">
              Mostrar contactos con seguimiento pendiente
            </span>
          </label>
        </div>

        {busqueda && (
          <p className="mt-5 text-gray-600">
            Resultados para: <span className="font-semibold">{busqueda}</span>
          </p>
        )}

        <ListaContactos
          contactos={contactosFiltrados}
          onAgregarInteraccion={agregarInteraccion}
          onEliminar={eliminarContacto}
          onEditar={(id) => {
            const contacto = contactos.find((c) => c.id === id);
            if (contacto) setContactoEditando(contacto);
          }}
          />
      </div>
    </main>
  );
}

export default App;