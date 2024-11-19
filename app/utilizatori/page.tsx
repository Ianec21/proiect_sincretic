"use client";

import AddEntity from "@/components/add-entity";
import AddUser from "@/components/add-user";
import EntitiesTable from "@/components/entities-table";
import PaymentStatusIndicator from "@/components/payment-indicator";
import RegisteredIndicator from "@/components/registered-indicator";
import { createClient } from "@/utils/supabase/client";
import { ICompany, IPerson } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

export const columnsPerson: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "phoneNumber",
    header: "Număr de telefon",
  },
  {
    accessorKey: "address",
    header: "Adresă",
  },
  {
    accessorKey: "registered",
    header: "Inregistrat",
    cell: ({ row }) => <RegisteredIndicator status={row.original.registered} />,
  },
];

export default function Utilizatori() {
  const supabase = createClient();
  const [entitati, setEntitati] = useState<any>();
  const [entitatiNotRegistered, setEntitatiNotRegistered] = useState<any>();

  const getData = useCallback(async () => {
    try {
      const { data: entitatiTable } = await supabase.from("entitati").select();
      setEntitati(entitatiTable);

      const { data: entitatiTableNotRegistered } = await supabase
        .from("entitati")
        .select()
        .eq("registered", false);
      setEntitatiNotRegistered(entitatiTableNotRegistered);
    } catch (error) {
      console.error("Error ar retrieving data: ", error);
      throw error;
    }
  }, [supabase]);

  useEffect(() => {
    getData();
  }, [supabase]);

  if (entitati && entitatiNotRegistered) {
    return (
      <div className="pl-16 pr-16 flex flex-col gap-2">
        <h1 className="font-bold text-2xl">
          Gestionarea tuturor conturilor din baza de date a primăriei.
        </h1>

        <div>
          <AddUser entities={entitatiNotRegistered!} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Toate entitatile</h3>
          <EntitiesTable columns={columnsPerson} data={entitati!} />
        </div>
      </div>
    );
  } else return <></>;
}
