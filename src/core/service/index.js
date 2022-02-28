import {HOST} from '../constants';

const Service = {};

Service.request = (endPoint, param, method, body, successCb, errorCb) => {
    fetch(`${HOST}/${endPoint}/${param}`,
        {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((resp) => resp.json())
        .then(successCb)
        .catch(errorCb);
};

export default Service;