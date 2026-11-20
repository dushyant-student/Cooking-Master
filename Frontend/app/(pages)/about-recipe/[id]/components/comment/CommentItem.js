"use client";

import { useState } from "react";
import { createComment, deleteComment } from "@/services/commentService";
import { TimeConverter } from "@/components/TimeConverter";
import { ChevronDown, ChevronUp, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommentItem({ comment, allComments, onRefresh, user }) {
 
  // Replies hidden by default
  const [hide, setHide] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Find replies of current comment
  const replies = allComments.filter( (item) =>  item.parentComment === comment._id ||  item.parentComment?._id === comment._id);


  // Toggle replies
  const handleHideToggle = () => {
    setHide((prev) => !prev);
  };

  
  // Reply Comments
  const handleReply = async () => {
    if (!user){
      router.push("/login") ;
      return ;
    }
    
    if (!replyText.trim()) return;

    try {

      setLoading(true);

      await createComment({
        recipeId: comment.recipeId,
        userId: user?._id,
        username: user?.name,
        profile: user?.imageURL,
        comment: replyText,
        recipeOwnerId: comment?.recipeOwnerId,
        parentComment: comment._id,
      });

      setReplyText("");
      setReplyOpen(false);

      await onRefresh();

    } catch (error) {
      console.error("REPLY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };



  // Delete
  const handleDelete = async () => {
    try {
      if (!user){
        router.push("/login") ;
        return ;
      }
      await deleteComment(comment._id);

      await onRefresh();
    } catch (error) {
      console.error("DELETE COMMENT ERROR:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex gap-4">

        {/* Profile */}
        <div className="w-10 h-10 shrink-0 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">

          {comment.profile ? (
            <img
              src={comment.profile}
              alt={comment.username}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-bold">
              {comment.username
                ?.charAt(0)
                ?.toUpperCase()}
            </span>
          )}

        </div>


        <div className="flex-1">
          {/* Comment box */}
          <div className="bg-gray-100 rounded-xl px-4 py-3">
            <div className="flex gap-2 items-center">

              <p className="font-semibold">
                {comment.username}
              </p>

              <p className="font-mono text-sm text-gray-500">
                {TimeConverter(comment?.createdAt)}
              </p>

            </div>

            <p className="mt-1">
              {comment.comment}
            </p>

          </div>


          <div className="flex gap-5 mt-2 text-sm">
          
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="font-semibold text-gray-600 hover:text-black"
            >
              Reply
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="text-red-500"
            >
              Delete
            </button>

          </div>

          
        {/* REPLY INPUT */}
          {replyOpen && (
            <div className="flex gap-2 mt-3">

              <input
                value={replyText}
                onChange={(e) =>
                  setReplyText(e.target.value)
                }
                placeholder="Write a reply..."
                className="border rounded-lg px-3 py-2 flex-1 outline-none"
              />

              <button
                onClick={handleReply}
                disabled={loading}
                className="bg-black text-white px-4 rounded-lg"
              >
                {loading ? "Sending..." : "Reply"}
              </button>

            </div>
          )}

          
        {/* SHOW / HIDE REPLIES */}
          {replies.length > 0 && (
            <button
              onClick={handleHideToggle}
              className="flex items-center gap-1 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              {hide ? (
                <>
                  <ChevronDown size={18} />
                  View {replies.length}{" "}
                  {replies.length === 1 ? "reply" : "replies"}
                </>
              ) : (
                <>
                  <ChevronUp size={18} />
                  Hide {replies.length}{" "}
                  {replies.length === 1 ? "reply" : "replies"}
                </>
              )}
            </button>
          )}

          {/* REPLIES */}
          {!hide && replies.length > 0 && (
            <div className="ml-7 pl-4 border-l-2 border-gray-200">

              {replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  allComments={allComments}
                  onRefresh={onRefresh}
                  user={user}
                />
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

