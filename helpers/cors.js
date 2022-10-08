export function cors(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
      )
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
      }
      next()
}