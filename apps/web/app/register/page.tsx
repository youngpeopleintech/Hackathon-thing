export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0b1220] px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-2 text-3xl font-semibold text-white">Hackathon Registration</h1>
        <p className="mb-6 text-sm text-slate-300">Complete your registration below.</p>

        <iframe
          src="https://luma.com/embed/event/evt-kmDH86RFCuVxRCv/simple"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: "1px solid #bfcbda88", borderRadius: "4px", width: "100%", minHeight: "70vh" }}
          allow="fullscreen; payment"
          aria-hidden="false"
          tabIndex={0}
          title="Hackathon registration"
        />
      </div>
    </main>
  );
}
