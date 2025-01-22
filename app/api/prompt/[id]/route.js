import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET
export const GET = async (request, { params }) => {
  try {
    // Ensure `params` is awaited as it is asynchronous in dynamic routes
    const { id } = await params; // No need to await destructuring directly; it works as provided in the handler

    await connectToDB();

    console.log("Received params.id:", id);

    const prompt = await Prompt.findById(id).populate("creator", null, null, {
      strictPopulate: false,
    });
    if (!prompt) return new Response("prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    const { id } = await params;
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

//delete
export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params;
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
