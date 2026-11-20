
import { CategoryListView } from "./components/CategoryListView.js";
import CreateCategoryForm from "./components/CreateCategoryForm.js";

export default async function Page() {
    
  return (
    <main className="md:my-2 lg:my-5 lg:flex w-full ">
      <CreateCategoryForm />
      <CategoryListView />
    </main>
  );
}