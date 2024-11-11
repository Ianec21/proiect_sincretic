import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Autentificare</h1>
      <p className="text-sm text-foreground">
        Nu aveți un cont?{" "}
        <Link className="text-foreground font-medium underline" href="#">
          Contactați-ne
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Adresa electronică</Label>
        <Input name="email" placeholder="tu@exemplu.ro" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Parolă</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Ați uitat parola?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton
          pendingText="Vă autentificăm..."
          formAction={signInAction}
        >
          Autentificare
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
