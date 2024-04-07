import { useEffect } from "react";
import Server from "./server";
import { TRPCClientError } from "@trpc/client";

async function main() {
  try {
    const res = await Server.log.query("as");
    console.log(res);
  } catch (error: any) {
    if (error instanceof TRPCClientError) {
      console.log(error.meta);
    }
  }
}

export default function App() {
  useEffect(() => {
    main();
  }, []);
  return "app";
}
