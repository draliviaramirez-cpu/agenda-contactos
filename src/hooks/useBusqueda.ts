import { useState } from "react";
import type { Contacto } from "../types/Contacto";
import type { CampoBusqueda } from "../components/BuscadorContactos";

function hoyISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}

export function useBusqueda(contactos: Contacto[]) {
  const [busqueda, setBusqueda] = useState("");
  const [campoBusqueda, setCampoBusqueda] =
    useState<CampoBusqueda>("todos");
  const [soloPendientes, setSoloPendientes] = useState(false);

  function buscarContactos(texto: string, campo: CampoBusqueda) {
    setBusqueda(texto);
    setCampoBusqueda(campo);
  }

  const textoBuscado = busqueda.toLocaleLowerCase();
  const hoy = hoyISO();

  const contactosFiltrados = contactos
    .filter((c) => {
      const nombre = c.nombreCompleto.toLocaleLowerCase();
      const empresa = c.empresa.toLocaleLowerCase();
      const etiqueta = c.etiquetas.toLocaleLowerCase();

      const coincide =
        campoBusqueda === "nombre"
          ? nombre.includes(textoBuscado)
          : campoBusqueda === "empresa"
            ? empresa.includes(textoBuscado)
            : campoBusqueda === "etiqueta"
              ? etiqueta.includes(textoBuscado)
              : nombre.includes(textoBuscado) ||
                empresa.includes(textoBuscado) ||
                etiqueta.includes(textoBuscado);

      const seguimientoPendiente =
        Boolean(c.proximoSeguimiento) &&
        c.proximoSeguimiento >= hoy;

      return coincide && (!soloPendientes || seguimientoPendiente);
    })
    .sort((a, b) =>
      a.nombreCompleto.localeCompare(b.nombreCompleto, "es"),
    );

  return {
    busqueda,
    campoBusqueda,
    soloPendientes,
    contactosFiltrados,
    buscarContactos,
    setSoloPendientes,
  };
}

