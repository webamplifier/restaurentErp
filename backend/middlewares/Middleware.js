const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    const auth_header = req.get('Authorization');

    if (!auth_header) {
        return res.json({ status: 401, message: 'Please login to perform action' });
    }

    let decode_token;

    try {
        decode_token = jwt.verify(auth_header, 'secret_electric_erp');
    } catch (error) {
        return res.json({
            status: 500,
            message: 'Oops something went wrong!'
        })
    }

    if (!decode_token) {
        return res.json({
            status: 401,
            message: 'No authorization'
        })
    }

    req.user_data = decode_token.user_data;

    if (req.user_data.role == 1){
        next();
    }

    await knex('restaurents').where('id',req.user_data.restaurent_id).then(response=>{
        if (response.length > 0){
            let current_restro = response[0];
            let expiry_date = new Date(current_restro.expiry_date);
            let current_date = new Date();

            let difference = expiry_date - current_date;

            if (difference < 1){
                return res.json({
                    status : 500,
                    message : "Renew Your subscription"
                })
            }else{
                next();
            }

        }
    })
}

const checkPermission = (value) => {
    return async function (req, res, next) {
        const value_list = value.split('-'); //0 for view,add,delete,edit and 1 for parent_permission name
        const user_id = req.user_data.id;
        const role_id = req.user_data.role_id;
        let parent_permission_id;

        if (role_id == 1) {
            next();
        } else {
            await knex('Parent_Permission').where('Parent_name', value_list[1]).then(response => {
                if (response.length > 0) {
                    parent_permission_id = response[0].id;
                }
            }).catch(err => console.log('error occured while fetching permission', err))


            await knex('role_permission').where('role_id', role_id).where('parent_permission_id', parent_permission_id).where(value_list[0], '1').then(response => {
                if (response.length > 0) {
                    return next()
                } else {
                    return res.json({ status: 404, message: 'Unauthorized' })
                }
            }).catch(err => console.log(err))
        }
    }
}


module.exports = {
    checkAuth,
    checkPermission
}