import { redirect } from "next/navigation";
import { paths } from "src/routes/paths";

export default function AccountPage() {
    return redirect(paths.envy.account.profile);
}