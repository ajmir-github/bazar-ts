import { useEffect } from "react";
import Server from "./server";
import { TRPCClientError } from "@trpc/client";

async function main() {
  try {
    const res = await Server.auth.signIn.query({
      email: "asda",
      password: "asda",
    });
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
