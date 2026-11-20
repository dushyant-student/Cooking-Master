import Form from "./components/Form";
import PostView from "./components/PostView";

export default function Page() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden flex flex-col lg:flex-row ">
      
      <Form />

      <PostView />

    </div>
  );
}