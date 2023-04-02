import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <>
      <main></main>
    </>
  );
}
