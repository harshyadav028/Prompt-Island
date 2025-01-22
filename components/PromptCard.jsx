"use client";

import { useState } from "react";
import { usePathname } from "@node_modules/next/navigation";
import { useRouter } from "next/navigation";
import Image from "@node_modules/next/image";
import { useSession } from "@node_modules/next-auth/react";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between item-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => {}}
        >
          <Image
            src={"/assets/images/profile_placeholder.jpg"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {session?.user.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {session?.user.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copied === post.prompt ? tick_icon : copy_icon"
            width={16}
            height={16}
          ></Image>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick(post.tag);
        }}
      >
        {post.tag}
      </p>
      {pathName === "/profile" && (
        <div className="mt-5 flex-center gap-10 border-t border-gray-100">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
