import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../../server/src";

const Server = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3001/trpc",
      headers: {
        authorization: "Bearer token-goes-here",
      },
    }),
  ],
});

export default Server;
