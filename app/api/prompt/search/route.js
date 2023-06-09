import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const POST = async (req) => {

    try {
        const { text } = req.body;
        console.log(text);
        if (text) {


            await connectToDB();

            const prompts = await Prompt
                .find({
                    $or: [
                        { prompt: { $regex: text, $options: "i" } },
                        { tag: { $regex: text, $options: "i" } },
                    ],
                }).populate('creator');



            return new Response(JSON.stringify(prompts), { status: 200 })
        }

    } catch (error) {
        return new Response("Failed to fetch search text  prompts", { status: 500 })
    }
}