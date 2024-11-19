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
import { addEntityAction, addUserAction } from "@/app/actions";

export default function AddUser({ entities }: { entities: any[] }) {
  const [data, setData] = useState({
    type: 0, // 0 - person, 1 - company
    email: entities ? entities[0].email : "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adăugați un utilizator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adăugare utilizator</DialogTitle>
          <DialogDescription>
            Îndepliniți câmpurile de mai jos pentru a crea un nou utilizator.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={() => addUserAction(data)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Entitate</Label>
              <Select
                value={data.email}
                name="entity"
                onValueChange={(value: string) => {
                  setData((prev: any) => {
                    return {
                      ...prev,
                      email: value,
                    };
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selectați persoana" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Entitati</SelectLabel>
                    {entities.map((entity: any, index: number) => (
                      <SelectItem
                        key={`entity_${index}`}
                        value={entity.email!.toString()}
                      >
                        {entity.email}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Parola</Label>
            <Input
              type="password"
              placeholder="Introduceți parola.."
              onChange={(event) => {
                setData((prev) => {
                  return {
                    ...prev,
                    password: event.target.value,
                  };
                });
              }}
            />
          </div>

          <Button type="submit">Adăugați</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
