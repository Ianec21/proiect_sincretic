import AddEntity from "@/components/add-entity";
import EntitiesTable from "@/components/entities-table";
import { createClient } from "@/utils/supabase/server";
import { columnsCompany, columnsPerson } from "@/utils/utils";

export default async function EntitatiPage() {
  const supabase = await createClient();

  const { data: persons } = await supabase.from("persoane").select(`
      *,
      entitati (
        address,
        type,
        phoneNumber,
        email
      )
    `);

  const { data: companies } = await supabase.from("firme").select(`
      *,
      entitati (
        address,
        type,
        phoneNumber,
        email
      )
    `);

  // join in supabase imi dadea un obiect cu un key entitate si nu as vrea, asa ca am pus totul intr-un obiect.
  const destructuredPersons = persons!.map((person) => ({
    id: person.id,
    CNP: person.cnp,
    name: person.name,
    birthDate: person.birthDate,
    address: person.entitati?.address,
    type: person.entitati?.type,
    phoneNumber: person.entitati?.phoneNumber,
    email: person.entitati?.email,
  }));

  // join in supabase imi dadea un obiect cu un key entitate si nu as vrea, asa ca am pus totul intr-un obiect.
  const destructuredCompanies = companies!.map((company) => ({
    id: company.id,
    CUI: company.cui,
    name: company.name,
    numberOfWorkers: company.numberOfWorkers,
    address: company.entitati?.address,
    type: company.entitati?.type,
    phoneNumber: company.entitati?.phoneNumber,
    email: company.entitati?.email,
  }));

  return (
    <div className="pl-16 pr-16 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        Gestionarea tuturor entităților din baza de date a primăriei.
      </h1>

      <div>
        <AddEntity />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Persoane</h3>
        <EntitiesTable columns={columnsPerson} data={destructuredPersons!} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Firme</h3>
        <EntitiesTable columns={columnsCompany} data={destructuredCompanies!} />
      </div>
    </div>
  );
}
