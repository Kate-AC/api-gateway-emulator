function requestLambda(r) {
  r.error("========== request");
  r.error(r.responseBody);
  r.error("========== request");

  var requestBody = {
    "httpMethod": r.method,
    "headers": getHeaders(r),
    "body": r.requestBody,
    "cookies": getCookies(r),
    "queryStringParameters": r.args
  }

  if (r.method == "GET") {
    //GETでbodyが存在するとerrorになるので削除
    delete requestBody.body;
  }

  r.subrequest("/container/proxy", {
    method: r.method,
    body: JSON.stringify(requestBody)
  })
  .then((result) => {
    r.error("========== success");
    r.error(result.responseBody);
    r.error("========== success");

    var body = JSON.parse(result.responseBody);
    var responseBody = {};

    if ("body" in body) {
      responseBody = body.body;
    }

    if ("headers" in body) {
      if ("Set-Cookie" in body.headers) {
        r.headersOut["Set-Cookie"] = body.headers["Set-Cookie"];
      }

      if ("Content-Type" in body.headers) {
        r.headersOut["Content-Type"] = body.headers["Content-Type"];
      }

      if ("Content-Disposition" in body.headers) {
        r.headersOut["Content-Disposition"] = body.headers["Content-Disposition"];
      }

      if ("Location" in body.headers) {
        r.return(301, body.headers["Location"]);
        return;
      }
    }

    r.return(body.statusCode, responseBody);
  })
  .catch((result) => {
    r.error("========== error");
    r.error(result.message);
    r.error("========== error");
    r.return(result.status, result.message);
  });
}

function getCookies(r) {
  var headers = getHeaders(r);
  if (!("Cookie" in headers)) return [];

  var cookies = headers["Cookie"].replace(" ", "");
  cookies = cookies.split(";");

  return cookies.map((item) => {
    var cookie = item.split("=");
    return cookie[0];
  });
}

function getHeaders(r) {
  var headers = {};
  for (var i = 0; i < r.rawHeadersIn.length; i++) {
    var item = r.rawHeadersIn[i];
    headers[item[0]] = item[1];
  }

  return headers;
}

function convertSlash(uri) {
  return uri.replace(/(.)(\/{1})/g, "$1_");
}

function createUrl(r) {
  var domain = convertSlash(r.uri);
  return "http:/" + domain + ":8080/2015-03-31/functions/function/invocations";
}

export default { createUrl, requestLambda };
