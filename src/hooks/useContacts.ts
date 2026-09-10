import { useLocalStorage } from "./useLocalStorage";
import type { Contacto, Interaccion } from "../types/Contacto";

const CLAVE_LOCAL_STORAGE = "agenda-contactos";

export function useContacts() {
    const [contactos, setContactos] = useLocalStorage<Contacto[]>(CLAVE_LOCAL_STORAGE, []);

    function agregarContacto(nuevo: Contacto) {
        setContactos([...contactos, nuevo]);
    }

    function eliminarContacto(id: string) {
        setContactos(contactos.filter((c) => c.id !== id));
    }

    function actualizarContacto(id: string, datosActualizados: Partial<Contacto>) {
        setContactos(
            contactos.map((c) =>
                c.id === id ? { ...c, ...datosActualizados } : c
            )
        );
    }

    function agregarInteraccion(contactoId: string, interaccion: Interaccion) {
        setContactos(
            contactos.map((c) =>
                c.id === contactoId
                    ? {
                        ...c,
                        fechaUltimoContacto: interaccion.fecha,
                        interacciones: [...(c.interacciones ?? []), interaccion],
                    }
                    : c
            )
        );
    }
    function eliminarInteraccion(contactoId: string, interaccionId: string) {
        setContactos(
            contactos.map((c) =>
                c.id === contactoId
                    ? {
                        ...c,
                        interacciones: c.interacciones.filter((i) => i.id !== interaccionId),
                    }
                    : c
            )
        );
    }

    return {
        contactos,
        agregarContacto,
        eliminarContacto,
        actualizarContacto,
        agregarInteraccion,
        eliminarInteraccion,
    };
}