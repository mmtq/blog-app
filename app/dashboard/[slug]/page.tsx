type Params = Promise<{ slug: string }>

const page = async ({params}: {params: Params}) => {
    const {slug} = await params
  return (
    <div>
      <h1>Hellow from slug : {slug}  </h1>
    </div>
  )
}

export default page
