import axios from 'axios'
const bcryptjs = require('bcryptjs')

const url = process.env.REACT_APP_SCOREURL

const getScores = async () => {
    const config = { params: { name: 'pong' } }
    const scores = await axios.get(url, config)
    return scores.data
}
const postScores = async (gamescores) => {
    const id = await bcryptjs.hash(process.env.REACT_APP_ID, 10)
    const config = { headers: { id: id } }
    const response = await axios.post(url, gamescores, config)
    console.log('postaamassa', response)
    return response.data
}

export { getScores, postScores }