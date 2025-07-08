"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Empresa } from "@/app/types/empresa";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [selected, setSelected] = useState<Empresa | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetch("/api/empresas")
      .then((res) => res.json())
      .then(setEmpresas);
  }, []);

  const handleSave = async () => {
    if (!selected) return;
    const method = isCreating ? "POST" : "PUT";
    const url = isCreating ? "/api/empresas" : `/api/empresas/${selected.id}`;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });
    setSelected(null);
    setIsCreating(false);
    setEmpresas(await (await fetch("/api/empresas")).json());
  };

  const openCreateModal = () => {
    setSelected({
      id: 0,
      razaoSocial: "",
      cnpj: "",
      cep: "",
      cidade: "",
      estado: "",
      bairro: "",
      complemento: "",
    });
    setIsCreating(true);
  };

  return (
    <div>
      <PageHeader title="Empresas" path="Dashboard / Empresas">
        <button
          onClick={openCreateModal}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg shadow hover:bg-[var(--primary-dark)] transition"
        >
          + Nova Empresa
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {empresas.map((e) => (
          <div
            key={e.id}
            onClick={() => {
              setSelected(e);
              setIsCreating(false);
            }}
            className="bg-white border border-[var(--border-green)] rounded-2xl shadow hover:shadow-lg p-6 cursor-pointer transition"
          >
            <p className="font-semibold mb-2 text-[var(--primary)]">
              {e.razaoSocial}
            </p>
            <hr />
            <p className="text-sm text-gray-600 mb-1 mt-4">{e.cnpj}</p>
            <p className="text-sm text-gray-600">
              {e.cidade}/{e.estado}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => {
                setSelected(null);
                setIsCreating(false);
              }}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-6 text-[var(--primary)]">
              {isCreating ? "Nova Empresa" : "Editar Empresa"}
            </h2>
            <div className="space-y-4">
              {[
                "razaoSocial",
                "cnpj",
                "cep",
                "cidade",
                "estado",
                "bairro",
                "complemento",
              ].map((campo) => (
                <input
                  key={campo}
                  placeholder={campo}
                  value={(selected as any)[campo] ?? ""}
                  onChange={(e) =>
                    setSelected({ ...selected, [campo]: e.target.value })
                  }
                  className="w-full border border-[var(--border-green)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-6 bg-[var(--primary)] text-white px-6 py-3 rounded-full hover:bg-[var(--primary-dark)] transition"
            >
              {isCreating ? "Cadastrar" : "Salvar Alterações"}
            </button>
            {!isCreating && (
              <button
                onClick={async () => {
                  if (!selected?.id) return;
                  const confirm = window.confirm(
                    "Tem certeza que deseja excluir esta empresa?"
                  );
                  if (!confirm) return;

                  await fetch(`/api/empresas/${selected.id}`, {
                    method: "DELETE",
                  });
                  const res = await fetch("/api/empresas");
                  setEmpresas(await res.json());
                  setSelected(null);
                }}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Excluir Empresa
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
