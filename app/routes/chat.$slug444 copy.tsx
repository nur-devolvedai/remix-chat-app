import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async ({ params }) => {
  let { slug } = params; // Extract the slug from the URL
  if (!slug) {
    throw new Response("Slug is required", { status: 400 });
  }
  return { slug, content: `Content for slug: ${slug}` };
};

export default function Chat2SlugPage() {
  let data:any = useLoaderData();
  return (
    <div>
      <h1>Dynamic Page for: {data.slug}</h1>
      <p>{data.content}</p>
    </div>
  );
}
