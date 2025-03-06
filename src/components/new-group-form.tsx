'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';



interface ParticipantProps{
    name: string;
    email: string;
}

export default function NewGroupForm ({loggedUser,} : {loggedUser: {id: string, email: string}}) {

    const [participants, setParticipants] = useState<ParticipantProps[]>([{
        name: "",
        email: loggedUser.email,
    }])

    const [groupName, setGroupName] = useState("")
    function updateParticipant(index: number, field: keyof Participant, value: string){
        const updatedParticipants = [...participants];
        updatedParticipants[index][field] = value;
        setParticipants(updatedParticipants);
    }
  return (
      <Card className='w-full max-w-2xl mx-auto text-center'>
        <CardHeader>
            <CardTitle>
                Novo Grupo
            </CardTitle>
            <CardDescription>
                Convide seus amigos!
            </CardDescription>
        </CardHeader>
        <form action={() =>{}}>
            <CardContent className='space-y-4'>
                <div className='space-y-2'>
                <Label htmlFor='group-name'>Nome do Grupo</Label>
                <Input 
                id='group-name'
                name='group-name'
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                placeholder='Nome do Grupo'
                />
                </div>
                <h2 className='!mt-12'>Participantes</h2>
                {participants.map((participant, index) => (
                    <div key={index} className='flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4'>
                        <div className='w-full flex-grow space-y-2'>
                            <Label htmlFor={`name-${index}`}>Nome</Label>
                            <Input id={`name-${index}`} name='name' value={participant.name} onChange={(e) =>{
                                updateParticipant(index, 'name', e.target.value)
                            }}/>
                        </div>
                    </div>))}
            </CardContent>
        </form>
      </Card>
  )
}
