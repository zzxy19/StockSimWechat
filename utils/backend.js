var httpMethod = "http://";
var ip = "18.220.245.253:8080";

function buildSearchSymbolRequestUrl(symbol, maxResult) {
  var outputUrl = httpMethod + ip + "/searchSymbol" +
      "?symbol=" + symbol;
  if (maxResult) {
    outputUrl += "&max_result=" + maxResult;
  }
  return outputUrl;
}

function buildShowPriceTimelineRequestUrl(symbol, dateRange) {
  var outputUrl = httpMethod + ip + "/showPriceTimeline" +
      "?symbol=" + symbol;
  if (dateRange) {
    outputUrl += "&date_range=" + dateRange;
  }
  return outputUrl;
}

module.exports = {
  buildShowPriceTimelineRequestUrl: buildShowPriceTimelineRequestUrl,
  buildSearchSymbolRequestUrl: buildSearchSymbolRequestUrl
}