import { User } from "src/app/wewish/types/User";
import { CreatePassword } from "./CreatePassword";
import { UpdatePassword } from "./UpdatePassword";


// ----------------------------------------------------------------------

export const Credentials = ({ user, updatePasswordCode }: { user: User, updatePasswordCode?: string }) => {
    return !user.hasPassword ? <CreatePassword /> : <UpdatePassword updatePasswordCode={updatePasswordCode} user={user} />
}
