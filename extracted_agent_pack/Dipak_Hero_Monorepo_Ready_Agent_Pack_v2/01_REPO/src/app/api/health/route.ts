export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "dipak-web",
      surface: "public-hero",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
