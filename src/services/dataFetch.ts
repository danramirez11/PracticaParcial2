export const GetCharacters = async (src:string) => {
    try{
    const characters = fetch(`${src}`).then(res => res.json())
    return characters; }
    catch (error) {
        console.error(error)
    }
}