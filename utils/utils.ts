import { redirect } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ICompany, IPerson } from "./types";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export const columnsPerson: ColumnDef<IPerson>[] = [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "CNP",
    header: "CNP",
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
    accessorKey: "address",
    header: "Adresă",
  },
];

export const columnsCompany: ColumnDef<ICompany>[] = [
  {
    accessorKey: "name",
    header: "Nume",
  },
  {
    accessorKey: "CUI",
    header: "CUI",
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
    accessorKey: "address",
    header: "Adresă",
  },
  {
    accessorKey: "numberOfWorkers",
    header: "Număr de lucrători",
  },
];
