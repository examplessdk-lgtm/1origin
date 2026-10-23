"use client";

import { useId, useState, type FormEvent } from "react";
import { members as seed, roles, type Member, type Role } from "@/lib/sample";
import { ghostClass, primaryClass } from "@/components/ui";

export function TeamScreen() {
  const [people, setPeople] = useState<Member[]>(seed);
  const [added, setAdded] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("Member");
  const [error, setError] = useState("");
  const nameId = useId();
  const roleId = useId();

  function addMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim().toLowerCase().replace(/\s+/g, ".");
    if (!trimmed) {
      setError("Enter a sample name.");
      return;
    }
    if (people.some((person) => person.name === trimmed)) {
      setError("That sample name is already on the team.");
      return;
    }
    const id = `local-${trimmed}`;
    setPeople((current) => [
      ...current,
      { id, name: trimmed, email: `${trimmed}@sample.invalid`, role },
    ]);
    setAdded((current) => [...current, id]);
    setName("");
    setError("");
  }

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto">
      <header className="border-b border-line px-3 py-3 sm:px-4">
        <h1 className="text-[15px] font-medium">Team</h1>
        <p className="mt-1 max-w-[68ch] text-[13px] leading-5 text-muted">
          Sample team. Changes stay in this browser and are not invitations.
        </p>
      </header>
      <ul className="border-b border-line">
        {roles.map((item) => (
          <li key={item.name} className="grid gap-1 border-b border-line px-3 py-2 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:px-4">
            <span className="font-mono text-[12px]">{item.name}</span>
            <span className="text-[13px] text-muted">{item.detail}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={addMember} className="flex flex-wrap items-end gap-2 border-b border-line px-3 py-3 sm:px-4">
        <div className="min-w-[10rem] flex-1">
          <label htmlFor={nameId} className="mb-1 block font-mono text-[11px] text-muted">
            Sample name
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-8 w-full border border-line bg-ground px-2 text-[13px]"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor={roleId} className="mb-1 block font-mono text-[11px] text-muted">
            Role
          </label>
          <select
            id={roleId}
            value={role}
            onChange={(event) => setRole(event.target.value as Role)}
            className="h-8 border border-line bg-ground px-2 text-[13px]"
          >
            {roles.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={primaryClass()}>
          Add sample member
        </button>
        <button
          type="button"
          className={ghostClass()}
          onClick={() => {
            setPeople(seed);
            setAdded([]);
            setError("");
          }}
        >
          Restore sample team
        </button>
        {error ? (
          <p role="alert" className="w-full text-[13px] text-fail">
            {error}
          </p>
        ) : null}
      </form>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Sample team</caption>
        <thead className="font-mono text-[11px] text-muted">
          <tr className="border-b border-line">
            <th scope="col" className="px-3 py-2 font-normal sm:px-4">Name</th>
            <th scope="col" className="px-3 py-2 font-normal sm:px-4">Mail</th>
            <th scope="col" className="px-3 py-2 font-normal sm:px-4">Role</th>
            <th scope="col" className="px-3 py-2 font-normal sm:px-4">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} className="border-b border-line">
              <th scope="row" className="px-3 py-2 font-mono text-[12px] font-normal sm:px-4">
                {person.name}
              </th>
              <td className="px-3 py-2 font-mono text-[12px] text-muted sm:px-4">{person.email}</td>
              <td className="px-3 py-2 sm:px-4">
                <label className="sr-only" htmlFor={`role-${person.id}`}>
                  Role for {person.name}
                </label>
                <select
                  id={`role-${person.id}`}
                  value={person.role}
                  className="h-8 border border-line bg-ground px-2 text-[13px]"
                  onChange={(event) => {
                    const next = event.target.value as Role;
                    setPeople((current) =>
                      current.map((item) => (item.id === person.id ? { ...item, role: next } : item)),
                    );
                  }}
                >
                  {roles.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2 sm:px-4">
                {added.includes(person.id) ? (
                  <button
                    type="button"
                    className={ghostClass()}
                    onClick={() => {
                      setPeople((current) => current.filter((item) => item.id !== person.id));
                      setAdded((current) => current.filter((id) => id !== person.id));
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <span className="font-mono text-[11px] text-muted">fixture</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
