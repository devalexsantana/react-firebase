import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../../services/firebaseconnection";

interface linksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface socialLinksProps {
    facebook: string,
    youtube: string,
    instagram: string;
}
export function Home() {

    const [links, setLinks] = useState<linksProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<socialLinksProps>();

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(firestore, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
                .then((snapshot) => {

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
        }

        loadLinks();
    }, [])

    useEffect(() => {
        function loadingSocialLinks() {
            const docRef = doc(firestore, "network", "link")
            getDoc(docRef)
                .then((snapshot) => {

                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data()?.facebook,
                            instagram: snapshot.data()?.instagram,
                            youtube: snapshot.data()?.youtube,
                        })
                    }
                })
        }
    })

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text 3xl font-bold text-white mt-20">Página Home</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                    <section key={link.id}
                        className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: link.bg }}
                    >
                        <a href={link.url}>
                            <p className="text-base md:text-lg" style={{ color: link.color }}>
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}




                {socialLinks && Object.keys(socialLinks).length > 0 && (

                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks.facebook}>
                            <FaFacebook size={35} color="#fff" />
                        </Social>

                        <Social url={socialLinks.instagram}>
                            <FaInstagram size={35} color="#fff" />
                        </Social>

                        <Social url={socialLinks.youtube}>
                            <FaYoutube size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    )
}