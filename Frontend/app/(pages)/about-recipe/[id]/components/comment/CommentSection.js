"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { createComment, fetchComments } from "@/services/commentService";
import { useAuth } from "@/context/AuthProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CommentSection({ recipeId, recipeOwnerId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter() ; 


  // Show / Hide ALL comments
  const [showComments, setShowComments] = useState(true);

  const { user } = useAuth();

  // LOAD COMMENTS
  const loadComments = async () => {
    try {
      const response = await fetchComments(recipeId);
      setComments(response.data || []);
    } catch (error) {
      console.error("FETCH COMMENTS ERROR:", error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      loadComments();
    }
  }, [recipeId]);

  
  // create main Comment
  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);

      await createComment({
        recipeId,

        userId: user?._id,
        username: user?.name,
        profile: user?.imageURL || "",

        recipeOwnerId: recipeOwnerId || "",

        comment: commentText,
        parentComment: null,
      });

      setCommentText("");

      await loadComments();
    } catch (error) {
     toast.error("please Login")
     router.push("/login")
      // console.error("CREATE COMMENT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  
  //ROOT COMMENTS
  
  const rootComments = comments.filter(
    (comment) => comment.parentComment === null
  );


  // SHOW / HIDE COMMENTS
  const handleCommentsToggle = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <section className="sm:pb-10 max-w-3xl mt-10">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Comments ({comments.length})
        </h2>

        <button
          onClick={handleCommentsToggle}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          {showComments ? (
            <>
              <ChevronUp size={18} />
              Hide comments
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show comments
            </>
          )}
        </button>

      </div>


  {/* COMMENTS CONTENT */}
      {showComments && (
        <>
          <div className="flex gap-3 mb-8">

            <input
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Add a comment..."
              className="border rounded-lg px-2 py-3 flex-1 outline-none"
            />

            <button
              onClick={handleComment}
              disabled={loading}
              className="bg-black text-white px-2 rounded-lg"
            >
              {loading ? "Sending..." : "Comment"}
            </button>

          </div>

          <div>

            {rootComments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                allComments={comments}
                onRefresh={loadComments}
              />
            ))}

          </div>

        </>
      )}

    </section>
  );
}

