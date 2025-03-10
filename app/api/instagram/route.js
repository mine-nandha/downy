export async function GET(req, res) {
  const { link } = req.query;
  const response = await fetch(
    "https://mine-ytdlp.onrender.com/get-url?video_url=" + link
  );
  const data = await response.json();
  console.log(link);
  console.log(data);

  return new Response("Hi", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
