import ClientComponent from "./client-component";

export default async function ServerComponent() {

    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const json = await data.json()
    // console.log(json)


    return (
        <div>
            <>
            <h1>Iz server Component:     {json.title}</h1>
                Ovo je server komponenta

                <ClientComponent>
                    <p>This is a child element</p>
                    <h1>{json.title}</h1>
                </ClientComponent>

            </>
        </div>
    )
    // Može koristiti server-only funkcionalnosti (fetch iz baze, fajl sistema, itd.)

    //     const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    //     const json = await data.json()
    //     return (
    //         <>

    //         <div>
    //             <h1>Ovo je server komponenta</h1>
    //         </div>
    //         <div>
    //             <h1>{json.title}</h1>
    //             <p>{json.body}</p>
    //         </div>
    //         </>

    //     )
}
