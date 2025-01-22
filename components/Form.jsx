import React from "react";
import Link from "@node_modules/next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left">
        {type} and share amazing prompts and show your innovation and creativity
        to compete with AI.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col glassmorphism"
      >
        <label className="font-satoshi text-base text-gray-700">
          Your Prompt
        </label>
        <textarea
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
          value={post.prompt}
          onChange={(e) => {
            setPost({ ...post, prompt: e.target.value });
          }}
        />

        <label className=" mt-5 font-satoshi text-base text-gray-700">
          Tag (eg: #cartoon, #futuristic)
        </label>
        <input
          placeholder="#tag"
          required
          className="form_input"
          value={post.tag}
          onChange={(e) => {
            setPost({ ...post, tag: e.target.value });
          }}
        />

        <div className="flex-end mt-6 mx-3 mb-3 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-black"
          >
            {submitting ? `${type}` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
