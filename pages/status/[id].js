import Devit from "../../components/Devit";
import Footer from "../../components/Footer/footer";

export default function DevitPage (props) {
  return (
        <>

             <Devit {...props}/>
             <Footer></Footer>
            <style jsx>{''}</style>
        </>
  )
}

/*export async function getStaticPaths(){
    return {
        paths: [{ params: {id: 'RyDsug5NX94LxIjyTWy1'}}],
        fallback: true
    }
}

export async function getStaticProps (context) {
    const {params, res} = context
    const {id} = params
    const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

    if (apiResponse.ok) {
        const props = await apiResponse.json()
        return {props}
    }

    if(res) {
        res.writeHead(301, {Location: "/home"}).end()
    }
}*/

export async function getServerSideProps (context) {
    const {params, res} = context
    const {id} = params
    const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)

        if (apiResponse.ok) {
            const props = await apiResponse.json()
            return {props}
        }

        if(res) {
            res.writeHead(301, {Location: "/home"}).end()
        }
}