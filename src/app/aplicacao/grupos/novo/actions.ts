'use server'


import { createClient } from "../../../../../utils/supabase/server";

export type CreateGroupState = {
  success: boolean | null;
  message: string;
};

export async function createGroup(
  _previousState: CreateGroupState,  
  formData: FormData
) {
  const supabase = await createClient();
  const { data: authUser, error: authUserError } =
    await supabase.auth.getUser();
  if (authUserError) {
    return {
      success: false,
      message: "Ocorreu um erro",
    };
  }

  const names = formData.getAll("name");
  const emails = formData.getAll("email");
  const groupName = formData.get("group-name");

  //salvar group 
  const { data: newGroup, error } = await supabase.from('groups').insert({
    name: groupName,
    owner_id: authUser?.user.id
  })
  .select()
  .single();

  if (error) {
    return {
      success: false,
      message: "Ocorreu um erro ao tentar criar o grupo.",
    };
  }

  const participants = names.map((name, index)=>({
    group_id: newGroup.id,
    name,
    email: emails[index]
  }))

  const { data: createdParticipants, error: participantsError } = await supabase.from( 'participants').insert(participants).select();
   if (participantsError) {
    return {
      success: false,
      message: "Ocorreu um erro ao adicionar os participantes ao grupo.",
    };
  }

  const drawnParticipants = drawnGroup(createdParticipants)
   const {error: drawnParticipantsError} = await supabase.from('participants').upsert(drawnParticipants)
   if (drawnParticipantsError) {
    return {
      success: false,
      message: "Ocorreu um erro ao sortear os participantes d o grupo.",
    };
  }

  // return {
  //   success: true,
  //   message: "Grupo criado com sucesso.",
  //   group: newGroup
  // };
  // redirect(`aplicacao/grupos/${newGroup.id}`)  
}


type Participant = {
  id: string;
  name: string; 
  email: string;
  group_id: string;
  assigned_to: string | null;
}

function drawnGroup(participants: Participant[]){
  const selectedParticipants: string[] = []

  return participants.map((participant) =>{
    const avaliableParticipants = participants.filter((p) => p.id !== participant.id && !selectedParticipants.includes(p.id))

    const assignedParticipant = avaliableParticipants[Math.floor(Math.random() * avaliableParticipants.length)]

    selectedParticipants.push(assignedParticipant.id)

    return{
      ...participant,
      assigned_to: assignedParticipant.id,
    }
  })
}
