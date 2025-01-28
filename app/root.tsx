import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "./tailwind.css"; // Use the correct path for Tailwind CSS
import Footer from "./components/Footer";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import Header from "./components/Header";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/tailwind.css" }, // Link Tailwind CSS
];

export default function App() {
   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isChatInputDisabled, setIsChatInputDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    const toggleSidebar = (): void => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const models = ["eos", "titan"];
    const [selectedModel, setSelectedModel] = useState("eos");

    const handleModelSelect = (model: string) => {
      setSelectedModel(model);
      console.log("Selected Model:", model); // You can handle further actions here
    };
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <main className="min-h-screen">
        {/* <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

          <Outlet />
          <Footer/>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
