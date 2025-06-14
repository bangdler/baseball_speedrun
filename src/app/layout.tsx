import React from "react";
import LayoutRecoil from "./layout.recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "../provider/QueryProvider";

export const metadata = {
  title: "myfair front pre-course",
  description: "todolist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <LayoutRecoil>{children}</LayoutRecoil>
        </QueryProvider>
      </body>
    </html>
  );
}
