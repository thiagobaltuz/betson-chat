
export async function handler(event) {
  try {
    const { pergunta } = JSON.parse(event.body || "{}");

    if (!pergunta) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Campo 'pergunta' não informado." }),
      };
    }

    const res = await fetch("https://hook.us2.make.com/7quhpvsv49ax1b34rkj4dn24u42m2i1i", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pergunta })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro na chamada ao Make:", errorText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Erro ao consultar o cenário Make." })
      };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ resposta: data.resposta || "Sem resposta do BETson." })
    };

  } catch (error) {
    console.error("Erro no handler do BETson Proxy:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no servidor do proxy." })
    };
  }
}
