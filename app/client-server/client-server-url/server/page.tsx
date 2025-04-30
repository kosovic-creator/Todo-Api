import Client from "../client/page"

export default async function Page({ searchParams }: { searchParams: { kapacitet?: string } }) {
    // searchParams je objekat sa svim query parametrima
    const { kapacitet } = await searchParams
    return
<>
<Client />

<div>to je:{kapacitet}</div>
</>
  }
//