import { Link } from "react-router-dom";


export function Found(){
    return(

        <div className="flex w-full justify-center items-center flex-col text-white">
            <h1 className="font-medium">Pagina não encontrada</h1>

            <Link to="/">
               Retronar para pagina inicial
            </Link>
        </div>
    )
}