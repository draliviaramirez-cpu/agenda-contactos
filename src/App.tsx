import { useEffect, useState } from "react";
import BuscadorContactos from "./components/BuscadorContactos";
import type { CampoBusqueda } from "./components/BuscadorContactos";
import FormularioContacto from "./components/FormularioContacto";
import ListaContactos from "./components/ListaContactos";
import type {
  Contacto,
  Interaccion,
} from "./types/Contacto";

const CLAVE_LOCAL_STORAGE = "agenda-contactos";

function App() {
  const [busqueda, setBusqueda] = useState("");

  const [campoBusqueda, setCampoBusqueda] =
    useState<CampoBusqueda>("todos");

  const [soloPendientes, setSoloPendientes] =
    useState(false);

  const [contactos, setContactos] = useState<Contacto[]>(() => {
    const datosGuardados = localStorage.getItem(
      CLAVE_LOCAL_STORAGE,
    );

    if (!datosGuardados) {
      return [];
    }

    try {
      return JSON.parse(datosGuardados) as Contacto[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      CLAVE_LOCAL_STORAGE,
      JSON.stringify(contactos),
    );
  }, [contactos]);

  function agregarContacto(nuevoContacto: Contacto) {
    setContactos((contactosAnteriores) => [
      ...contactosAnteriores,
      nuevoContacto,
    ]);
  }

  function agregarInteraccion(
    contactoId: string,
    nuevaInteraccion: Interaccion,
  ) {
    setContactos((contactosAnteriores) =>
      contactosAnteriores.map((contacto) => {
        if (contacto.id !== contactoId) {
          return contacto;
        }

        return {
          ...contacto,
          fechaUltimoContacto: nuevaInteraccion.fecha,
          interacciones: [
            ...(contacto.interacciones ?? []),
            nuevaInteraccion,
          ],
        };
      }),
    );
  }

  function buscarContactos(
    texto: string,
    campo: CampoBusqueda,
  ) {
    setBusqueda(texto);
    setCampoBusqueda(campo);
  }

  const textoBuscado = busqueda.toLowerCase();

  const contactosFiltrados = contactos.filter((contacto) => {
    const nombre = contacto.nombreCompleto.toLowerCase();
    const empresa = contacto.empresa.toLowerCase();
    const etiqueta = contacto.etiquetas.toLowerCase();

    let coincideConBusqueda = false;

    if (campoBusqueda === "nombre") {
      coincideConBusqueda = nombre.includes(textoBuscado);
    } else if (campoBusqueda === "empresa") {
      coincideConBusqueda = empresa.includes(textoBuscado);
    } else if (campoBusqueda === "etiqueta") {
      coincideConBusqueda = etiqueta.includes(textoBuscado);
    } else {
      coincideConBusqueda =
        nombre.includes(textoBuscado) ||
        empresa.includes(textoBuscado) ||
        etiqueta.includes(textoBuscado);
    }

    const tieneSeguimiento =
      contacto.proximoSeguimiento !== "";

    return (
      coincideConBusqueda &&
      (!soloPendientes || tieneSeguimiento)
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-900">
            Agenda de Contactos
          </h1>

          <p className="mt-2 text-gray-600">
            ¡Bienvenidos!
          </p>
        </header>

        <FormularioContacto onAgregar={agregarContacto} />

        <div className="mt-8">
          <BuscadorContactos
            onBuscar={buscarContactos}
          />
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={soloPendientes}
              onChange={(evento) =>
                setSoloPendientes(evento.target.checked)
              }
              className="h-5 w-5 accent-green-900"
            />

            <span className="font-medium text-gray-700">
              Mostrar contactos con seguimiento pendiente
            </span>
          </label>
        </div>

        {busqueda && (
          <p className="mt-5 text-gray-600">
            Resultados para:{" "}
            <span className="font-semibold">{busqueda}</span>
          </p>
        )}

        <ListaContactos
          contactos={contactosFiltrados}
          onAgregarInteraccion={agregarInteraccion}
        />
      </div>
    </main>
  );
}

export default App;