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
import { addEntityAction } from "@/app/actions";

export default function AddEntity() {
  const [data, setData] = useState({
    type: 0, // 0 - person, 1 - company
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adăugați o entitate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adăugare entitate</DialogTitle>
          <DialogDescription>
            Îndepliniți câmpurile de mai jos pentru a crea o entitate nouă.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={() => addEntityAction(data)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="type" className="text-left">
              Tipul entității
            </Label>
            <Select
              name="type"
              onValueChange={(value: string) => {
                setData((prev) => {
                  return {
                    ...prev,
                    type: Number(value),
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
                <Label>Nume</Label>
                <Input
                  type="text"
                  placeholder="Introduceți numele.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        name: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>CNP</Label>
                <Input
                  type="text"
                  placeholder="Introduceți CNP-ul.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        CNP: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Data nașterii</Label>
                <Input
                  type="date"
                  placeholder="Data nașterii"
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        birthDate: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Adresă</Label>
                <Input
                  type="text"
                  placeholder="Introduceți adresa.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        address: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Număr de telefon</Label>
                <Input
                  type="text"
                  placeholder="Introduceți numărul de telefon.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>E-Mail</Label>
                <Input
                  type="email"
                  placeholder="Introduceți adresa electronică.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        email: event.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          )}

          {data.type === 1 && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Nume</Label>
                <Input
                  type="text"
                  placeholder="Introduceți numele.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        name: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>CUI</Label>
                <Input
                  type="text"
                  placeholder="Introduceți CUI-ul.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        CUI: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Numărul de lucrători</Label>
                <Input
                  type="text"
                  placeholder="Introduceți numărul de lucrători.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        numberOfWorkers: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Adresă</Label>
                <Input
                  type="text"
                  placeholder="Introduceți adresa.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        address: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Număr de telefon</Label>
                <Input
                  type="text"
                  placeholder="Introduceți numărul de telefon.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: event.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>E-Mail</Label>
                <Input
                  type="email"
                  placeholder="Introduceți adresa electronică.."
                  onChange={(event) => {
                    setData((prev) => {
                      return {
                        ...prev,
                        email: event.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          )}

          <Button type="submit">Adăugați</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
