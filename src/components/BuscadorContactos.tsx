import { useState, type FormEvent } from "react";

export type CampoBusqueda =
  | "todos"
  | "nombre"
  | "empresa"
  | "etiqueta";

interface BuscadorContactosProps {
  onBuscar: (
    texto: string,
    campo: CampoBusqueda,
  ) => void;
}

function BuscadorContactos({
  onBuscar,
}: BuscadorContactosProps) {
  const [texto, setTexto] = useState("");
  const [campo, setCampo] =
    useState<CampoBusqueda>("todos");

  function manejarBusqueda(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    onBuscar(texto.trim(), campo);
  }

  function limpiarBusqueda() {
    setTexto("");
    setCampo("todos");
    onBuscar("", "todos");
  }

  return (
    <form
      onSubmit={manejarBusqueda}
      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-md"
    >
      <p className="mb-4 text-lg font-bold text-stone-900">
        Buscar contactos
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="campoBusqueda"
            className="mb-1 block font-medium text-stone-700"
          >
            Buscar por
          </label>

          <select
            id="campoBusqueda"
            value={campo}
            onChange={(evento) =>
              setCampo(
                evento.target.value as CampoBusqueda,
              )
            }
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-green-900"
          >
            <option value="todos">Todos los campos</option>
            <option value="nombre">Nombre</option>
            <option value="empresa">Empresa</option>
            <option value="etiqueta">Etiqueta</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="busqueda"
            className="mb-1 block font-medium text-stone-700"
          >
            Texto para buscar
          </label>

          <input
            id="busqueda"
            type="search"
            value={texto}
            onChange={(evento) =>
              setTexto(evento.target.value)
            }
            placeholder="Escribe lo que deseas encontrar"
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-green-900"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          Buscar
        </button>

        <button
          type="button"
          onClick={limpiarBusqueda}
          className="rounded-lg bg-stone-200 px-6 py-3 font-semibold text-stone-800 transition hover:bg-stone-300"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default BuscadorContactos;