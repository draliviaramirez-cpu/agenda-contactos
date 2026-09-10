import { useState, useEffect } from "react";

export function useLocalStorage<T>(clave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const item = localStorage.getItem(clave);
      return item ? (JSON.parse(item) as T) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      console.error("Error guardando en LocalStorage");
    }
  }, [clave, valor]);

  return [valor, setValor] as const;
}