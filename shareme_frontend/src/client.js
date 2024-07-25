import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "6rz4kuv3",
    dataset: "production",
    apiVersion: "2023-06-16",
    useCdn: true,
    token: "skwFdZYMZozdjMxudFkFUYhMyVrw3YKjbj1Bp9MdcoHffGVAEXUvAuUqyfF1Vz4VOw6qoyKvNFcasGfHob0rHdHASVjQbKWUdy2jN7HgqkaNk3uDH5wybd4jpqIwzy37xAoW9E9xA1DtUThxNDCrugqamySLoDDZOW5so288s5A5CwRhCB0o",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
