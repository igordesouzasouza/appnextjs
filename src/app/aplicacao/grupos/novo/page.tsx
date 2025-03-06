import { createClient } from "../../../../../utils/supabase/cliente"
import NewGroupForm from "../../../../components/new-group-form"

export default async function NewGroup() {
    const supabase = await createClient()
    const {data} =  await supabase.auth.getUser()

    const loggedUser = {
        id: data?.user?.id as string,
        email: data?.user?.email as string,
    }
return(
    <div className="mt-40">
        <NewGroupForm loggedUser={loggedUser} />
    </div>
)
}