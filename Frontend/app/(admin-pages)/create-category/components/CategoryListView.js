"use client";

import { deleteCategory} from "@/services/catgoryServices";
import { Edit, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";

export const CategoryListView = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, error,  isLoading ,mutate } = useSWR("/category/admins/all", fetcher);
  const router = useRouter();


  const categoryData = data?.allCategories || [];
  const handleDeleteCategory = async (id) => {

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Category?"
      );

      if (!confirmDelete) {
        return;
      }
  
      setIsDeleting(true);

      const response = await deleteCategory(id);

      if (response.success) {

        toast.success("Category Deleted Successfully");
        mutate("/category/admins/all");
        return;
      }
      

    } catch (err) {
      console.log("Error in CategoryListView In Create Category:-",err)
      toast.error(err.response?.message?.data || "Server Down, Deletion failed");

    } finally {
      setIsDeleting(false);
    }
  };

  if (categoryData?.length === 0 ) {
    return (
      <div className="my-20 mx-10">
       You did not Upload Any Category..
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-20 mx-10">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20 mx-10">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="md:my-6 lg:py-4 px-10 w-full  ">
      <div className="h-80 lg:h-145 overflow-y-auto rounded-lg border border-gray-300 shadow ">
        <table className="min-w-full border-collapse">

          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="px-3 py-2 text-left">S no.</th>
              <th className="px-3 py-2 text-left">Image</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Edit</th>
              <th className="px-3 py-2 text-left">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 ">

            {categoryData?.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="px-6 py-2">
                  {index + 1}
                </td>

                <td className="p-1">
                  <img
                    src={item?.imageURL}
                    alt={item?.categoryType}
                    className="h-18 w-18 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-2">
                  {item?.categoryType}
                </td>

                <td
                  onClick={() =>
                    router.push(
                      `/create-category?id=${item?._id}`
                    )
                  }
                  className="px-5 py-2 cursor-pointer"
                >
                  <Edit
                    size={40}
                    className="p-2 hover:bg-green-300 rounded-sm"
                  />
                </td>

                <td
                  onClick={() =>
                    !isDeleting &&
                    handleDeleteCategory(item?._id)
                  }
                  className="cursor-pointer"
                >
                  <Trash2Icon
                    size={40}
                    className="p-2 hover:bg-red-200 rounded-sm"
                  />
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};