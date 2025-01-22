import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    // Ensure `params` is awaited as it is asynchronous in dynamic routes
    const { id } = await params; // No need to await destructuring directly; it works as provided in the handler

    await connectToDB();

    console.log("Received params.id:", id);

    const prompts = await Prompt.find({ creator: id }).populate(
      "creator",
      null,
      null,
      { strictPopulate: false }
    );

    // console.log("Fetched prompts:", prompts);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
