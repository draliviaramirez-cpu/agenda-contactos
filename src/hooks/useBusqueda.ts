import { useState } from "react";
import type { Contacto } from "../types/Contacto";
import type { CampoBusqueda } from "../components/BuscadorContactos";

export function useBusqueda(contactos: Contacto[]) {
    const [busqueda, setBusqueda] = useState("");
    const [campoBusqueda, setCampoBusqueda] = useState<CampoBusqueda>("todos");
    const [soloPendientes, setSoloPendientes] = useState(false);

    function buscarContactos(texto: string, campo: CampoBusqueda) {
        setBusqueda(texto);
        setCampoBusqueda(campo);
    }

    const textoBuscado = busqueda.toLowerCase();
    const contactosFiltrados = contactos.filter((c) => {
        const nombre = c.nombreCompleto.toLowerCase();
        const empresa = c.empresa.toLowerCase();
        const etiqueta = c.etiquetas.toLowerCase();

        let coincide = false;
        if (campoBusqueda === "nombre") coincide = nombre.includes(textoBuscado);
        else if (campoBusqueda === "empresa") coincide = empresa.includes(textoBuscado);
        else if (campoBusqueda === "etiqueta") coincide = etiqueta.includes(textoBuscado);
        else coincide = nombre.includes(textoBuscado) || empresa.includes(textoBuscado) || etiqueta.includes(textoBuscado);

        const tieneSeguimiento = c.proximoSeguimiento !== "";
        return coincide && (!soloPendientes || tieneSeguimiento);
    });

    return {
        busqueda,
        campoBusqueda,
        soloPendientes,
        contactosFiltrados,
        buscarContactos,
        setSoloPendientes,
    };
}

