import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from "axios";

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [artist, setArtist] = useState([])
    const [music, setMusic] = useState([])
    const [link, setLink] = useState([])

    const onChangeArtist = (e) => {
        setArtist(e.target.value)
    }

    const onChangeMusic = (e) => {
        setMusic(e.target.value)
    }

    const onChangeLink = (e) => {
        setLink(e.target.value)
    }

    const getTracks = () => {
        // const id="eb7a66d6-07e0-4de9-9f47-321708b9cdd9"
        axios
            .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, {
                headers: {
                    authorization: "luiz-marinho-ammal"
                }
            })
            .then((response) => {
                console.log(response.data.result.tracks)
                setMusicas(response.data.result.tracks)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    useEffect(() => {
        getTracks()
    }, [])

    const createSong = () => {
        let body = {
            name: music,
            artist: artist,
            url: link
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, body, {
            headers: {
                authorization: "luiz-marinho-ammal"
            }
        })
            .then((response) => {
                console.log(response)
                getTracks()
                setArtist("")
                setMusic("")
                setLink("")
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    const removeSong = (id) => {
        let trackId = id
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks/${trackId}`, {
            headers: {
                authorization: "luiz-marinho-ammal"
            }
        })
        .then((response) => {
            getTracks();
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() =>removeSong(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artist} onChange={onChangeArtist} />
                <InputMusica placeholder="musica" value={music} onChange={onChangeMusic} />
                <InputMusica placeholder="url" value={link} onChange={onChangeLink} />
                <Botao onClick={() => createSong()}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

