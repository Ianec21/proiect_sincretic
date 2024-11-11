export default function Hero() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-2xl text-center flex flex-col">
        Bine ați venit pe panoul de control al{" "}
        <span className="font-bold text-center">Primăriei Geamăna</span>
      </h1>

      <p className="text-center w-1/2 font-light opacity-80">
        Aici puteți administra datele persoanelor și firmelor, precum și
        informațiile despre impozite și subvenții.
      </p>
    </div>
  );
}
