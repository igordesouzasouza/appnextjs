import { redirect } from 'next/navigation'



export default async function PrivatePage() {
  redirect('/aplicacao/grupos') 
}