
var jsonObj

var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
exports.list_html = function (req, res) {
  res.sendFile(__dirname + '/index.html');
}

exports.get_latest_stories = function (req, res) {
  const https = require('https')
  const url = "https://time.com";
  const result = https.get(url, val => {
    let data = '';
    val.on('data', chunk => {
      data += chunk;
    });
    val.on('end', () => {
      const rs = convertHtml(data.toString(), 'ol')
      const ret = prepareRes(rs)
      res.send(ret)
    })
  }).on('error', err => {
    console.log(err.message);
  })
}
function prepareRes(rs) {
  let res = []
  rs.children.forEach(data => {
    if (data['children'][0]) {
      data['children'][0]['children'][0]['children'].forEach(ele => {
        if (ele['tagName'] == 'H2') { res.push(ele['children'][0]) }
      })
    }
  })
  let ret = []
  res.forEach(data => {
    let obj = {
      title: data['textContent'],
      link: "https://time.com" + data['attributes'][0][1]
    }
    ret.push(obj)
  })
  jsonObj = ret
  return ret
}
function convertHtml(html, selector) {
  let document = new JSDOM(html.toString()).window.document;
  const Elem = e => ({
    toJSON: () => ({
      tagName:
        e.tagName,
      textContent:
        e.textContent,
      attributes:
        Array.from(e.attributes, ({ name, value }) => [name, value]),
      children:
        Array.from(e.children, Elem)
    })
  })

  const html2json = e =>
    JSON.stringify(Elem(e), null, '  ')
  return (JSON.parse(html2json(document.querySelector(selector))))

}
