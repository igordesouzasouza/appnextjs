"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader, Mail, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {createGroup, CreateGroupState} from '../../././src/app/aplicacao/grupos/novo/actions'
import { useSonner } from "sonner";

type Participant = {
  name: string;
  email: string;
  // Add other fields as necessary
};

interface ParticipantProps {
  name: string;
  email: string;
}

export default function NewGroupForm({
  loggedUser,
}: {
  loggedUser: { id: string; email: string };
}) {
    const { toasts } = useSonner();
  const [participants, setParticipants] = useState<ParticipantProps[]>([
    {
      name: "",
      email: loggedUser.email,
    },
  ]);

  const [state, formAction, pending] = useActionState<CreateGroupState, FormData>(createGroup, {
    success: false,
    message: ""
  });

  const [groupName, setGroupName] = useState("");
  function updateParticipant(
    index: number,
    field: keyof Participant,
    value: string
  ) {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  }

  function removeParticipant(index: number) {
    setParticipants(participants.filter((_, i) => i !== index));
  }
  function addParticipant(){
    setParticipants(participants.concat({name: '', email: ''}))
  }
  useEffect(() =>{
    if(state.success === false){
        toasts({
            variant: 'error',
            description: state.message
        }, [state])
    }
  })
  return (
    <Card className="w-full max-w-2xl mx-auto text-center">
      <CardHeader>
        <CardTitle>Novo Grupo</CardTitle>
        <CardDescription>Convide seus amigos!</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Nome do Grupo</Label>
            <Input
              id="group-name"
              name="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              placeholder="Nome do Grupo"
            />
          </div>
          <h2 className="!mt-12">Participantes</h2>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"
            >
              <div className="w-full flex-grow space-y-2">
                <Label htmlFor={`name-${index}`}>Nome</Label>
                <Input
                  id={`name-${index}`}
                  name="name"
                  value={participant.name}
                  onChange={(e) => {
                    updateParticipant(index, "name", e.target.value);
                  }}
                  placeholder="Digite o Nome"
                  required
                />
              </div>
              <div className="w-full flex-grow space-y-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  name="email"
                  value={participant.email}
                  onChange={(e) => {
                    updateParticipant(index, "email", e.target.value);
                  }}
                  placeholder="Digite o Email"
                  className="readonly:text-foreground"
                  readOnly={participant.email === loggedUser.email}
                  required
                />
              </div>
              <div className="min-w-9">
                {participants.length > 1 &&
                  participant.email !== loggedUser.email && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeParticipant(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <Button
            type="button"
            variant="outline"
            onClick={addParticipant}
            className="w-full md:w-auto"
          >
            Adicionar amigo
          </Button>
          <Button
            type="submit"
            className="flex items-center space-x-2 w-full md:w-auto"
          >
            <Mail className="w-3 h-3" /> Criar grupos e enviar e-mails!
            {pending && <Loader className="w-4 h-4 animate-spin" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
