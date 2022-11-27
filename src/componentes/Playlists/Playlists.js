import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";


// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]

function Playlists() {

    const input =  {
        headers:{
          authorization: "luiz-marinho-ammal"
          }
      } 
    const pegarPlaylist = ()=> { 
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", input)
       .then((response)=>{
       console.log(response.data.result.list)
       setPlaylists(response.data.result.list)
      })
      .catch((error)=>{
       console.log("deu erro")
       console.log(error)
      })
      }

      useEffect(()=>{
        pegarPlaylist()
      },[])

    const [playlists, setPlaylists] = useState([])
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} id = {playlist.id}/>
            })}

        </div>
    );
}

export default Playlists;
