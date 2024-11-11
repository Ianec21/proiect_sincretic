"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addEntityAction, addImpozitAction } from "@/app/actions";
import { ICompany, IPerson } from "@/utils/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export default function AddImpozitRecord({
  personsData,
  companiesData,
}: {
  personsData: IPerson[];
  companiesData: ICompany[];
}) {
  const [data, setData] = useState({
    type: 0, // 0 - person, 1 - company
    selectedEntityID:
      personsData && personsData[0] ? personsData[0].id?.toString() : 0,
    taxType: 0,
    status: 0,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adăugare impozit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adăugare impozit</DialogTitle>
          <DialogDescription>
            Îndepliniți câmpurile de mai jos pentru a adăuga un impozit.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={() => addImpozitAction(data)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" className="text-left">
              Tipul entității
            </Label>
            <Select
              defaultValue="0"
              name="type"
              onValueChange={(value: string) => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    type: Number(value),
                    selectedEntityID: 0,
                  };
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectați tipul" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipuri</SelectLabel>
                  <SelectItem value="0">Persoană</SelectItem>
                  <SelectItem value="1">Firmă</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {data.type === 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Persoana</Label>
                <Select
                  value={data.selectedEntityID!.toString()}
                  name="type"
                  onValueChange={(value: string) => {
                    setData((prev: any) => {
                      return {
                        ...prev,
                        selectedEntityID: Number(value),
                      };
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectați persoana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipuri</SelectLabel>
                      {personsData.map((person: IPerson, index: number) => (
                        <SelectItem
                          key={`person_${index}`}
                          value={person.id!.toString()}
                        >
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {data.type === 1 && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Firma</Label>
                <Select
                  defaultValue="0"
                  value={data.selectedEntityID!.toString()}
                  name="type"
                  onValueChange={(value: string) => {
                    setData((prev: any) => {
                      return {
                        ...prev,
                        selectedEntityID: Number(value),
                      };
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectați firma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipuri</SelectLabel>
                      {companiesData.map((company: ICompany, index: number) => (
                        <SelectItem
                          key={`person_${index}`}
                          value={company.id!.toString()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label>Tipul impozitului</Label>
            <Select
              defaultValue="0"
              value={data.taxType.toString()}
              name="type"
              onValueChange={(value: string) => {
                setData((prev) => {
                  return {
                    ...prev,
                    taxType: Number(value),
                  };
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectați tipul" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipuri</SelectLabel>
                  <SelectItem value="0">Proprietate</SelectItem>
                  <SelectItem value="1">Venit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Suma Impozitului</Label>
              <Input
                type="text"
                placeholder="Introduceți suma.."
                onChange={(event) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      amount: event.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Data Plății</Label>
              <Input
                type="date"
                placeholder="Introduceți data.."
                onChange={(event) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      payDate: event.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="type" className="text-left">
                Metoda de plată
              </Label>

              <RadioGroup
                onValueChange={(value) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      paymentMethod: Number(value),
                    };
                  });
                }}
                defaultValue="0"
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="r1" />
                  <Label htmlFor="r1">Cash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r2" />
                  <Label htmlFor="r2">Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r3" />
                  <Label htmlFor="r3">Transfer Bancar</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="type" className="text-left">
                Stare Plată
              </Label>

              <RadioGroup
                onValueChange={(value) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      status: Number(value),
                    };
                  });
                }}
                defaultValue="0"
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="r1" />
                  <Label htmlFor="r1">Plătit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r2" />
                  <Label htmlFor="r2">Neplătit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r3" />
                  <Label htmlFor="r3">Plată parțială</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button type="submit">Adăugați</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
