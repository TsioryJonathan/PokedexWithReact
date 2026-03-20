import React, { useState } from "react";
import ModalBase from "../ui/ModalBase";
import InputField from "./InputField";
import { useToast } from "../ui/ToastContext";

export default function CreatePokemonModal({
  open,
  setOpen,
  newPokemon,
  setNewPokemon,
  onSave,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue = [
      "id",
      "height",
      "weight",
      "hp",
      "attack",
      "defense",
    ].includes(name)
      ? Number(value)
      : value;

    setNewPokemon((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  const { showToast } = useToast();
  const [feedback, setFeedback] = useState({ message: "", success: false });

  const validatePokemon = (pokemon) => {
    const requiredFields = [
      "id",
      "name",
      "type",
      "height",
      "weight",
      "hp",
      "attack",
      "defense",
    ];

    for (let field of requiredFields) {
      const value = pokemon[field];
      if (value === undefined || value === null || value === "") {
        return `Field "${field}" is required.`;
      }
      if (
        ["id", "height", "weight", "hp", "attack", "defense"].includes(field) &&
        value < 0
      ) {
        return `Field "${field}" must be a positive number.`;
      }
    }

    return null;
  };

  const basicFields = [
    { label: "ID", name: "id", type: "number" },
    { label: "Name", name: "name", type: "text" },
    { label: "Type", name: "type", type: "text" },
    { label: "Genus", name: "genus", type: "text" },
    { label: "Description", name: "description", textarea: true },
  ];

  const statsFields = [
    { label: "Height (dm)", name: "height", type: "number" },
    { label: "Weight (hg)", name: "weight", type: "number" },
    { label: "HP", name: "hp", type: "number" },
    { label: "Attack", name: "attack", type: "number" },
    { label: "Defense", name: "defense", type: "number" },
  ];

  return (
    <ModalBase open={open} onClose={() => setOpen(false)} className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create a New Pokémon
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {basicFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={newPokemon[field.name] || ""}
              onChange={handleChange}
              textarea={field.textarea}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statsFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={newPokemon[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={() => {
            const error = validatePokemon(newPokemon);
            if (error) {
              setFeedback({ message: error, success: false });
              showToast({ message: "Error: " + error, type: "error" });
              return;
            }

            onSave(newPokemon);
            setFeedback({
              message: "Pokémon successfully added!",
              success: true,
            });
            showToast({
              message: "Pokémon successfully added!",
              type: "success",
            });
            setOpen(false);
          }}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Create
        </button>
      </div>
    </ModalBase>
  );
}
