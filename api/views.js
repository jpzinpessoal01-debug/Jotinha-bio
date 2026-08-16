export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  if(req.method!=='GET') return res.status(405).json({error:'method_not_allowed'});
  try{
    const response=await fetch('https://countapi.mileshilliard.com/api/v1/hit/jotinha_bio_2026_real_visits',{headers:{accept:'application/json'},cache:'no-store'});
    if(!response.ok) throw new Error(`counter ${response.status}`);
    const data=await response.json();
    const count=Number(data.value);
    if(!Number.isFinite(count)) throw new Error('invalid_counter_response');
    return res.status(200).json({count});
  }catch(error){
    console.error('visit counter failed',error);
    return res.status(502).json({error:'counter_unavailable'});
  }
}
