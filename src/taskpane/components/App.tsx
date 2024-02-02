import React from "react";
import AlternativeSuggestions from "./AlternativeSuggstions";
import ValidateResultsButtons from "./ValidateResults";
import SearchPanel from "./SearchPanel";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface AppProps {
  title: string;
}
const queryClient = new QueryClient();

const App = ({ title }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-2 py-5 divid-y-gray bg-gray-50/50 h-full">
        <div className="flex items-end relative border-b border-gray-200 pb-4">
          <img src="assets/icon-128.png" alt="Logo" className="block h-6 relative -top-0.5" />
          <h2 className="mx-2 font-semibold text-2xl text-[#232D5B] leading-none">{title}</h2>
        </div>
        <main className="mt-8 px-2 flex flex-col gap-y-8">
          <ValidateResultsButtons />
          <AlternativeSuggestions />
          <SearchPanel />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;
