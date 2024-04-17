// http://localhost:3001/?audioUrl=https://vyzfg1hdiv0uevlh.public.blob.vercel-storage.com/1MXMOVF-dqGavlr9FKG31NHHeUwerO0G3uRKHY.mpeg

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

console.log("Starting server on port 3001");

const headers = {
  base: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  },
};

Bun.serve({
  hostname: "::",
  port: process.env.PORT || 3001,
  fetch: async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const audioUrl = searchParams.get("audioUrl");

      if (!audioUrl) {
        return new Response("Missing audioUrl", { status: 400 });
      }

      // Run replication: demucs model
      console.log("Starting extraction...");

      const output = await replicate.run(
        "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
        {
          input: {
            audio: audioUrl,
          },
        }
      );

      console.log(output);

      return new Response(JSON.stringify(output), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...headers.base,
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: (error as { message: string }).message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
});
