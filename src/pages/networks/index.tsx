import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { firestore } from "../../services/firebaseconnection"

export function Networks() {
    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [insta, setInsta] = useState("")
   

  useEffect(()=>{
    function loadLinks(){
      const docRef = doc(firestore, "network", "link")

      getDoc(docRef)
      .then((snapshot)=>{
        if(snapshot.data() !== undefined){
            setFacebook(snapshot.data()?.facebook)
            setInsta(snapshot.data()?.instagram)
            setYoutube(snapshot.data()?.youtube)
        }
      })
    }

    loadLinks();
  },[])
  

    function handleRegister(e: FormEvent){
      e.preventDefault();

      setDoc(doc(firestore, "network", "link"),{
        facebook:facebook,
        instagram:insta,
        youtube: youtube
      })

      .then(()=>{
        console.log("CADASTRADOS COM SUCESSO")
      })
      .catch((error)=>{
        console.log(error)
      })
      
    }
    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Página Networks</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                    type="url"
                    placeholder="Digite a url do facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagram"
                    value={insta}
                    onChange={(e) => setInsta(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input
                    type="url"
                    placeholder="Digite a url do youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button type="submit" 
                 className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium">
                    Salvar
                </button>
            </form>
        </div>
    )
}