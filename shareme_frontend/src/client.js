import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "projectid",
    dataset: "production",
    apiVersion: "2023-06-16",
    useCdn: true,
    token: REACT_APP_SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
