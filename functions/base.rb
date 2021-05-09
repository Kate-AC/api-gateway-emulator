require "json"

def handler(event:, context:)
  if "OPTIONS" == event["httpMethod"]
    return {
      statusCode: 200,
      body: "",
      headers: {
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Origin": "http://localhost:22281",
        "Access-Control-Allow-Credentials": true
      }
    }
  end

  if "GET" == event["httpMethod"]
    return {
      statusCode: 200,
      body: "OK",
      headers: {
        "Set-Cookie": "hoge=9999"
      }
    }
  end

  if "POST" == event["httpMethod"]
    body = JSON.parse(event["body"])
    params = { value: body["value"] }

    return {
      statusCode: 200,
      body: params.to_json,
      headers: {}
    }
  end
end
