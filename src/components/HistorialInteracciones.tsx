import { useState, type FormEvent } from "react";
import type {
  Interaccion,
  TipoInteraccion,
} from "../types/Contacto";

interface HistorialInteraccionesProps {
  contactoId: string;
  interacciones: Interaccion[];
  onAgregarInteraccion: (
    contactoId: string,
    interaccion: Interaccion,
  ) => void;
}

function obtenerFechaActual() {
  const fechaActual = new Date();

  const anio = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaActual.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function mostrarFecha(fecha: string) {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

function HistorialInteracciones({
  contactoId,
  interacciones,
  onAgregarInteraccion,
}: HistorialInteraccionesProps) {
  const [tipo, setTipo] =
    useState<TipoInteraccion>("Llamada");

  const [fecha, setFecha] = useState(obtenerFechaActual());
  const [descripcion, setDescripcion] = useState("");

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nuevaInteraccion: Interaccion = {
      id: crypto.randomUUID(),
      tipo,
      fecha,
      descripcion: descripcion.trim(),
    };

    onAgregarInteraccion(contactoId, nuevaInteraccion);

    setTipo("Llamada");
    setFecha(obtenerFechaActual());
    setDescripcion("");
  }

  return (
    <section className="mt-5 border-t border-gray-200 pt-5">
      <h4 className="mb-3 text-lg font-bold text-gray-800">
        Historial de interacciones
      </h4>

      {interacciones.length === 0 ? (
        <p className="rounded-lg bg-gray-100 p-3 text-gray-500">
          Todavía no se han registrado ninguna interacción.
        </p>
      ) : (
        <div className="mb-4 space-y-3">
          {interacciones.map((interaccion) => (
            <article
              key={interaccion.id}
              className="rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-green-900">
                  {interaccion.tipo}
                </span>

                <span className="text-sm text-gray-500">
                  {mostrarFecha(interaccion.fecha)}
                </span>
              </div>

              <p className="mt-2 text-gray-700">
                {interaccion.descripcion}
              </p>
            </article>
          ))}
        </div>
      )}

      <form
        onSubmit={manejarEnvio}
        className="rounded-lg bg-gray-100 p-4"
      >
        <p className="mb-3 font-semibold text-gray-800">
          Agregar una interacción
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`tipo-${contactoId}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>

            <select
              id={`tipo-${contactoId}`}
              value={tipo}
              onChange={(evento) =>
                setTipo(
                  evento.target.value as TipoInteraccion,
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-900"
            >
              <option value="Llamada">Llamada</option>
              <option value="Reunión">Reunión</option>
              <option value="Correo">Correo</option>
              <option value="Nota">Nota</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`fecha-${contactoId}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>

            <input
              id={`fecha-${contactoId}`}
              type="date"
              value={fecha}
              onChange={(evento) =>
                setFecha(evento.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={`descripcion-${contactoId}`}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>

            <textarea
              id={`descripcion-${contactoId}`}
              value={descripcion}
              onChange={(evento) =>
                setDescripcion(evento.target.value)
              }
              required
              rows={2}
              placeholder="Describe la llamada, reunión, correo o nota"
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 rounded-lg bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700"
        >
          Agregar al historial
        </button>
      </form>
    </section>
  );
}

export default HistorialInteracciones;