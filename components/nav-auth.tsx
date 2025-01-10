import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function NavigationAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-row gap-5 font-light">
      <Link className="hover:border-b-2" href="/entitati">
        Entități
      </Link>
      <Link className="hover:border-b-2" href="/impozite-subventii">
        Impozite și Subvenții
      </Link>
      <Link className="hover:border-b-2" href="/utilizatori">
        Utilizatori
      </Link>
    </div>
  ) : (
    <></>
  );
}
