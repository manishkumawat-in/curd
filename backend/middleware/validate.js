
export const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);    
        if (!result.success) {
            console.log(result.error.issues);
            const errors = result.error.issues.map((err) => err.message);
            return res.json({succes: false, message: errors});   
        }
        next();
    } catch (err) {
        console.log("validation error: ", err.message);     
    }
}