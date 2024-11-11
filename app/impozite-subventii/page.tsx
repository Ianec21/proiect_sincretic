"use client";

import AddEntity from "@/components/add-entity";
import AddImpozitRecord from "@/components/add-impozit";
import EntitiesTable from "@/components/entities-table";
import PaymentStatusIndicator from "@/components/payment-indicator";
import { createClient } from "@/utils/supabase/client";
import { ICompany, IPerson } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";

export const columnsTaxes: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "cnpcui",
    header: "CNP | CUI",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "phoneNumber",
    header: "Număr de telefon",
  },
  {
    accessorKey: "amount",
    header: "Sumă",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <PaymentStatusIndicator status={Number(row.original.status)} />
    ),
  },
];

export default function ImpoziteSubventii() {
  const supabase = createClient();

  const [persons, setPersons] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);

  const getData = useCallback(async () => {
    try {
      const { data: personsData } = await supabase.from("persoane").select();
      console.log(personsData);
      setPersons(personsData!);

      const { data: companiesData } = await supabase.from("firme").select();
      console.log(companiesData);
      setCompanies(companiesData!);

      const { data: taxesData, error } = await supabase
        .from("entitati")
        .select(
          `
            id,
            type,
            phoneNumber,
            email,
            impozite ( * ),
            persoane!left ( * ),
            firme!left ( * )
          `
        )
        .not("impozite", "is", null);

      const formattedTaxes = taxesData!.flatMap((entry: any) =>
        entry.impozite.map((impozit: any) => ({
          id: entry.id,
          name: entry.type === 0 ? entry.persoane?.name : entry.firme?.name,
          email: entry.email,
          phoneNumber: entry.phoneNumber,
          amount: impozit.amount || 0,
          cnpcui: entry.type === 0 ? entry.persoane?.cnp : entry.firme?.cui,
          status: impozit.status || 0,
        }))
      );

      setTaxes(formattedTaxes);
      console.log(formattedTaxes);
    } catch (error) {
      console.error("Error ar retrieving data: ", error);
      throw error;
    }
  }, [supabase]);

  useEffect(() => {
    getData();

    console.log(taxes);
  }, [supabase]);

  return persons && companies && taxes ? (
    <div className="pl-16 pr-16 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        Gestiunea financiară a primăriei, incluzând impozite și subvenții.
      </h1>

      <div>
        <AddImpozitRecord personsData={persons!} companiesData={companies!} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Impozite</h3>
        <EntitiesTable columns={columnsTaxes} data={taxes!} />
      </div>
    </div>
  ) : (
    <></>
  );
}
