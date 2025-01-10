import EntitiesTable from "@/components/entities-table";
import { createClient } from "@/utils/supabase/server";
import { ICompany, IPerson } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

const columnsPerson: ColumnDef<IPerson>[] = [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "age",
    header: "Varsta",
  },
];

const columnsCompany: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "numberOfWorkers",
    header: "Numar de lucratori",
  },
];

export default async function FiltrariPage() {
  const supabase = await createClient();

  const users = await getUsersBetween20And25(supabase);
  const users2 = await getUsersBetween10And20(supabase);

  const firma1 = await getFirmeWithNumberOfWorkers(supabase, 10, 50);
  const firma2 = await getFirmeWithNumberOfWorkers(supabase, 50, 120);

  return (
    <div className="pl-16 pr-16 flex flex-col gap-5">
      <h1 className="font-bold text-2xl">
        Gestionarea tuturor entităților din baza de date a primăriei.
      </h1>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Persoane cu varsta intre 20 si 25 de ani</h3>
        <EntitiesTable columns={columnsPerson} data={users!} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Persoane cu varsta intre 10 si 20 de ani</h3>
        <EntitiesTable columns={columnsPerson} data={users2!} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Firma cu angajati intre 10 si 50</h3>
        <EntitiesTable columns={columnsCompany} data={firma1!} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Firma cu angajati intre 50 si 120</h3>
        <EntitiesTable columns={columnsCompany} data={firma2!} />
      </div>
    </div>
  );
}

async function getFirmeWithNumberOfWorkers(
  supabase: any,
  numberMin: number,
  numberMax: number
) {
  const { data, error } = await supabase
    .from("firme")
    .select("*")
    .gte("numberOfWorkers", numberMin)
    .lte("numberOfWorkers", numberMax);

  if (error) {
    console.error("Error fetching firme:", error);
    return [];
  }

  console.log(data);

  return data;
}

async function getUsersBetween10And20(supabase: any) {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 10,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - 20,
    today.getMonth(),
    today.getDate()
  );

  const { data, error } = await supabase
    .from("persoane")
    .select("*")
    .gte("birthDate", minDate.toISOString())
    .lte("birthDate", maxDate.toISOString());

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  const usersWithAge = data.map((user: any) => ({
    ...user,
    age: calculateAge(user.birthDate),
  }));

  return usersWithAge;
}

async function getUsersBetween20And25(supabase: any) {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 25,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - 20,
    today.getMonth(),
    today.getDate()
  );

  const { data, error } = await supabase
    .from("persoane")
    .select("*")
    .gte("birthDate", minDate.toISOString())
    .lte("birthDate", maxDate.toISOString());

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  const usersWithAge = data.map((user: any) => ({
    ...user,
    age: calculateAge(user.birthDate),
  }));

  return usersWithAge;
}

function calculateAge(birthdate: any) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // Adjust if the birthday hasn't occurred yet this year
  }
  return age;
}
