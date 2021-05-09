require "json"

def handler(event:, context:)
 {
    statusCode: 302,
    body: "",
    headers: {
      Location: "https://google.co.jp"
    }
  }
end
