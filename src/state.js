const localState = {
  resolvers:{
    Mutation: {
      updateNote(_, {note}, { cache }) {
        const data = {
          data: {
            activeNote: note,
            editable: false
          }
        }
        cache.writeData(data)
        
        return data;
      },
      clearActive(_, variables, {cache}) {
        const data = {
          data: {
            activeNote: {
              id: "",
              title:"",
              content: "",
              __typename: "Note"
            }
          }
        }
        cache.writeData(data)
        return data;
      },
      setEditable(_, {state}, {cache}) {
        const data = {
          data:{
            editable: state
          }
        }

        cache.writeData(data)

        return data;
      }
    }
  },
  defaults:{
    editable: true,
    activeNote: {
      id: null,
      title:"",
      content: "",
      createdAt: "",
      __typename: "Note"
    }
  }
}

export default localState;