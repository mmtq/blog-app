type Params = Promise<{ slug: string }>
import Counter from "@/app/components/Counter"

const page = async ({params}: {params: Params}) => {
    const {slug} = await params
  return (
    <div>
      <h1>Hellow from slug : {slug} </h1>
      <Counter />
    </div>
  )
}

export default page
