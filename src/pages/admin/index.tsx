import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../services/firebaseconnection";

interface linksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColor, setTextColor] = useState("#f1f1f1")
    const [backgroundColor, setBackgroundColor] = useState("#121212")
    const [links, setLinks] = useState<linksProps[]>([])


    useEffect(() => {
        const linksRef = collection(firestore, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {

            let lista = [] as linksProps[];

            snapshot.forEach((doc) => {

                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)

        })

        return () => {
            unsub();
        }

    }, [])


    function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === "" || urlInput === "") {
            alert("Preencha os campos")
            return;
        }

        addDoc(collection(firestore, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColor,
            color: textColor,
            created: new Date()
        })

            .then(() => {
                setNameInput("")
                setUrlInput("")
                console.log("Cadstrado com sucesso")
            })

            .catch((error) => {
                console.log("Erro ao Cadastrar no banco de dados " + error)
            })


    }

    async function handleDeleteLink(id: string){
       const docRef = doc(firestore, "links", id)
       await deleteDoc(docRef)
         
    }
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
                <Input
                    placeholder="Digitre seu link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Url do link</label>
                <Input
                    type="url"
                    placeholder="Digitre seu url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />
                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">

                        <label className="text-white font-medium mt-2 mb-2">Color do link</label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                        />

                    </div>

                    <div className="flex gap-2">

                        <label className="text-white font-medium mt-2 mb-2">Background do link</label>
                        <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                        />

                    </div>

                </section>

                {nameInput !== '' && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">Preview</label>
                        <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColor }}
                        >
                            <p className="font-medium" style={{ color: textColor }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus links
            </h2>


            {links.map((item) => (
                <article 
                key={item.id} 
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{backgroundColor:item.bg, color:item.color}} 
                >
                    <p>{item.name}</p>
                    <div>
                        <button className="border border-dashed p-1 rounded"
                         onClick={()=> handleDeleteLink(item.id)}
                        >
                            <FiTrash size={18} color="#fff" />
                        </button>
                    </div>

                </article>

            ))}


        </div>
    )
}