const rp = require('request-promise');
var request = require('request');
const baseURL = "https://qmdatabasep2000140239trial.hanatrial.ondemand.com/qmapi_prod/data.xsodata/";
const baseAPI = "http://localhost:8081/api";

let getUser = rp(baseURL + "/users" + "?$format=json");
let getProduct = rp(baseURL + "/product" + "?$format=json");
let getSupport = rp(baseURL + "/support_book" + "?$format=json");
let getInidentBook = rp(baseURL + "/incident_book" + "?$format=json");
Promise.all([getUser, getProduct, getSupport, getInidentBook]).then(function (values) {
    let users = JSON.parse(values[0]).d.results, product = JSON.parse(values[1]).d.results,
        support = JSON.parse(values[2]).d.results, incidents = JSON.parse(values[3]).d.results;

    // CREATE USERS
    users.forEach(u => {
        createUser(u);
    });

    // TOGGLE ROLES
    users.forEach(u => {
        addSupportProduct(u,
            support.filter(el => u.KEY === el.UID)
        );
    });

    // CREATE INCIDENTS
    users.forEach(u => {
        let b = incidents.filter(i => i.UID === u.KEY);
        b.forEach(p => {
            createIncidents(u, p.COUNT, p.KEY)
        });
    })
});

function addSupportProduct(user, products) {
    products.forEach(el => {
        let body = {
            "supported": el.SUPPORT === "false" ? false : true
        };
        let url = baseAPI + '/users/' + user.INUMBER + "/" + el.KEY;
        request.put(
            {
                url: url,
                form: body
            },
            function (err, httpResponse, body) {
                if (err) console.log(err)
            }
        )

    })
}

function createUser(user) {

    let body = {
        "user_id": user.INUMBER,
        "first_name": user.NAME,
        "last_name": ""
    };
    let url = baseAPI + '/users';
    request.post(
        {
            url: url,
            form: body
        },
        function (err, httpResponse, body) {
            if (err) console.log(err);
            let user_url = baseAPI + "/users/" + user.INUMBER;
            let user_body = {
                user_id: user.INUMBER,
                first_name: user.NAME,
                last_name: "",
                is_available: user.ISAVAILABLE === "false" ? 0 : 1,
                usage_percent: parseFloat(user.USAGEPERCENT),
                current_q_days: user.CURRENTQDAYS,
                incident_threshold: user.I_THRESHOLD
            };
            request.put(
                {
                    url: user_url,
                    form: user_body
                },
                function (err, httpResponse, body) {
                    if (err) console.log(err)
                }
            );
        }
    );
}

function createIncidents(user, amount, product) {
    let d = new Date();
    d.setDate(d.getDate() - 5);
    let newDate = d.toISOString().slice(0, 19).replace('T', ' ');
    let body = {
        "user_id": user.INUMBER,
        "product_short_name": product,
        "timestamp": newDate
    };
    let url = baseAPI + '/incidents';
    for (let i = 0; i < amount; i++) {
        request.post(
            {
                url: url,
                form: body
            },
            function (err, httpResponse, body) {
                if (err) console.log(err)
            }
        )
    }

}
