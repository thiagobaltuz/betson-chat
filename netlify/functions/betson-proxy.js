
export async function handler(event) {
  const { pergunta } = JSON.parse(event.body || "{}");

  const res = await fetch("https://hook.us2.make.com/7quhpvsv49ax1b34rkj4dn24u42m2i1i", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta })
  });

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
