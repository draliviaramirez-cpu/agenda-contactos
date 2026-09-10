import HistorialInteracciones from "./HistorialInteracciones";
import type {
  Contacto,
  Interaccion,
} from "../types/Contacto";

interface ListaContactosProps {
  contactos: Contacto[];
  onAgregarInteraccion: (
    contactoId: string,
    interaccion: Interaccion,
  ) => void;
  onEliminar: (contactoId: string) => void;
  onEditar: (contactoId: string) => void;
}

function mostrarFecha(fecha: string) {
  if (!fecha) {
    return "Sin fecha";
  }

  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}

function obtenerFechaActual() {
  const fechaActual = new Date();

  const anio = fechaActual.getFullYear();
  const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaActual.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function seguimientoEstaVencido(fecha: string) {
  if (!fecha) {
    return false;
  }

  return fecha < obtenerFechaActual();
}

function ListaContactos({
  contactos,
  onAgregarInteraccion,
  onEliminar,
  onEditar,
}: ListaContactosProps) {
  if (contactos.length === 0) {
    return (
      <section className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No se encontraron contactos
        </h2>

        <p className="mt-2 text-gray-500">
          Agrega un contacto o cambia los filtros de búsqueda.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-900">
          Contactos
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-900">
          Total mostrado: {contactos.length}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {contactos.map((contacto) => {
          const estaVencido = seguimientoEstaVencido(
            contacto.proximoSeguimiento,
          );

          return (
            <article
              key={contacto.id}
              className={`rounded-xl border-2 p-5 shadow-sm ${
                estaVencido
                  ? "border-red-600 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {estaVencido && (
                <div className="mb-4 rounded-lg bg-red-700 px-3 py-2 font-semibold text-white">
                  Seguimiento vencido
                </div>
              )}

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {contacto.nombreCompleto}
                  </h3>

                  <p className="text-gray-500">
                    {contacto.empresa || "Sin empresa"}
                  </p>
                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-900">
                  {contacto.etiquetas || "Sin etiqueta"}
                </span>
              </div>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Teléfono:</span>{" "}
                  {contacto.telefono}
                </p>

                <p>
                  <span className="font-semibold">Correo:</span>{" "}
                  {contacto.correo}
                </p>

                <p>
                  <span className="font-semibold">
                    Próximo seguimiento:
                  </span>{" "}
                  {mostrarFecha(contacto.proximoSeguimiento)}
                </p>

                <p>
                  <span className="font-semibold">
                    Último contacto:
                  </span>{" "}
                  {mostrarFecha(contacto.fechaUltimoContacto)}
             </p>

             {contacto.notaGeneral && (
               <div className="mt-4 rounded-lg bg-white p-3">
                 <p className="font-semibold">Nota general</p>
                 <p className="mt-1 text-gray-600">
                   {contacto.notaGeneral}
                 </p>
               </div>
             )}
           </div>

           {/* Botones CRUD */}
           <div className="mt-4 flex gap-3">
             <button
               onClick={() => onEditar(contacto.id)}
               className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
             >
               ✏️ Editar
             </button>

             <button
               onClick={() => onEliminar(contacto.id)}
               className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
             >
               🗑️ Eliminar
             </button>
           </div>

           <HistorialInteracciones
             contactoId={contacto.id}
             interacciones={contacto.interacciones ?? []}
             onAgregarInteraccion={onAgregarInteraccion}
           />
         </article>
       );
     })}
   </div>
 </section>
  );
}
export default ListaContactos;