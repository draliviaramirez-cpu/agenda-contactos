import { useState, type FormEvent } from "react";
import type { Contacto } from "../types/Contacto";

interface FormularioContactoProps {
  onAgregar: (contacto: Contacto) => void;
}

const estadoInicial = {
  nombreCompleto: "",
  empresa: "",
  telefono: "",
  correo: "",
  etiquetas: "",
  proximoSeguimiento: "",
  notaGeneral: "",
  fechaUltimoContacto: "",
};

function FormularioContacto({
  onAgregar,
}: FormularioContactoProps) {
  const [formulario, setFormulario] = useState(estadoInicial);

  function manejarCambio(
    evento: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = evento.target;

    setFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: value,
    }));
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nuevoContacto: Contacto = {
      id: crypto.randomUUID(), 
      ...formulario,
      interacciones: [],
    };

    onAgregar(nuevoContacto);
    setFormulario(estadoInicial);
  }

  return (
    <form
      onSubmit={manejarEnvio}
      className="rounded-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Registrar contacto
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="nombreCompleto"
            className="mb-1 block font-medium text-gray-700"
          >
            Nombre completo
          </label>

          <input
            id="nombreCompleto"
            name="nombreCompleto"
            type="text"
            value={formulario.nombreCompleto}
            onChange={manejarCambio}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="empresa"
            className="mb-1 block font-medium text-gray-700"
          >
            Empresa/Organización
          </label>

          <input
            id="empresa"
            name="empresa"
            type="text"
            value={formulario.empresa}
            onChange={manejarCambio}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="mb-1 block font-medium text-gray-700"
          >
            Teléfono
          </label>

          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={formulario.telefono}
            onChange={manejarCambio}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="correo"
            className="mb-1 block font-medium text-gray-700"
          >
            Correo electrónico
          </label>

          <input
            id="correo"
            name="correo"
            type="email"
            value={formulario.correo}
            onChange={manejarCambio}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="etiquetas"
            className="mb-1 block font-medium text-gray-700"
          >
            Etiqueta o grupo
          </label>

          <input
            id="etiquetas"
            name="etiquetas"
            type="text"
            value={formulario.etiquetas}
            onChange={manejarCambio}
            placeholder="Ejemplo: Trabajo"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="proximoSeguimiento"
            className="mb-1 block font-medium text-gray-700"
          >
            Próximo seguimiento
          </label>

          <input
            id="proximoSeguimiento"
            name="proximoSeguimiento"
            type="date"
            value={formulario.proximoSeguimiento}
            onChange={manejarCambio}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div>
          <label
            htmlFor="fechaUltimoContacto"
            className="mb-1 block font-medium text-gray-700"
          >
            Fecha del último contacto
          </label>

          <input
            id="fechaUltimoContacto"
            name="fechaUltimoContacto"
            type="date"
            value={formulario.fechaUltimoContacto}
            onChange={manejarCambio}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="notaGeneral"
            className="mb-1 block font-medium text-gray-700"
          >
            Nota general
          </label>

          <textarea
            id="notaGeneral"
            name="notaGeneral"
            value={formulario.notaGeneral}
            onChange={manejarCambio}
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-900"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
      >
        Guardar contacto
      </button>
    </form>
  );
}

export default FormularioContacto;