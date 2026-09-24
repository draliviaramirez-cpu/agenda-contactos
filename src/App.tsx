import { useState } from "react";
import { useContacts } from "./hooks/useContacts";
import { useBusqueda } from "./hooks/useBusqueda";
import BuscadorContactos from "./components/BuscadorContactos";
import FormularioContacto from "./components/FormularioContacto";
import ListaContactos from "./components/ListaContactos";
import type { Contacto } from "./types/Contacto";

function hoyISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}

function App() {
  const {
    contactos,
    agregarContacto,
    agregarInteraccion,
    eliminarInteraccion,
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

  const [contactoEditando, setContactoEditando] =
    useState<Contacto | null>(null);

  const hoy = hoyISO();

  const vencidos = contactos.filter(
    (c) =>
      c.proximoSeguimiento &&
      c.proximoSeguimiento < hoy,
  ).length;

  const pendientes = contactos.filter(
    (c) =>
      c.proximoSeguimiento &&
      c.proximoSeguimiento >= hoy,
  ).length;

  const interacciones = contactos.reduce(
    (total, c) =>
      total + (c.interacciones?.length ?? 0),
    0,
  );

  function guardarEdicion(
    id: string,
    datos: Partial<Contacto>,
  ) {
    actualizarContacto(id, datos);
    setContactoEditando(null);
  }

  function editarContacto(id: string) {
    const contacto = contactos.find(
      (c) => c.id === id,
    );

    if (contacto) {
      setContactoEditando(contacto);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">

        <header className="mb-7 rounded-3xl bg-emerald-950 p-7 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
            Directorio profesional
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Agenda de Contactos
          </h1>

          <p className="mt-2 max-w-2xl text-emerald-100">
            Organiza tus contactos, registra cada interacción
            y controla tus próximos seguimientos.
          </p>
        </header>

        <section
          className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Resumen de la agenda"
        >
          {[
            ["Contactos", contactos.length],
            ["Seguimientos pendientes", pendientes],
            ["Seguimientos vencidos", vencidos],
            ["Interacciones", interacciones],
          ].map(([titulo, valor]) => (
            <article
              key={titulo}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {titulo}
              </p>

              <p className="mt-1 text-3xl font-bold text-emerald-950">
                {valor}
              </p>
            </article>
          ))}
        </section>

        <FormularioContacto
          onAgregar={agregarContacto}
          onActualizar={guardarEdicion}
          contactoEditando={contactoEditando}
          onCancelarEdicion={() =>
            setContactoEditando(null)
          }
        />

        <div className="mt-8">
          <BuscadorContactos
            onBuscar={buscarContactos}
          />
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={soloPendientes}
              onChange={(e) =>
                setSoloPendientes(e.target.checked)
              }
              className="h-5 w-5 accent-emerald-900"
            />

            <span className="font-medium text-slate-700">
              Mostrar solo contactos con seguimiento pendiente
            </span>
          </label>
        </div>

        {busqueda && (
          <p className="mt-5 text-slate-600">
            Resultados para:{" "}
            <span className="font-semibold">
              {busqueda}
            </span>
          </p>
        )}

        <ListaContactos
          contactos={contactosFiltrados}
          onAgregarInteraccion={agregarInteraccion}
          onEliminarInteraccion={eliminarInteraccion}
          onEliminar={eliminarContacto}
          onEditar={editarContacto}
        />
      </div>
    </main>
  );
}

export default App;