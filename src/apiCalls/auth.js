import axios from 'axios'
export const sendQuery = (data)=>{
    const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URI}/sendquery`,
    headers: { 
       'Content-Type': 'application/json' 
    },
        data: data
    }
    
    axios(config)
    .then((res)=>{
        return res.json()
    })
    .catch((err)=>{
        console.log(err)
    })

}