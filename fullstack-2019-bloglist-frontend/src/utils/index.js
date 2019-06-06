
//https://medium.com/@captaindaylight/get-a-subset-of-an-object-9896148b9c72
export const inputElementProps = (field) => {
  return (({ type, value, onChange }) => ({ type, value, onChange }))(field)
}