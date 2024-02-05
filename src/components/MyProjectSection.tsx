import { cn, supabase } from "@/lib/utils";
import { useEffect, useState } from "react";
import { type Tables } from "@/types/supabase";

const tabs = [{ title: "All" }, { title: "Web" }, { title: "Mobile" }];

export default function MyProjectSection() {
  const [tab, setTab] = useState<number>(0);
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);

  useEffect(() => {
    fetchProjects().catch(console.error);
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setProjects(data);
  };

  return (
    <section role="my_projects" className="grid place-items-center">
      <div className="py-6">
        <h3 className="text-[24px] font-bold">My Projects</h3>
      </div>
      <div className=" grid grid-cols-3 gap-4 w-60 h-6 mb-8">
        {tabs.map(({ title }, index) => {
          return (
            <button
              key={title}
              className={cn(
                "text-xs border dark:text-gray-800  text-gray-300  dark:border-gray-800 border-gray-300 w-full h-full rounded-md",
                tab === index &&
                  "dark:text-gray-300 text-gray-800 dark:border-gray-300 border-gray-800 ",
              )}
              onClick={() => setTab(index)}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {projects.map(({ type, title }, index) => {
          if (tabs[tab].title !== "All" && type !== tabs[tab].title)
            return undefined;

          return (
            <div key={index} className="rounded-lg h-[240px] bg-red-700">
              {title}
            </div>
          );
        })}
      </div>
    </section>
  );
}
